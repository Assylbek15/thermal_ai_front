import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Building2, Thermometer, TrendingUp, TrendingDown, MapPin, Search, Zap, Activity, AlertTriangle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import thermalBuilding1 from '@/assets/thermal-building-1.jpg';
import thermalBuilding2 from '@/assets/thermal-building-2.jpg';
import thermalBuilding3 from '@/assets/thermal-building-3.jpg';
import thermalBuilding4 from '@/assets/thermal-building-4.jpg';
import thermalBuilding5 from '@/assets/thermal-building-5.jpg';
import thermalBuilding6 from '@/assets/thermal-building-6.jpg';

const cities = [
  { id: 'astana', name: 'Astana', country: 'Kazakhstan' },
  { id: 'almaty', name: 'Almaty', country: 'Kazakhstan' },
  { id: 'baku', name: 'Baku', country: 'Azerbaijan' },
  { id: 'istanbul', name: 'Istanbul', country: 'Türkiye' },
  { id: 'bishkek', name: 'Bishkek', country: 'Kyrgyzstan' },
  { id: 'islamabad', name: 'Islamabad', country: 'Pakistan' },
];

interface Building {
  id: string;
  address: string;
  district: string;
  image: string;
  spaceHeating: number;
  fuelPoverty: number;
  floorArea: number;
  epcRating: string;
  energyUse: number;
  annualCost: number;
  uValue: number;
  efficiency: number;
  thermalAnomalies: { type: string; description: string }[];
  riskIndexes: { label: string; value: number; trend: 'up' | 'down' }[];
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

  const cityDistricts = districts[cityId] || districts.astana;
  const cityStreets = streetNames[cityId] || streetNames.astana;

