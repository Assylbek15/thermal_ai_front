import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Building2, Search, TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar } from 'recharts';
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

const energyHistogram = [
  { range: '0', count: 8000 },
  { range: '1', count: 35000 },
  { range: '2', count: 18000 },
  { range: '3', count: 8000 },
  { range: '4', count: 4000 },
  { range: '5', count: 2000 },
];

const efficiencyTrend = [
  { month: 'Jan', rate: 42 },
  { month: 'Feb', rate: 38 },
  { month: 'Mar', rate: 35 },
  { month: 'Apr', rate: 32 },
  { month: 'May', rate: 28 },
  { month: 'Jun', rate: 22 },
];

const sessionData = [
  { x: 0, pvs: 1.6, sessions: 40 },
  { x: 1, pvs: 2.4, sessions: 55 },
  { x: 2, pvs: 3.2, sessions: 75 },
  { x: 3, pvs: 2.8, sessions: 82 },
  { x: 4, pvs: 3.4, sessions: 90 },
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
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>

          <div className="text-center mb-16">
            <p className="text-dashboard-cyan text-xs font-medium tracking-[0.3em] uppercase mb-4">
              Government Access Portal
            </p>
            <h1 className="text-5xl md:text-6xl font-light text-foreground tracking-tight mb-4">
              City Dashboard
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Select a city to access thermal analysis data
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-dashboard-divider max-w-5xl mx-auto border border-dashboard-divider">
            {cities.map((city) => (
              <button
                key={city.id}
                onClick={() => handleCitySelect(city.id)}
                className="group bg-background p-8 text-left transition-all duration-300 hover:bg-secondary/30"
              >
                <div className="flex items-start justify-between mb-6">
                  <Building2 className="w-5 h-5 text-dashboard-cyan" />
                  <ArrowLeft className="w-4 h-4 rotate-180 text-muted-foreground group-hover:text-dashboard-cyan transition-colors" />
                </div>
                <h3 className="text-xl font-medium text-foreground mb-1">{city.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{city.country}</p>
                <p className="text-xs text-muted-foreground">
                  {Math.floor(Math.random() * 500) + 200} buildings
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Main dashboard view
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-dashboard-divider">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setSelectedCity(null)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <h1 className="text-lg font-medium text-foreground tracking-tight">
                {currentCity?.name}
              </h1>
              <span className="text-xs text-muted-foreground px-2 py-1 border border-dashboard-divider">
                {filteredBuildings.length} buildings
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
              className="pl-10 pr-4 py-2 bg-transparent border border-dashboard-divider text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-dashboard-cyan w-64"
            />
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Left Sidebar - Buildings List */}
        <aside className="w-72 border-r border-dashboard-divider min-h-[calc(100vh-57px)]">
          <div className="p-4 border-b border-dashboard-divider">
            <span className="text-xs text-muted-foreground tracking-wider uppercase">Buildings</span>
          </div>
          <div className="overflow-y-auto max-h-[calc(100vh-120px)]">
            {filteredBuildings.map((building) => (
              <button
                key={building.id}
                onClick={() => setSelectedBuilding(building)}
                className={`w-full flex gap-3 p-4 border-b border-dashboard-divider text-left transition-all ${
                  selectedBuilding?.id === building.id
                    ? 'bg-dashboard-cyan/5 border-l-2 border-l-dashboard-cyan'
                    : 'hover:bg-secondary/20'
                }`}
              >
                <img
                  src={building.image}
                  alt={building.address}
                  className="w-12 h-12 object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{building.address}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{building.district}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-dashboard-cyan">{building.epcRating}</span>
                    <span className="text-xs text-muted-foreground">{building.efficiency}%</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Top Stats Row */}
          <div className="grid grid-cols-4 gap-px bg-dashboard-divider border border-dashboard-divider mb-6">
            <div className="bg-background p-5">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Buildings Analyzed</p>
              <p className="text-3xl font-light text-dashboard-cyan">{filteredBuildings.length}</p>
              <p className="text-xs text-dashboard-green flex items-center gap-1 mt-2">
                <TrendingUp className="w-3 h-3" /> +12%
              </p>
            </div>
            <div className="bg-background p-5">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Avg. Efficiency</p>
              <p className="text-3xl font-light text-foreground">74<span className="text-lg text-muted-foreground">%</span></p>
              <p className="text-xs text-dashboard-green flex items-center gap-1 mt-2">
                <TrendingUp className="w-3 h-3" /> +5%
              </p>
            </div>
            <div className="bg-background p-5">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Heat Loss Alerts</p>
              <p className="text-3xl font-light text-dashboard-pink">23</p>
              <p className="text-xs text-dashboard-pink flex items-center gap-1 mt-2">
                <TrendingDown className="w-3 h-3" /> 8 critical
              </p>
            </div>
            <div className="bg-background p-5">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Energy Saved</p>
              <p className="text-3xl font-light text-foreground">1.2<span className="text-lg text-muted-foreground">MW</span></p>
              <p className="text-xs text-dashboard-green flex items-center gap-1 mt-2">
                <TrendingUp className="w-3 h-3" /> Q4 2025
              </p>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {/* Main Chart Area */}
            <div className="col-span-8 space-y-6">
              {/* Energy Distribution Chart */}
              <div className="border border-dashboard-divider">
                <div className="flex items-center justify-between p-4 border-b border-dashboard-divider">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">Energy Use vs Efficiency Rate</span>
                  <span className="text-xs text-muted-foreground">Median: 1.03s</span>
                </div>
                <div className="p-6">
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={energyHistogram} barCategoryGap="15%">
                        <XAxis 
                          dataKey="range" 
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                        />
                        <YAxis 
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                          tickFormatter={(v) => `${v / 1000}K`}
                        />
                        <Bar dataKey="count" fill="hsl(var(--dashboard-cyan))" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex items-center gap-6 mt-4 pt-4 border-t border-dashboard-divider">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-0.5 bg-dashboard-cyan" />
                      <span className="text-xs text-muted-foreground">Energy Use (kWh)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-0.5 bg-dashboard-pink" />
                      <span className="text-xs text-muted-foreground">Efficiency Rate</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sessions Stats */}
              <div className="grid grid-cols-3 gap-px bg-dashboard-divider border border-dashboard-divider">
                <div className="bg-background p-5">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Sessions (LUX)</p>
                  <p className="text-4xl font-light text-dashboard-cyan">479K</p>
                  <p className="text-xs text-muted-foreground mt-1">4 pvs</p>
                </div>
                <div className="bg-background p-5">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Session Length (LUX)</p>
                  <p className="text-4xl font-light text-dashboard-cyan">17<span className="text-lg">min</span></p>
                </div>
                <div className="bg-background p-5">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">PVs Per Session (LUX)</p>
                  <p className="text-4xl font-light text-dashboard-pink">2<span className="text-lg">pvs</span></p>
                </div>
              </div>

              {/* Line Charts */}
              <div className="border border-dashboard-divider p-6">
                <div className="h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={sessionData}>
                      <XAxis 
                        dataKey="x" 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                      />
                      <YAxis 
                        yAxisId="left"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                        tickFormatter={(v) => `${v} pvs`}
                      />
                      <YAxis 
                        yAxisId="right"
                        orientation="right"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                        tickFormatter={(v) => `${v}K`}
                      />
                      <Line 
                        yAxisId="left"
                        type="monotone" 
                        dataKey="pvs" 
                        stroke="hsl(var(--dashboard-lime))" 
                        strokeWidth={2}
                        dot={false}
                      />
                      <Line 
                        yAxisId="right"
                        type="monotone" 
                        dataKey="sessions" 
                        stroke="hsl(var(--dashboard-green))" 
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Right Panel - Building Details */}
            <div className="col-span-4 space-y-6">
              {selectedBuilding && (
                <>
                  {/* Thermal Image */}
                  <div className="border border-dashboard-divider">
                    <div className="p-4 border-b border-dashboard-divider">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">{selectedBuilding.address}</p>
                    </div>
                    <div className="relative">
                      <img
                        src={selectedBuilding.image}
                        alt={selectedBuilding.address}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-px bg-dashboard-divider">
                      <div className="bg-background p-4">
                        <p className="text-xs text-muted-foreground">Energy Use</p>
                        <p className="text-lg font-light text-foreground">{selectedBuilding.spaceHeating} <span className="text-xs text-muted-foreground">kWh/m²</span></p>
                      </div>
                      <div className="bg-background p-4">
                        <p className="text-xs text-muted-foreground">U-Value</p>
                        <p className="text-lg font-light text-foreground">{selectedBuilding.uValue} <span className="text-xs text-muted-foreground">W/m²K</span></p>
                      </div>
                    </div>
                  </div>

                  {/* Risk Indexes */}
                  <div className="border border-dashboard-divider">
                    <div className="p-4 border-b border-dashboard-divider">
                      <span className="text-xs text-muted-foreground uppercase tracking-wider">Risk Indexes</span>
                    </div>
                    <div className="divide-y divide-dashboard-divider">
                      {selectedBuilding.riskIndexes.map((risk, i) => (
                        <div key={i} className="p-4 flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">{risk.label}</span>
                          <div className="flex items-center gap-3">
                            <div className="w-24 h-1 bg-secondary overflow-hidden">
                              <div 
                                className={`h-full transition-all ${
                                  risk.value > 70 ? 'bg-dashboard-pink' : risk.value > 50 ? 'bg-dashboard-cyan' : 'bg-dashboard-green'
                                }`}
                                style={{ width: `${risk.value}%` }}
                              />
                            </div>
                            <span className={`text-sm font-medium ${
                              risk.trend === 'up' ? 'text-dashboard-pink' : 'text-dashboard-green'
                            }`}>
                              {risk.value}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Building Stats */}
                  <div className="grid grid-cols-2 gap-px bg-dashboard-divider border border-dashboard-divider">
                    <div className="bg-background p-4">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Floor Area</p>
                      <p className="text-xl font-light text-foreground">{selectedBuilding.floorArea} <span className="text-sm text-muted-foreground">m²</span></p>
                    </div>
                    <div className="bg-background p-4">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Annual Cost</p>
                      <p className="text-xl font-light text-foreground">£{selectedBuilding.annualCost.toLocaleString()}</p>
                    </div>
                  </div>

                  {/* Efficiency Trend */}
                  <div className="border border-dashboard-divider">
                    <div className="p-4 border-b border-dashboard-divider">
                      <span className="text-xs text-muted-foreground uppercase tracking-wider">Efficiency Trend</span>
                    </div>
                    <div className="p-4 h-32">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={efficiencyTrend}>
                          <XAxis 
                            dataKey="month" 
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
                          />
                          <YAxis 
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
                            domain={[0, 50]}
                            tickFormatter={(v) => `${v}%`}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="rate" 
                            stroke="hsl(var(--dashboard-pink))" 
                            strokeWidth={1.5}
                            dot={false}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
