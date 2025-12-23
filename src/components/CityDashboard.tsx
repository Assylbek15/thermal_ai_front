import { useState } from 'react';
import { ArrowLeft, Building2, Thermometer, Droplets, TrendingDown, MapPin, Search } from 'lucide-react';
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
  { id: 'istanbul', name: 'Istanbul', country: 'Turkey' },
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
  thermalAnomalies: { type: string; description: string }[];
  riskIndexes: { label: string; value: number }[];
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
    thermalAnomalies: [
      { type: 'Window', description: `Window ${Math.floor(Math.random() * 5) + 1} - Heat loss detected` },
      { type: 'Roof', description: 'Insulation gap possible' },
    ],
    riskIndexes: [
      { label: 'Fuel Poverty', value: Math.floor(Math.random() * 40) + 50 },
      { label: 'Minimum Efficiency', value: Math.floor(Math.random() * 30) + 60 },
      { label: 'Damp & Mould', value: Math.floor(Math.random() * 40) + 40 },
    ],
  }));
};

interface CityDashboardProps {
  onBack: () => void;
}

const CityDashboard = ({ onBack }: CityDashboardProps) => {
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

  const getEpcColor = (rating: string) => {
    const colors: Record<string, string> = {
      A: 'bg-green-500',
      B: 'bg-green-400',
      C: 'bg-yellow-400',
      D: 'bg-orange-400',
      E: 'bg-orange-500',
      F: 'bg-red-500',
    };
    return colors[rating] || 'bg-muted';
  };

  if (!selectedCity) {
    return (
      <section className="min-h-screen flex items-center bg-background py-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Analysis
          </button>

          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">
              Government Access
            </p>
            <h2 className="text-4xl md:text-5xl font-medium text-foreground mb-6">
              City Dashboard
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Select a city to view thermal analysis data for buildings across the region.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {cities.map((city) => (
              <button
                key={city.id}
                onClick={() => handleCitySelect(city.id)}
                className="group bg-card hover:bg-secondary/80 rounded-sm p-8 text-left transition-all duration-300 border border-border hover:border-primary"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-foreground">{city.name}</h3>
                    <p className="text-sm text-muted-foreground">{city.country}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  View thermal imaging data for buildings in {city.name}
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const currentCity = cities.find((c) => c.id === selectedCity);

  return (
    <section className="min-h-screen bg-background py-6">
      <div className="max-w-[1800px] mx-auto px-4 lg:px-8 w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSelectedCity(null)}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <h2 className="text-2xl font-medium text-foreground">{currentCity?.name} Dashboard</h2>
              <p className="text-sm text-muted-foreground">{filteredBuildings.length} buildings analyzed</p>
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by address..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-secondary border border-border rounded-sm text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary w-64"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-[320px_1fr_300px] gap-6">
          {/* Buildings List */}
          <div className="bg-card rounded-sm border border-border overflow-hidden">
            <div className="p-4 border-b border-border">
              <h3 className="font-medium text-foreground">Buildings</h3>
            </div>
            <div className="max-h-[calc(100vh-220px)] overflow-y-auto">
              {filteredBuildings.map((building) => (
                <button
                  key={building.id}
                  onClick={() => setSelectedBuilding(building)}
                  className={`w-full flex gap-3 p-3 border-b border-border transition-colors text-left ${
                    selectedBuilding?.id === building.id
                      ? 'bg-secondary'
                      : 'hover:bg-secondary/50'
                  }`}
                >
                  <img
                    src={building.image}
                    alt={building.address}
                    className="w-16 h-12 object-cover rounded-sm"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{building.address}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {building.district}
                    </p>
                    <div className="flex items-center gap-3 mt-1">
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-muted-foreground">Space Heating</span>
                        <span className="text-xs font-medium text-primary">{building.spaceHeating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-muted-foreground">Fuel Poverty</span>
                        <span className="text-xs font-medium text-destructive">{building.fuelPoverty}%</span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Main Thermal Image */}
          {selectedBuilding && (
            <div className="bg-card rounded-sm border border-border overflow-hidden">
              <div className="p-4 border-b border-border flex items-center justify-between">
                <h3 className="font-medium text-foreground">{selectedBuilding.address}</h3>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">Thermal</span>
                  <span className="px-3 py-1 bg-secondary text-muted-foreground text-xs rounded-full">RGB</span>
                </div>
              </div>
              <div className="relative">
                <img
                  src={selectedBuilding.image}
                  alt={selectedBuilding.address}
                  className="w-full h-auto"
                />
                {/* Hotspot markers */}
                <div
                  className="absolute w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
                  style={{ top: '30%', left: '40%' }}
                >
                  <span className="text-xs font-bold text-black">+</span>
                </div>
                <div
                  className="absolute w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
                  style={{ top: '50%', left: '60%' }}
                >
                  <span className="text-xs font-bold text-black">+</span>
                </div>
                {/* Info overlay */}
                <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm rounded-sm px-3 py-2">
                  <p className="text-xs text-muted-foreground">kWh/m²/yr.</p>
                  <p className="text-lg font-medium text-foreground">{selectedBuilding.spaceHeating}</p>
                </div>
                <div className="absolute bottom-4 right-4 bg-background/90 backdrop-blur-sm rounded-sm px-3 py-2">
                  <p className="text-xs text-muted-foreground">U-value</p>
                  <p className="text-lg font-medium text-foreground">{selectedBuilding.uValue} W/m²K</p>
                </div>
              </div>
              <div className="p-4 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  Floor Area: <span className="text-foreground font-medium">{selectedBuilding.floorArea} m²</span>
                </p>
              </div>
            </div>
          )}

          {/* Stats Panel */}
          {selectedBuilding && (
            <div className="space-y-4">
              {/* Thermal Anomalies */}
              <div className="bg-card rounded-sm border border-border p-4">
                <h4 className="font-medium text-foreground mb-3 text-sm uppercase tracking-wider">
                  Thermal Anomalies
                </h4>
                <div className="space-y-3">
                  {selectedBuilding.thermalAnomalies.map((anomaly, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="p-2 rounded-full bg-destructive/10">
                        <Thermometer className="w-4 h-4 text-destructive" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{anomaly.type}</p>
                        <p className="text-xs text-muted-foreground">{anomaly.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Space Heating Demand */}
              <div className="bg-card rounded-sm border border-border p-4">
                <h4 className="font-medium text-foreground mb-3 text-sm uppercase tracking-wider">
                  Space Heating Demand
                </h4>
                <div className="flex items-center justify-between mb-4">
                  <div className="relative w-20 h-20">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="hsl(var(--border))"
                        strokeWidth="3"
                      />
                      <path
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="hsl(var(--destructive))"
                        strokeWidth="3"
                        strokeDasharray={`${selectedBuilding.fuelPoverty}, 100`}
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-lg font-medium text-foreground">
                      {selectedBuilding.spaceHeating}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">kWh/m²/yr</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">EPC</span>
                    <span className={`px-2 py-1 text-xs font-bold text-white rounded ${getEpcColor(selectedBuilding.epcRating)}`}>
                      {selectedBuilding.epcRating}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Accuracy</p>
                    <p className="text-sm font-medium text-foreground">{40 + Math.floor(Math.random() * 30)}%</p>
                  </div>
                </div>
              </div>

              {/* Energy Stats */}
              <div className="bg-card rounded-sm border border-border p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Energy Use</p>
                    <p className="text-lg font-medium text-foreground">{selectedBuilding.energyUse.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">kWh/year</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Est. Annual Cost</p>
                    <p className="text-lg font-medium text-foreground">£{selectedBuilding.annualCost.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">£/year</p>
                  </div>
                </div>
              </div>

              {/* Risk Indexes */}
              <div className="bg-card rounded-sm border border-border p-4">
                <h4 className="font-medium text-foreground mb-3 text-sm uppercase tracking-wider">
                  Risk Indexes
                </h4>
                <div className="space-y-3">
                  {selectedBuilding.riskIndexes.map((risk, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">{risk.label}</span>
                        <span className="text-foreground font-medium">{risk.value}%</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all"
                          style={{ width: `${risk.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CityDashboard;
