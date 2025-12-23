import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Building2, Thermometer, Droplets, TrendingUp, TrendingDown, MapPin, Search, Zap, BarChart3, Activity, AlertTriangle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
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

const ratingDistribution = [
  { name: 'A', value: 15, color: '#22c55e' },
  { name: 'B', value: 25, color: '#4ade80' },
  { name: 'C', value: 30, color: '#facc15' },
  { name: 'D', value: 18, color: '#fb923c' },
  { name: 'E', value: 8, color: '#f97316' },
  { name: 'F', value: 4, color: '#ef4444' },
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

  const currentCity = cities.find((c) => c.id === selectedCity);

  // City selection screen
  if (!selectedCity) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>

          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm mb-6">
              <Building2 className="w-4 h-4" />
              Government Access Portal
            </div>
            <h1 className="text-4xl md:text-5xl font-medium text-foreground mb-4">
              City Dashboard
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Select a city to access thermal analysis data for buildings across the region
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {cities.map((city) => (
              <button
                key={city.id}
                onClick={() => handleCitySelect(city.id)}
                className="group relative bg-card hover:bg-card/80 rounded-lg p-8 text-left transition-all duration-500 border border-border hover:border-primary/50 overflow-hidden"
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary group-hover:from-primary group-hover:to-primary/80 group-hover:text-primary-foreground transition-all duration-300">
                      <Building2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-foreground">{city.name}</h3>
                      <p className="text-sm text-muted-foreground">{city.country}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      {Math.floor(Math.random() * 500) + 200} buildings analyzed
                    </p>
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                      <ArrowLeft className="w-4 h-4 rotate-180" />
                    </div>
                  </div>
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
      <header className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setSelectedCity(null)}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-medium text-foreground">{currentCity?.name}</h1>
              <p className="text-sm text-muted-foreground">{filteredBuildings.length} buildings • Last updated: Today</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search buildings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-secondary/50 border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 w-72"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-br from-card to-card/50 rounded-xl p-5 border border-border">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">Total Buildings</span>
              <div className="p-2 rounded-lg bg-primary/10">
                <Building2 className="w-4 h-4 text-primary" />
              </div>
            </div>
            <p className="text-3xl font-semibold text-foreground">{filteredBuildings.length}</p>
            <p className="text-xs text-green-400 flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" /> +12% from last month
            </p>
          </div>

          <div className="bg-gradient-to-br from-card to-card/50 rounded-xl p-5 border border-border">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">Avg. Efficiency</span>
              <div className="p-2 rounded-lg bg-green-500/10">
                <Zap className="w-4 h-4 text-green-400" />
              </div>
            </div>
            <p className="text-3xl font-semibold text-foreground">74<span className="text-lg text-muted-foreground">%</span></p>
            <p className="text-xs text-green-400 flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" /> +5% improvement
            </p>
          </div>

          <div className="bg-gradient-to-br from-card to-card/50 rounded-xl p-5 border border-border">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">Heat Loss Alerts</span>
              <div className="p-2 rounded-lg bg-destructive/10">
                <AlertTriangle className="w-4 h-4 text-destructive" />
              </div>
            </div>
            <p className="text-3xl font-semibold text-foreground">23</p>
            <p className="text-xs text-destructive flex items-center gap-1 mt-1">
              <TrendingDown className="w-3 h-3" /> 8 critical issues
            </p>
          </div>

          <div className="bg-gradient-to-br from-card to-card/50 rounded-xl p-5 border border-border">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">Energy Saved</span>
              <div className="p-2 rounded-lg bg-cyan-500/10">
                <Activity className="w-4 h-4 text-cyan-400" />
              </div>
            </div>
            <p className="text-3xl font-semibold text-foreground">1.2<span className="text-lg text-muted-foreground">MW</span></p>
            <p className="text-xs text-green-400 flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" /> This quarter
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* Buildings List */}
          <div className="lg:col-span-3 bg-card rounded-xl border border-border overflow-hidden">
            <div className="p-4 border-b border-border">
              <h3 className="font-medium text-foreground">Buildings</h3>
            </div>
            <div className="max-h-[600px] overflow-y-auto">
              {filteredBuildings.map((building) => (
                <button
                  key={building.id}
                  onClick={() => setSelectedBuilding(building)}
                  className={`w-full flex gap-3 p-3 border-b border-border/50 transition-all text-left ${
                    selectedBuilding?.id === building.id
                      ? 'bg-primary/10 border-l-2 border-l-primary'
                      : 'hover:bg-secondary/50'
                  }`}
                >
                  <img
                    src={building.image}
                    alt={building.address}
                    className="w-14 h-14 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{building.address}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3" />
                      {building.district}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`px-1.5 py-0.5 text-xs font-bold rounded ${getEpcColor(building.epcRating)} text-white`}>
                        {building.epcRating}
                      </span>
                      <span className="text-xs text-muted-foreground">{building.efficiency}% eff.</span>
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
              <div className="bg-card rounded-xl border border-border overflow-hidden">
                <div className="p-4 border-b border-border flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-foreground">{selectedBuilding.address}</h3>
                    <p className="text-sm text-muted-foreground">{selectedBuilding.district}</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-3 py-1.5 bg-primary/10 text-primary text-xs font-medium rounded-full">Thermal</span>
                    <span className="px-3 py-1.5 bg-secondary text-muted-foreground text-xs font-medium rounded-full">RGB</span>
                  </div>
                </div>
                <div className="relative">
                  <img
                    src={selectedBuilding.image}
                    alt={selectedBuilding.address}
                    className="w-full h-80 object-cover"
                  />
                  {/* Hotspot markers with animation */}
                  <div
                    className="absolute w-10 h-10 rounded-full bg-yellow-500/80 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform animate-pulse"
                    style={{ top: '30%', left: '40%' }}
                  >
                    <span className="text-sm font-bold text-black">+</span>
                  </div>
                  <div
                    className="absolute w-10 h-10 rounded-full bg-orange-500/80 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform animate-pulse"
                    style={{ top: '50%', left: '65%' }}
                  >
                    <span className="text-sm font-bold text-black">+</span>
                  </div>
                  <div
                    className="absolute w-10 h-10 rounded-full bg-red-500/80 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform animate-pulse"
                    style={{ top: '25%', left: '70%' }}
                  >
                    <span className="text-sm font-bold text-black">+</span>
                  </div>
                  
                  {/* Info overlays */}
                  <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-md rounded-lg px-4 py-3 border border-border/50">
                    <p className="text-xs text-muted-foreground">Energy Use</p>
                    <p className="text-xl font-semibold text-foreground">{selectedBuilding.spaceHeating} <span className="text-sm font-normal text-muted-foreground">kWh/m²</span></p>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-background/90 backdrop-blur-md rounded-lg px-4 py-3 border border-border/50">
                    <p className="text-xs text-muted-foreground">U-Value</p>
                    <p className="text-xl font-semibold text-foreground">{selectedBuilding.uValue} <span className="text-sm font-normal text-muted-foreground">W/m²K</span></p>
                  </div>
                </div>
              </div>
            )}

            {/* Energy Chart */}
            <div className="bg-card rounded-xl border border-border p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-medium text-foreground">Energy Output & AI Prediction</h4>
                  <p className="text-sm text-muted-foreground">Monthly comparison</p>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <span className="text-muted-foreground">Actual Output</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-cyan-400" />
                    <span className="text-muted-foreground">AI Forecast</span>
                  </div>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={energyData}>
                  <defs>
                    <linearGradient id="colorOutput" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Area type="monotone" dataKey="output" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorOutput)" strokeWidth={2} />
                  <Area type="monotone" dataKey="forecast" stroke="#22d3ee" fill="transparent" strokeWidth={2} strokeDasharray="5 5" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Right Stats Panel */}
          <div className="lg:col-span-3 space-y-4">
            {selectedBuilding && (
              <>
                {/* Thermal Anomalies */}
                <div className="bg-card rounded-xl border border-border p-4">
                  <h4 className="font-medium text-foreground mb-4 flex items-center gap-2">
                    <Thermometer className="w-4 h-4 text-primary" />
                    Thermal Anomalies
                  </h4>
                  <div className="space-y-3">
                    {selectedBuilding.thermalAnomalies.map((anomaly, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg">
                        <div className="p-2 rounded-lg bg-destructive/10">
                          <AlertTriangle className="w-3 h-3 text-destructive" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{anomaly.type}</p>
                          <p className="text-xs text-muted-foreground">{anomaly.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* EPC Distribution */}
                <div className="bg-card rounded-xl border border-border p-4">
                  <h4 className="font-medium text-foreground mb-4 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-primary" />
                    EPC Distribution
                  </h4>
                  <div className="h-32">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={ratingDistribution}
                          cx="50%"
                          cy="50%"
                          innerRadius={30}
                          outerRadius={50}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {ratingDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {ratingDistribution.slice(0, 3).map((item) => (
                      <div key={item.name} className="text-center">
                        <span className="text-xs text-muted-foreground">{item.name}</span>
                        <p className="text-sm font-medium" style={{ color: item.color }}>{item.value}%</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Risk Indexes */}
                <div className="bg-card rounded-xl border border-border p-4">
                  <h4 className="font-medium text-foreground mb-4">Risk Indexes</h4>
                  <div className="space-y-3">
                    {selectedBuilding.riskIndexes.map((risk, i) => (
                      <div key={i}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs text-muted-foreground">{risk.label}</span>
                          <span className={`text-xs flex items-center gap-1 ${risk.trend === 'up' ? 'text-destructive' : 'text-green-400'}`}>
                            {risk.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                            {risk.value}%
                          </span>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all ${
                              risk.value > 70 ? 'bg-destructive' : risk.value > 50 ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${risk.value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Building Stats */}
                <div className="bg-card rounded-xl border border-border p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Floor Area</p>
                      <p className="text-lg font-semibold text-foreground">{selectedBuilding.floorArea} m²</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Annual Cost</p>
                      <p className="text-lg font-semibold text-foreground">£{selectedBuilding.annualCost.toLocaleString()}</p>
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