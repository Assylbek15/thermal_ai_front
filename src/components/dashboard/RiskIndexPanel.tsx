import { TrendingUp, TrendingDown, AlertTriangle, Droplets, Zap, Heart } from 'lucide-react';

interface RiskIndex {
  label: string;
  value: number;
  trend: 'up' | 'down' | 'stable';
  icon: 'fuel' | 'damp' | 'efficiency' | 'health';
}

interface RiskIndexPanelProps {
  risks: RiskIndex[];
}

const RiskIndexPanel = ({ risks }: RiskIndexPanelProps) => {
  const getIcon = (icon: RiskIndex['icon']) => {
    switch (icon) {
      case 'fuel': return AlertTriangle;
      case 'damp': return Droplets;
      case 'efficiency': return Zap;
      case 'health': return Heart;
    }
  };

  const getRiskLevel = (value: number) => {
    if (value >= 70) return { label: 'HIGH', color: 'text-analytics-pink bg-analytics-pink' };
    if (value >= 40) return { label: 'MEDIUM', color: 'text-primary bg-primary' };
    return { label: 'LOW', color: 'text-analytics-green bg-analytics-green' };
  };

  return (
    <div className="border border-foreground/10">
      <div className="p-4 border-b border-foreground/10">
        <h4 className="font-mono text-xs tracking-wider text-muted-foreground">RISK INDEXES</h4>
      </div>
      <div className="divide-y divide-foreground/5">
        {risks.map((risk, i) => {
          const Icon = getIcon(risk.icon);
          const riskLevel = getRiskLevel(risk.value);
          return (
            <div key={i} className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs font-mono text-muted-foreground tracking-wider">{risk.label.toUpperCase()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-1.5 py-0.5 text-[10px] font-mono ${riskLevel.color} bg-opacity-10`}>
                    {riskLevel.label}
                  </span>
                  <span className={`text-xs font-mono flex items-center gap-1 ${
                    risk.trend === 'up' ? 'text-analytics-pink' : risk.trend === 'down' ? 'text-analytics-green' : 'text-muted-foreground'
                  }`}>
                    {risk.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : 
                     risk.trend === 'down' ? <TrendingDown className="w-3 h-3" /> : null}
                    {risk.value}%
                  </span>
                </div>
              </div>
              <div className="h-1.5 bg-secondary overflow-hidden">
                <div 
                  className={`h-full transition-all ${riskLevel.color}`}
                  style={{ width: `${risk.value}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RiskIndexPanel;
