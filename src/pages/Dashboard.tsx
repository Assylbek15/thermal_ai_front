import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCountUp } from '@/hooks/useCountUp';
import { ArrowLeft, Building2, MapPin, Search, TrendingUp, TrendingDown, Zap, AlertTriangle, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import thermalBuilding1 from '@/assets/thermal-building-1.jpg';
import thermalBuilding2 from '@/assets/thermal-building-2.jpg';
import thermalBuilding3 from '@/assets/thermal-building-3.jpg';
import thermalBuilding4 from '@/assets/thermal-building-4.jpg';
import thermalBuilding5 from '@/assets/thermal-building-5.jpg';
import thermalBuilding6 from '@/assets/thermal-building-6.jpg';
import BuildingDetails from '@/components/dashboard/BuildingDetails';
import KPICards from '@/components/dashboard/KPICards';
import HeatLossAnalysis from '@/components/dashboard/HeatLossAnalysis';
import RetrofitSimulator from '@/components/dashboard/RetrofitSimulator';
import AnomaliesPanel from '@/components/dashboard/AnomaliesPanel';
import RiskIndexPanel from '@/components/dashboard/RiskIndexPanel';
import DataQualityPanel from '@/components/dashboard/DataQualityPanel';
import ReportingSection from '@/components/dashboard/ReportingSection';
import BuildingFilters, { FilterState } from '@/components/dashboard/BuildingFilters';

const cities = [
  { id: 'astana', name: 'Astana', country: 'Kazakhstan', buildingCount: 342 },
  { id: 'almaty', name: 'Almaty', country: 'Kazakhstan', buildingCount: 518 },
  { id: 'baku', name: 'Baku', country: 'Azerbaijan', buildingCount: 287 },
  { id: 'istanbul', name: 'Istanbul', country: 'Türkiye', buildingCount: 623 },
  { id: 'bishkek', name: 'Bishkek', country: 'Kyrgyzstan', buildingCount: 195 },
  { id: 'islamabad', name: 'Islamabad', country: 'Pakistan', buildingCount: 412 },
];

const buildingTypes = ['Residential', 'School', 'Hospital', 'Commercial', 'Industrial'];
const climateZones = ['Continental', 'Humid Subtropical', 'Mediterranean', 'Semi-arid'];

const CityCard = ({ city, index, onSelect }: { city: typeof cities[0]; index: number; onSelect: (id: string) => void }) => {
  const { count } = useCountUp({ end: city.buildingCount, duration: 2000, delay: index * 100 });
  
  return (
    <motion.button
      key={city.id}
      onClick={() => onSelect(city.id)}
      className="group bg-background p-8 text-left transition-all duration-300 hover:bg-secondary"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="flex items-center justify-between mb-6">
        <Building2 className="w-5 h-5 text-primary" />
        <span className="text-xs font-mono text-muted-foreground tracking-wider tabular-nums">{count} BUILDINGS</span>
      </div>
      <h3 className="text-2xl font-light text-foreground mb-1">{city.name}</h3>
      <p className="text-sm text-muted-foreground font-mono tracking-wider">{city.country.toUpperCase()}</p>
      <div className="mt-6 flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-xs font-mono tracking-wider">ACCESS</span>
        <ArrowLeft className="w-3 h-3 rotate-180" />
      </div>
    </motion.button>
  );
};

interface Building {
  id: string;
  name: string;
  type: string;
  address: string;
  district: string;
  climateZone: string;
  inspectionDate: string;
  captureConditions: string;
  confidenceScore: 'High' | 'Medium' | 'Low';
  image: string;
  spaceHeating: number;
  fuelPoverty: number;
  floorArea: number;
  epcRating: string;
  energyUse: number;
  annualCost: number;
  uValue: number;
  uValueRange: { min: number; max: number };
  annualHeatLoss: number;
  co2Intensity: number;
  efficiency: number;
  heatLossSeverity: number;
  socialRisk: 'High' | 'Medium' | 'Low';
  retrofitReadiness: 'Ready' | 'Moderate' | 'Complex';
}

const generateMockBuildings = (cityId: string): Building[] => {
  const images = [thermalBuilding1, thermalBuilding2, thermalBuilding3, thermalBuilding4, thermalBuilding5, thermalBuilding6];
  const districts: Record<string, string[]> = {
    astana: ['Esil', 'Almaty District', 'Saryarka', 'Baykonyr'],
    almaty: ['Medeu', 'Bostandyk', 'Almaly', 'Auezov'],
    baku: ['Sabail', 'Nasimi', 'Yasamal', 'Khazar'],
    istanbul: ['Kadikoy', 'Besiktas', 'Sisli', 'Fatih'],
    bishkek: ['Pervomaysky', 'Sverdlovsky', 'Leninsky', 'Oktyabrsky'],
    islamabad: ['F-6', 'G-9', 'I-8', 'E-11'],
  };
  const streetNames: Record<string, string[]> = {
    astana: ['Kenesary St.', 'Turan Ave.', 'Mangilik El Ave.', 'Kabanbay Batyr Ave.'],
    almaty: ['Abay Ave.', 'Dostyk Ave.', 'Al-Farabi Ave.', 'Nazarbayev Ave.'],
    baku: ['Nizami St.', 'Neftchilar Ave.', 'Istiglaliyyat St.', 'Bul-Bul Ave.'],
    istanbul: ['Istiklal Cad.', 'Bagdat Cad.', 'Cumhuriyet Cad.', 'Barbaros Blvd.'],
    bishkek: ['Chuy Ave.', 'Manas Ave.', 'Erkindik Blvd.', 'Aitmatov Ave.'],
    islamabad: ['Jinnah Ave.', 'Faisal Ave.', 'Kashmir Highway', 'Margalla Rd.'],
  };
  const buildingNames = ['Central Tower', 'Heritage Block', 'Sunrise Complex', 'Metro Center', 'Park View', 'City Hall Annex', 'District Office', 'Community Center'];
  const cityDistricts = districts[cityId] || districts.astana;
  const cityStreets = streetNames[cityId] || streetNames.astana;

  return Array.from({ length: 8 }, (_, i) => ({
    id: `${cityId}-${i + 1}`,
    name: buildingNames[i % buildingNames.length],
    type: buildingTypes[i % buildingTypes.length],
    address: `${Math.floor(Math.random() * 200) + 1} ${cityStreets[i % cityStreets.length]}`,
    district: cityDistricts[i % cityDistricts.length],
    climateZone: climateZones[i % climateZones.length],
    inspectionDate: `2024-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
    captureConditions: ['Clear, 5°C, Wind 3m/s', 'Overcast, 8°C, Wind 5m/s', 'Clear, -2°C, Wind 2m/s'][i % 3],
    confidenceScore: (['High', 'Medium', 'Low'] as const)[i % 3],
    image: images[i % images.length],
    spaceHeating: Math.floor(Math.random() * 200) + 150,
    fuelPoverty: Math.floor(Math.random() * 60) + 30,
    floorArea: Math.floor(Math.random() * 500) + 200,
    epcRating: ['A', 'B', 'C', 'D', 'E', 'F'][Math.floor(Math.random() * 6)],
    energyUse: Math.floor(Math.random() * 3000) + 2000,
    annualCost: Math.floor(Math.random() * 2000) + 1000,
    uValue: parseFloat((Math.random() * 3 + 1).toFixed(1)),
    uValueRange: { min: parseFloat((Math.random() * 1 + 0.5).toFixed(1)), max: parseFloat((Math.random() * 2 + 2).toFixed(1)) },
    annualHeatLoss: Math.floor(Math.random() * 20000) + 15000,
    co2Intensity: Math.floor(Math.random() * 40) + 15,
    efficiency: Math.floor(Math.random() * 40) + 50,
    heatLossSeverity: Math.floor(Math.random() * 100),
    socialRisk: (['High', 'Medium', 'Low'] as const)[Math.floor(Math.random() * 3)],
    retrofitReadiness: (['Ready', 'Moderate', 'Complex'] as const)[Math.floor(Math.random() * 3)],
  }));
};

const energyData = [
  { month: 'Jan', output: 320, forecast: 300 },
  { month: 'Feb', output: 280, forecast: 310 },
  { month: 'Mar', output: 350, forecast: 340 },
  { month: 'Apr', output: 420, forecast: 380 },
  { month: 'May', output: 380, forecast: 400 },
  { month: 'Jun', output: 450, forecast: 420 },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>({ retrofitReadiness: [], epcRating: [], co2Intensity: [], buildingType: [], riskIndex: [] });
  const [viewMode, setViewMode] = useState<'3d' | 'thermal' | 'hotspot'>('thermal');
  const [toggles, setToggles] = useState({ thermalIntensity: true, heatLossHotspots: false, featureLabels: false, confidenceMask: false });

  const handleCitySelect = (cityId: string) => {
    setSelectedCity(cityId);
    const mockBuildings = generateMockBuildings(cityId);
    setBuildings(mockBuildings);
    setSelectedBuilding(mockBuildings[0]);
  };

  const filteredBuildings = buildings.filter((b) => {
    const matchesSearch = b.address.toLowerCase().includes(searchQuery.toLowerCase()) || b.name.toLowerCase().includes(searchQuery.toLowerCase()) || b.id.includes(searchQuery);
    const matchesType = filters.buildingType.length === 0 || filters.buildingType.includes(b.type);
    const matchesEpc = filters.epcRating.length === 0 || filters.epcRating.includes(b.epcRating);
    const matchesRetrofit = filters.retrofitReadiness.length === 0 || filters.retrofitReadiness.includes(b.retrofitReadiness);
    return matchesSearch && matchesType && matchesEpc && matchesRetrofit;
  });

  const currentCity = cities.find((c) => c.id === selectedCity);

  // City selection screen
  if (!selectedCity) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-muted-foreground hover:text-primary mb-12 transition-colors font-mono text-sm tracking-wider">
            <ArrowLeft className="w-4 h-4" /> BACK TO HOME
          </button>
          <div className="mb-16">
            <p className="text-primary font-mono text-sm tracking-[0.3em] uppercase mb-4">Government Access Portal</p>
            <h1 className="text-5xl md:text-6xl font-light text-foreground tracking-tight mb-4">City Dashboard</h1>
            <div className="w-24 h-px bg-primary mb-6" />
            <p className="text-muted-foreground max-w-xl">Select a city to access thermal analysis data for buildings across the region</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-foreground/10">
            {cities.map((city, index) => (
              <CityCard key={city.id} city={city} index={index} onSelect={handleCitySelect} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const mockAnomalies = [
    { type: 'window_leakage' as const, location: 'North facade, 2nd floor', severity: 'Critical' as const, suggestedAction: 'Replace window seals or consider double-glazing upgrade' },
    { type: 'roof_loss' as const, location: 'Central roof section', severity: 'High' as const, suggestedAction: 'Add 200mm mineral wool insulation' },
    { type: 'thermal_bridge' as const, location: 'Corner junction, ground floor', severity: 'Medium' as const, suggestedAction: 'Apply external insulation to eliminate thermal bridge' },
  ];

  const mockRisks = [
    { label: 'Fuel Poverty Risk', value: selectedBuilding?.fuelPoverty || 65, trend: 'up' as const, icon: 'fuel' as const },
    { label: 'Damp & Mould Risk', value: Math.floor(Math.random() * 40) + 30, trend: 'down' as const, icon: 'damp' as const },
    { label: 'Min Efficiency Risk', value: Math.floor(Math.random() * 50) + 40, trend: 'stable' as const, icon: 'efficiency' as const },
    { label: 'Health Vulnerability', value: Math.floor(Math.random() * 30) + 20, trend: 'down' as const, icon: 'health' as const },
  ];

  const mockHeatLossElements = [
    { element: 'Windows', area: 45, meanTemp: 8.2, heatFlux: 42, uValueP10: 1.8, uValueP90: 2.9, contribution: 35 },
    { element: 'Walls', area: 280, meanTemp: 6.1, heatFlux: 28, uValueP10: 0.8, uValueP90: 1.4, contribution: 30 },
    { element: 'Roof', area: 120, meanTemp: 5.8, heatFlux: 35, uValueP10: 0.3, uValueP90: 0.6, contribution: 25 },
    { element: 'Thermal Bridges', area: 15, meanTemp: 12.4, heatFlux: 85, uValueP10: 2.5, uValueP90: 4.2, contribution: 10 },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-foreground/10 sticky top-0 z-50 bg-background">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-8">
            <button onClick={() => setSelectedCity(null)} className="text-muted-foreground hover:text-primary transition-colors"><ArrowLeft className="w-5 h-5" /></button>
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-light text-foreground tracking-wide">{currentCity?.name}</h1>
              <span className="text-xs font-mono text-muted-foreground tracking-wider border-l border-foreground/20 pl-4">{filteredBuildings.length} BUILDINGS</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <BuildingFilters onFilterChange={setFilters} />
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input type="text" placeholder="Search address or ID..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 pr-4 py-2 bg-transparent border border-foreground/20 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary w-72 font-mono" />
            </div>
          </div>
        </div>
      </header>

      <div className="p-6 space-y-6">
        {/* Overview Stats */}
        <div className="grid grid-cols-4 border border-foreground/10 divide-x divide-foreground/10">
          <div className="p-6"><span className="text-xs font-mono text-muted-foreground tracking-wider">TOTAL BUILDINGS</span><p className="text-4xl font-light text-foreground font-mono mt-2">{filteredBuildings.length}</p><p className="text-xs text-analytics-green flex items-center gap-1 mt-2 font-mono"><TrendingUp className="w-3 h-3" /> +12%</p></div>
          <div className="p-6"><span className="text-xs font-mono text-muted-foreground tracking-wider">AVG EFFICIENCY</span><p className="text-4xl font-light text-foreground font-mono mt-2">74<span className="text-lg text-muted-foreground">%</span></p><p className="text-xs text-analytics-green flex items-center gap-1 mt-2 font-mono"><TrendingUp className="w-3 h-3" /> +5%</p></div>
          <div className="p-6"><span className="text-xs font-mono text-muted-foreground tracking-wider">HEAT LOSS ALERTS</span><p className="text-4xl font-light text-foreground font-mono mt-2">23</p><p className="text-xs text-analytics-pink mt-2 font-mono">8 CRITICAL</p></div>
          <div className="p-6"><span className="text-xs font-mono text-muted-foreground tracking-wider">ENERGY SAVED</span><p className="text-4xl font-light text-foreground font-mono mt-2">1.2<span className="text-lg text-muted-foreground">MW</span></p><p className="text-xs text-analytics-green mt-2 font-mono">THIS QUARTER</p></div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* Buildings List */}
          <div className="lg:col-span-3 border border-foreground/10">
            <div className="p-4 border-b border-foreground/10"><h3 className="font-mono text-xs tracking-wider text-muted-foreground">BUILDINGS (RANKED)</h3></div>
            <div className="max-h-[700px] overflow-y-auto">
              {filteredBuildings.map((building) => (
                <button key={building.id} onClick={() => setSelectedBuilding(building)} className={`w-full flex gap-3 p-4 border-b border-foreground/5 transition-all text-left ${selectedBuilding?.id === building.id ? 'bg-primary/10 border-l-2 border-l-primary' : 'hover:bg-secondary'}`}>
                  <img src={building.image} alt={building.name} className="w-14 h-14 object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-light text-foreground truncate">{building.name}</p>
                    <p className="text-[10px] font-mono text-muted-foreground">{building.type} • {building.id.toUpperCase()}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`px-1.5 py-0.5 text-[10px] font-mono ${building.heatLossSeverity > 70 ? 'text-analytics-pink bg-analytics-pink/10' : building.heatLossSeverity > 40 ? 'text-primary bg-primary/10' : 'text-analytics-green bg-analytics-green/10'}`}>{building.heatLossSeverity}% LOSS</span>
                      <span className="text-[10px] font-mono text-muted-foreground">{building.spaceHeating} kWh/m²</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-6 space-y-6">
            {selectedBuilding && (
              <>
                <BuildingDetails building={selectedBuilding} viewMode={viewMode} onViewModeChange={setViewMode} toggles={toggles} onToggleChange={(key) => setToggles((prev) => ({ ...prev, [key]: !prev[key] }))} />
                <KPICards spaceHeating={selectedBuilding.spaceHeating} uValueRange={selectedBuilding.uValueRange} annualHeatLoss={selectedBuilding.annualHeatLoss} co2Intensity={selectedBuilding.co2Intensity} epcRating={selectedBuilding.epcRating} />
                <HeatLossAnalysis elements={mockHeatLossElements} />
                <RetrofitSimulator />
                <DataQualityPanel accuracy={{ thermalQuality: 92, windUncertainty: 78, emissivityConfidence: 85 }} assumptions={{ indoorTemp: 20, hddSource: 'Local weather station (5km)', retrofitUValues: 'Building Regs 2021 benchmarks' }} />
                <ReportingSection />
              </>
            )}
          </div>

          {/* Right Panel */}
          <div className="lg:col-span-3 space-y-6">
            <AnomaliesPanel anomalies={mockAnomalies} />
            <RiskIndexPanel risks={mockRisks} />
            {/* Energy Chart */}
            <div className="border border-foreground/10 p-4">
              <h4 className="font-mono text-xs tracking-wider text-muted-foreground mb-4">ENERGY TREND</h4>
              <ResponsiveContainer width="100%" height={150}>
                <AreaChart data={energyData}>
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis hide />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', fontFamily: 'JetBrains Mono', fontSize: '11px' }} />
                  <Area type="monotone" dataKey="output" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.1} strokeWidth={1.5} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