  return Array.from({ length: 8 }, (_, i) => ({
    id: `${cityId}-${i + 1}`,
    address: `${Math.floor(Math.random() * 200) + 1} ${cityStreets[i % cityStreets.length]}`,
    district: cityDistricts[i % cityDistricts.length],
    image: images[i % images.length],
    spaceHeating: Math.floor(Math.random() * 200) + 200,
    fuelPoverty: Math.floor(Math.random() * 60) + 30,
    floorArea: Math.floor(Math.random() * 200) + 100,
    epcRating: ['A', 'B', 'C', 'D', 'E', 'F'][Math.floor(Math.random() * 6)],
    energyUse: Math.floor(Math.random() * 3000) + 2000,
    annualCost: Math.floor(Math.random() * 2000) + 1000,
    uValue: parseFloat((Math.random() * 4 + 1).toFixed(1)),
    efficiency: Math.floor(Math.random() * 40) + 50,
    thermalAnomalies: [
      { type: 'Window', description: `Window ${Math.floor(Math.random() * 5) + 1} - Heat loss detected` },
      { type: 'Roof', description: 'Insulation gap possible' },
    ],
    riskIndexes: [
      { label: 'Fuel Poverty', value: Math.floor(Math.random() * 40) + 50, trend: Math.random() > 0.5 ? 'up' : 'down' as const },
      { label: 'Min Efficiency', value: Math.floor(Math.random() * 30) + 60, trend: Math.random() > 0.5 ? 'up' : 'down' as const },
      { label: 'Damp & Mould', value: Math.floor(Math.random() * 40) + 40, trend: Math.random() > 0.5 ? 'up' : 'down' as const },
    ],
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

const efficiencyData = [
  { name: 'A', value: 15 },
  { name: 'B', value: 25 },
  { name: 'C', value: 30 },
  { name: 'D', value: 18 },
  { name: 'E', value: 8 },
  { name: 'F', value: 4 },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleCitySelect = (cityId: string) => {
    setSelectedCity(cityId);
    const mockBuildings = generateMockBuildings(cityId);
    setBuildings(mockBuildings);
    setSelectedBuilding(mockBuildings[0]);
  };

  const filteredBuildings = buildings.filter(
    (b) =>
      b.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.district.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentCity = cities.find((c) => c.id === selectedCity);

  // City selection screen
  if (!selectedCity) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary mb-12 transition-colors font-mono text-sm tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" />
            BACK TO HOME
          </button>

          <div className="mb-16">
            <p className="text-primary font-mono text-sm tracking-[0.3em] uppercase mb-4">
              Government Access Portal
            </p>
            <h1 className="text-5xl md:text-6xl font-light text-foreground tracking-tight mb-4">
              City Dashboard
            </h1>
            <div className="w-24 h-px bg-primary mb-6" />
            <p className="text-muted-foreground max-w-xl">
              Select a city to access thermal analysis data for buildings across the region
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-foreground/10">
            {cities.map((city) => (
              <button
                key={city.id}
                onClick={() => handleCitySelect(city.id)}
                className="group bg-background p-8 text-left transition-all duration-300 hover:bg-secondary"
              >
                <div className="flex items-center justify-between mb-6">
                  <Building2 className="w-5 h-5 text-primary" />
                  <span className="text-xs font-mono text-muted-foreground tracking-wider">
                    {Math.floor(Math.random() * 500) + 200} BUILDINGS
                  </span>
                </div>
                <h3 className="text-2xl font-light text-foreground mb-1">{city.name}</h3>
                <p className="text-sm text-muted-foreground font-mono tracking-wider">{city.country.toUpperCase()}</p>
                <div className="mt-6 flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs font-mono tracking-wider">ACCESS</span>
                  <ArrowLeft className="w-3 h-3 rotate-180" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Main dashboard view
  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <header className="border-b border-foreground/10 sticky top-0 z-50 bg-background">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-8">
            <button
              onClick={() => setSelectedCity(null)}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-light text-foreground tracking-wide">{currentCity?.name}</h1>
              <span className="text-xs font-mono text-muted-foreground tracking-wider border-l border-foreground/20 pl-4">
                {filteredBuildings.length} BUILDINGS
              </span>
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-transparent border border-foreground/20 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary w-64 font-mono"
            />
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-4 border-b border-foreground/10 mb-6">
          <div className="p-6 border-r border-foreground/10">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-muted-foreground tracking-wider">TOTAL BUILDINGS</span>
              <Building2 className="w-4 h-4 text-primary" />
            </div>
            <p className="text-4xl font-light text-foreground font-mono">{filteredBuildings.length}</p>
            <p className="text-xs text-analytics-green flex items-center gap-1 mt-2 font-mono">
              <TrendingUp className="w-3 h-3" /> +12%
            </p>
          </div>

          <div className="p-6 border-r border-foreground/10">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-muted-foreground tracking-wider">AVG EFFICIENCY</span>
              <Zap className="w-4 h-4 text-analytics-green" />
            </div>
            <p className="text-4xl font-light text-foreground font-mono">74<span className="text-lg text-muted-foreground">%</span></p>
            <p className="text-xs text-analytics-green flex items-center gap-1 mt-2 font-mono">
              <TrendingUp className="w-3 h-3" /> +5%
            </p>
          </div>

          <div className="p-6 border-r border-foreground/10">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-muted-foreground tracking-wider">HEAT LOSS ALERTS</span>
              <AlertTriangle className="w-4 h-4 text-analytics-pink" />
            </div>
            <p className="text-4xl font-light text-foreground font-mono">23</p>
            <p className="text-xs text-analytics-pink flex items-center gap-1 mt-2 font-mono">
              8 CRITICAL
            </p>
          </div>

          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-muted-foreground tracking-wider">ENERGY SAVED</span>
              <Activity className="w-4 h-4 text-primary" />
            </div>
            <p className="text-4xl font-light text-foreground font-mono">1.2<span className="text-lg text-muted-foreground">MW</span></p>
            <p className="text-xs text-analytics-green flex items-center gap-1 mt-2 font-mono">
              THIS QUARTER
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* Buildings List */}
          <div className="lg:col-span-3 border border-foreground/10">
            <div className="p-4 border-b border-foreground/10">
              <h3 className="font-mono text-xs tracking-wider text-muted-foreground">BUILDINGS</h3>
            </div>
            <div className="max-h-[600px] overflow-y-auto">
              {filteredBuildings.map((building) => (
                <button
                  key={building.id}
                  onClick={() => setSelectedBuilding(building)}
                  className={`w-full flex gap-3 p-4 border-b border-foreground/5 transition-all text-left ${
                    selectedBuilding?.id === building.id
                      ? 'bg-primary/10 border-l-2 border-l-primary'
                      : 'hover:bg-secondary'
                  }`}
                >
                  <img
                    src={building.image}
                    alt={building.address}
                    className="w-12 h-12 object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-light text-foreground truncate">{building.address}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1 font-mono">
                      <MapPin className="w-3 h-3" />
                      {building.district}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-xs font-mono text-primary">{building.epcRating}</span>
                      <span className="text-xs font-mono text-muted-foreground">{building.efficiency}%</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-6 space-y-6">
            {/* Thermal Image */}
            {selectedBuilding && (
              <div className="border border-foreground/10">
                <div className="p-4 border-b border-foreground/10 flex items-center justify-between">
                  <div>
                    <h3 className="font-light text-foreground">{selectedBuilding.address}</h3>
                    <p className="text-xs font-mono text-muted-foreground tracking-wider">{selectedBuilding.district.toUpperCase()}</p>
                  </div>
                  <div className="flex gap-4 text-xs font-mono tracking-wider">
                    <span className="text-primary">THERMAL</span>
                    <span className="text-muted-foreground">RGB</span>
                  </div>
                </div>
                <div className="relative">
                  <img
                    src={selectedBuilding.image}
                    alt={selectedBuilding.address}
                    className="w-full h-80 object-cover"
                  />
                  
                  {/* Info overlays */}
                  <div className="absolute bottom-4 left-4 bg-background/95 px-4 py-3 border border-foreground/20">
                    <p className="text-[10px] font-mono text-muted-foreground tracking-wider">ENERGY USE</p>
                    <p className="text-xl font-light text-primary font-mono">{selectedBuilding.spaceHeating} <span className="text-xs text-muted-foreground">kWh/m²</span></p>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-background/95 px-4 py-3 border border-foreground/20">
                    <p className="text-[10px] font-mono text-muted-foreground tracking-wider">U-VALUE</p>
                    <p className="text-xl font-light text-analytics-pink font-mono">{selectedBuilding.uValue} <span className="text-xs text-muted-foreground">W/m²K</span></p>
                  </div>
                </div>
              </div>
            )}

            {/* Energy Chart */}
            <div className="border border-foreground/10 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h4 className="font-light text-foreground">Energy Output</h4>
                  <p className="text-xs font-mono text-muted-foreground tracking-wider mt-1">MONTHLY COMPARISON</p>
                </div>
                <div className="flex items-center gap-6 text-xs font-mono tracking-wider">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-px bg-primary" />
                    <span className="text-muted-foreground">ACTUAL</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-px bg-analytics-pink" />
                    <span className="text-muted-foreground">FORECAST</span>
                  </div>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={energyData}>
                  <XAxis 
                    dataKey="month" 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={10} 
                    tickLine={false}
                    axisLine={{ stroke: 'hsl(var(--border))' }}
                    fontFamily="JetBrains Mono"
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={10} 
                    tickLine={false}
                    axisLine={false}
                    fontFamily="JetBrains Mono"
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--background))', 
                      border: '1px solid hsl(var(--border))',
                      fontFamily: 'JetBrains Mono',
                      fontSize: '11px'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="output" 
                    stroke="hsl(var(--primary))" 
                    fill="transparent" 
                    strokeWidth={1.5} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="forecast" 
                    stroke="hsl(var(--analytics-pink))" 
                    fill="transparent" 
                    strokeWidth={1.5} 
                    strokeDasharray="4 4" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Right Stats Panel */}
          <div className="lg:col-span-3 space-y-6">
            {selectedBuilding && (
              <>
                {/* Thermal Anomalies */}
                <div className="border border-foreground/10">
                  <div className="p-4 border-b border-foreground/10 flex items-center gap-2">
                    <Thermometer className="w-4 h-4 text-analytics-pink" />
                    <h4 className="font-mono text-xs tracking-wider text-muted-foreground">THERMAL ANOMALIES</h4>
                  </div>
                  <div className="p-4 space-y-3">
                    {selectedBuilding.thermalAnomalies.map((anomaly, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 border border-foreground/10">
                        <AlertTriangle className="w-3 h-3 text-analytics-pink mt-0.5" />
                        <div>
                          <p className="text-sm font-light text-foreground">{anomaly.type}</p>
                          <p className="text-xs font-mono text-muted-foreground mt-1">{anomaly.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* EPC Distribution */}
                <div className="border border-foreground/10">
                  <div className="p-4 border-b border-foreground/10">
                    <h4 className="font-mono text-xs tracking-wider text-muted-foreground">EPC DISTRIBUTION</h4>
                  </div>
                  <div className="p-4">
                    <ResponsiveContainer width="100%" height={120}>
                      <BarChart data={efficiencyData} layout="horizontal">
                        <XAxis 
                          dataKey="name" 
                          stroke="hsl(var(--muted-foreground))" 
                          fontSize={10}
                          tickLine={false}
                          axisLine={false}
                          fontFamily="JetBrains Mono"
                        />
                        <YAxis hide />
                        <Bar 
                          dataKey="value" 
                          fill="hsl(var(--primary))" 
                          radius={0}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Risk Indexes */}
                <div className="border border-foreground/10">
                  <div className="p-4 border-b border-foreground/10">
                    <h4 className="font-mono text-xs tracking-wider text-muted-foreground">RISK INDEXES</h4>
                  </div>
                  <div className="p-4 space-y-4">
                    {selectedBuilding.riskIndexes.map((risk, i) => (
                      <div key={i}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-mono text-muted-foreground">{risk.label.toUpperCase()}</span>
                          <span className={`text-xs font-mono flex items-center gap-1 ${risk.trend === 'up' ? 'text-analytics-pink' : 'text-analytics-green'}`}>
                            {risk.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                            {risk.value}%
                          </span>
                        </div>
                        <div className="h-1 bg-secondary overflow-hidden">
                          <div 
                            className={`h-full transition-all ${
                              risk.value > 70 ? 'bg-analytics-pink' : risk.value > 50 ? 'bg-primary' : 'bg-analytics-green'
                            }`}
                            style={{ width: `${risk.value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Building Stats */}
                <div className="border border-foreground/10">
                  <div className="grid grid-cols-2 divide-x divide-foreground/10">
                    <div className="p-4">
                      <p className="text-[10px] font-mono text-muted-foreground tracking-wider mb-1">FLOOR AREA</p>
                      <p className="text-lg font-light text-foreground font-mono">{selectedBuilding.floorArea} <span className="text-xs text-muted-foreground">m²</span></p>
                    </div>
                    <div className="p-4">
                      <p className="text-[10px] font-mono text-muted-foreground tracking-wider mb-1">ANNUAL COST</p>
                      <p className="text-lg font-light text-foreground font-mono">£{selectedBuilding.annualCost.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;