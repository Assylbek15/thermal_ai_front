import { Info, CheckCircle } from 'lucide-react';

interface DataQualityPanelProps {
  accuracy: {
    thermalQuality: number;
    windUncertainty: number;
    emissivityConfidence: number;
  };
  assumptions: {
    indoorTemp: number;
    hddSource: string;
    retrofitUValues: string;
  };
}

const DataQualityPanel = ({ accuracy, assumptions }: DataQualityPanelProps) => {
  const getQualityColor = (value: number) => {
    if (value >= 80) return 'text-analytics-green bg-analytics-green';
    if (value >= 60) return 'text-primary bg-primary';
    return 'text-analytics-pink bg-analytics-pink';
  };

  return (
    <div className="border border-foreground/10">
      <div className="p-4 border-b border-foreground/10">
        <h4 className="font-mono text-xs tracking-wider text-muted-foreground">DATA QUALITY & ASSUMPTIONS</h4>
      </div>

      <div className="grid lg:grid-cols-2 divide-x divide-foreground/10">
        {/* Accuracy */}
        <div className="p-4 space-y-4">
          <p className="text-[10px] font-mono text-muted-foreground tracking-wider">ACCURACY BREAKDOWN</p>
          
          {Object.entries(accuracy).map(([key, value]) => {
            const label = key.replace(/([A-Z])/g, ' $1').trim();
            const qualityColor = getQualityColor(value);
            return (
              <div key={key}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-foreground capitalize">{label}</span>
                  <span className={`text-xs font-mono ${qualityColor}`}>{value}%</span>
                </div>
                <div className="h-1 bg-secondary overflow-hidden">
                  <div 
                    className={`h-full ${qualityColor}`}
                    style={{ width: `${value}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Assumptions */}
        <div className="p-4">
          <p className="text-[10px] font-mono text-muted-foreground tracking-wider mb-4">KEY ASSUMPTIONS</p>
          
          <div className="space-y-3">
            <div className="flex items-start gap-2 p-2 border border-foreground/10">
              <Info className="w-3 h-3 text-primary mt-0.5" />
              <div>
                <p className="text-xs text-foreground">Indoor Temperature</p>
                <p className="text-xs font-mono text-muted-foreground">{assumptions.indoorTemp}°C assumed</p>
              </div>
            </div>
            <div className="flex items-start gap-2 p-2 border border-foreground/10">
              <Info className="w-3 h-3 text-primary mt-0.5" />
              <div>
                <p className="text-xs text-foreground">HDD Source</p>
                <p className="text-xs font-mono text-muted-foreground">{assumptions.hddSource}</p>
              </div>
            </div>
            <div className="flex items-start gap-2 p-2 border border-foreground/10">
              <CheckCircle className="w-3 h-3 text-analytics-green mt-0.5" />
              <div>
                <p className="text-xs text-foreground">Retrofit U-Values</p>
                <p className="text-xs font-mono text-muted-foreground">{assumptions.retrofitUValues}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataQualityPanel;
