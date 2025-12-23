import { AlertTriangle, Droplets, Thermometer, Layers } from 'lucide-react';

interface Anomaly {
  type: 'window_leakage' | 'roof_loss' | 'thermal_bridge' | 'moisture';
  location: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  suggestedAction: string;
}

interface AnomaliesPanelProps {
  anomalies: Anomaly[];
}

const AnomaliesPanel = ({ anomalies }: AnomaliesPanelProps) => {
  const getIcon = (type: Anomaly['type']) => {
    switch (type) {
      case 'window_leakage': return Thermometer;
      case 'roof_loss': return Layers;
      case 'thermal_bridge': return AlertTriangle;
      case 'moisture': return Droplets;
    }
  };

  const getTypeLabel = (type: Anomaly['type']) => {
    switch (type) {
      case 'window_leakage': return 'Window Leakage';
      case 'roof_loss': return 'Roof Heat Loss';
      case 'thermal_bridge': return 'Thermal Bridge';
      case 'moisture': return 'Moisture Detected';
    }
  };

  const severityColors = {
    Critical: 'text-destructive border-destructive bg-destructive/10',
    High: 'text-analytics-pink border-analytics-pink bg-analytics-pink/10',
    Medium: 'text-primary border-primary bg-primary/10',
    Low: 'text-muted-foreground border-foreground/30',
  };

  return (
    <div className="border border-foreground/10">
      <div className="p-4 border-b border-foreground/10 flex items-center justify-between">
        <h4 className="font-mono text-xs tracking-wider text-muted-foreground">THERMAL ANOMALIES</h4>
        <span className="text-xs font-mono text-analytics-pink">{anomalies.filter(a => a.severity === 'Critical' || a.severity === 'High').length} CRITICAL</span>
      </div>
      <div className="divide-y divide-foreground/5">
        {anomalies.map((anomaly, i) => {
          const Icon = getIcon(anomaly.type);
          return (
            <div key={i} className="p-4 flex items-start gap-3">
              <div className={`p-2 border ${severityColors[anomaly.severity]}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-light text-foreground">{getTypeLabel(anomaly.type)}</p>
                  <span className={`px-1.5 py-0.5 text-[10px] font-mono tracking-wider ${severityColors[anomaly.severity]}`}>
                    {anomaly.severity.toUpperCase()}
                  </span>
                </div>
                <p className="text-xs font-mono text-muted-foreground mb-2">{anomaly.location}</p>
                <p className="text-xs text-foreground/80">
                  <span className="text-primary">→</span> {anomaly.suggestedAction}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AnomaliesPanel;
