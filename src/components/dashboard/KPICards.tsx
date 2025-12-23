import { Thermometer, Zap, Flame, Cloud } from 'lucide-react';

interface KPICardsProps {
  spaceHeating: number;
  uValueRange: { min: number; max: number };
  annualHeatLoss: number;
  co2Intensity: number;
  epcRating: string;
}

const KPICards = ({ spaceHeating, uValueRange, annualHeatLoss, co2Intensity, epcRating }: KPICardsProps) => {
  const kpis = [
    {
      label: 'SPACE HEATING DEMAND',
      value: spaceHeating,
      unit: 'kWh/m²·yr',
      icon: Thermometer,
      color: 'text-primary',
    },
    {
      label: 'EFFECTIVE U-VALUE',
      value: `${uValueRange.min}–${uValueRange.max}`,
      unit: 'W/m²K',
      icon: Zap,
      color: 'text-analytics-pink',
    },
    {
      label: 'ANNUAL HEAT LOSS',
      value: annualHeatLoss.toLocaleString(),
      unit: 'kWh/year',
      icon: Flame,
      color: 'text-analytics-green',
    },
    {
      label: 'CO₂ INTENSITY',
      value: co2Intensity,
      unit: 'kgCO₂/m²·yr',
      icon: Cloud,
      color: 'text-muted-foreground',
    },
    {
      label: 'CURRENT EPC',
      value: epcRating,
      unit: 'RATING',
      icon: null,
      color: 'text-primary',
      large: true,
    },
  ];

  const epcColors: Record<string, string> = {
    A: 'bg-analytics-green/20 border-analytics-green',
    B: 'bg-analytics-green/10 border-analytics-green/60',
    C: 'bg-primary/20 border-primary',
    D: 'bg-primary/10 border-primary/60',
    E: 'bg-analytics-pink/10 border-analytics-pink/60',
    F: 'bg-analytics-pink/20 border-analytics-pink',
    G: 'bg-destructive/20 border-destructive',
  };

  return (
    <div className="grid grid-cols-5 border border-foreground/10 divide-x divide-foreground/10">
      {kpis.map((kpi, i) => (
        <div key={i} className="p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-mono text-muted-foreground tracking-wider">{kpi.label}</span>
            {kpi.icon && <kpi.icon className={`w-4 h-4 ${kpi.color}`} />}
          </div>
          {kpi.large ? (
            <div className={`inline-flex items-center justify-center w-12 h-12 text-2xl font-light font-mono border ${epcColors[epcRating] || 'border-foreground/20'}`}>
              {kpi.value}
            </div>
          ) : (
            <>
              <p className={`text-2xl font-light font-mono ${kpi.color}`}>{kpi.value}</p>
              <p className="text-[10px] font-mono text-muted-foreground mt-1">{kpi.unit}</p>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default KPICards;
