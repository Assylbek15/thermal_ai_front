import { Building2, Calendar, ThermometerSun, Shield, Eye, Layers, Tag } from 'lucide-react';

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

interface BuildingDetailsProps {
  building: Building;
  viewMode: '3d' | 'thermal' | 'hotspot';
  onViewModeChange: (mode: '3d' | 'thermal' | 'hotspot') => void;
  toggles: {
    thermalIntensity: boolean;
    heatLossHotspots: boolean;
    featureLabels: boolean;
    confidenceMask: boolean;
  };
  onToggleChange: (key: keyof BuildingDetailsProps['toggles']) => void;
}

const BuildingDetails = ({ building, viewMode, onViewModeChange, toggles, onToggleChange }: BuildingDetailsProps) => {
  const confidenceColors = {
    High: 'bg-analytics-green text-analytics-green',
    Medium: 'bg-primary text-primary',
    Low: 'bg-analytics-pink text-analytics-pink',
  };

  return (
    <div className="border border-foreground/10">
      {/* Header with building info */}
      <div className="p-4 border-b border-foreground/10">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="font-light text-foreground text-lg">{building.name}</h3>
              <span className={`px-2 py-0.5 text-[10px] font-mono tracking-wider border ${confidenceColors[building.confidenceScore]} bg-opacity-10`}>
                {building.confidenceScore.toUpperCase()} CONFIDENCE
              </span>
            </div>
            <div className="flex flex-wrap gap-4 text-xs font-mono text-muted-foreground">
              <span className="flex items-center gap-1">
                <Tag className="w-3 h-3" />
                {building.type}
              </span>
              <span className="flex items-center gap-1">
                <ThermometerSun className="w-3 h-3" />
                {building.climateZone}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {building.inspectionDate}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {building.captureConditions}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* View mode toggles */}
      <div className="p-4 border-b border-foreground/10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-2">
          {(['3d', 'thermal', 'hotspot'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => onViewModeChange(mode)}
              className={`px-4 py-2 text-xs font-mono tracking-wider transition-all ${
                viewMode === mode
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {mode === '3d' ? '3D MODEL' : mode === 'thermal' ? 'THERMAL' : 'HOTSPOTS'}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {Object.entries(toggles).map(([key, value]) => (
            <button
              key={key}
              onClick={() => onToggleChange(key as keyof typeof toggles)}
              className={`px-3 py-2 text-[10px] font-mono tracking-wider border transition-all whitespace-nowrap ${
                value
                  ? 'border-primary text-primary bg-primary/10'
                  : 'border-foreground/20 text-muted-foreground hover:border-foreground/40'
              }`}
            >
              {key.replace(/([A-Z])/g, ' $1').trim().toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Thermal Image */}
      <div className="relative">
        <img
          src={building.image}
          alt={building.name}
          className="w-full h-72 object-cover"
        />
        
        {/* View overlays based on mode */}
        {viewMode === 'hotspot' && toggles.heatLossHotspots && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[20%] left-[30%] w-16 h-16 border-2 border-analytics-pink rounded-full animate-pulse" />
            <div className="absolute top-[40%] right-[25%] w-12 h-12 border-2 border-analytics-pink rounded-full animate-pulse" />
            <div className="absolute bottom-[30%] left-[45%] w-14 h-14 border-2 border-primary rounded-full animate-pulse" />
          </div>
        )}

        {toggles.featureLabels && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[15%] left-[20%] bg-background/90 px-2 py-1 text-[10px] font-mono text-foreground border border-foreground/20">
              ROOF
            </div>
            <div className="absolute top-[45%] left-[10%] bg-background/90 px-2 py-1 text-[10px] font-mono text-foreground border border-foreground/20">
              WALL
            </div>
            <div className="absolute top-[50%] left-[40%] bg-background/90 px-2 py-1 text-[10px] font-mono text-foreground border border-foreground/20">
              WINDOW
            </div>
          </div>
        )}

        {toggles.confidenceMask && (
          <div className="absolute inset-0 bg-gradient-to-br from-analytics-green/20 via-primary/20 to-analytics-pink/20 pointer-events-none" />
        )}

        {/* Info overlays */}
        <div className="absolute bottom-4 left-4 bg-background/95 px-4 py-3 border border-foreground/20">
          <p className="text-[10px] font-mono text-muted-foreground tracking-wider">SPACE HEATING</p>
          <p className="text-xl font-light text-primary font-mono">{building.spaceHeating} <span className="text-xs text-muted-foreground">kWh/m²·yr</span></p>
        </div>
        <div className="absolute bottom-4 right-4 bg-background/95 px-4 py-3 border border-foreground/20">
          <p className="text-[10px] font-mono text-muted-foreground tracking-wider">EFF. U-VALUE</p>
          <p className="text-xl font-light text-analytics-pink font-mono">{building.uValueRange.min}-{building.uValueRange.max} <span className="text-xs text-muted-foreground">W/m²K</span></p>
        </div>
      </div>
    </div>
  );
};

export default BuildingDetails;
