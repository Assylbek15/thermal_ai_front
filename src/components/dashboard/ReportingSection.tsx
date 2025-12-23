import { FileText, GitCompare, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const ReportingSection = () => {
  const [methodologyOpen, setMethodologyOpen] = useState(false);

  return (
    <div className="border border-foreground/10">
      <div className="p-4 border-b border-foreground/10">
        <h4 className="font-mono text-xs tracking-wider text-muted-foreground">REPORTING & VERIFICATION</h4>
      </div>

      <div className="p-4">
        <div className="flex flex-wrap gap-3 mb-6">
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-xs font-mono tracking-wider hover:bg-primary/90 transition-colors">
            <FileText className="w-4 h-4" />
            DOWNLOAD ENERGY REPORT
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-foreground/20 text-foreground text-xs font-mono tracking-wider hover:border-foreground/40 transition-colors">
            <GitCompare className="w-4 h-4" />
            BEFORE / AFTER COMPARISON
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-foreground/20 text-foreground text-xs font-mono tracking-wider hover:border-foreground/40 transition-colors">
            <CheckCircle className="w-4 h-4" />
            VERIFIED SAVINGS SUMMARY
          </button>
        </div>

        {/* Methodology Section */}
        <div className="border border-foreground/10">
          <button
            onClick={() => setMethodologyOpen(!methodologyOpen)}
            className="w-full flex items-center justify-between p-3 hover:bg-secondary/50 transition-colors"
          >
            <span className="text-xs font-mono text-muted-foreground tracking-wider">METHODOLOGY</span>
            {methodologyOpen ? (
              <ChevronUp className="w-4 h-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            )}
          </button>
          
          {methodologyOpen && (
            <div className="p-4 border-t border-foreground/10 text-xs text-muted-foreground space-y-3">
              <p>
                <span className="text-foreground font-medium">Thermal Analysis:</span> Images captured using FLIR thermal cameras with ±2°C accuracy. Analysis performed using proprietary AI algorithms trained on 50,000+ building thermal scans.
              </p>
              <p>
                <span className="text-foreground font-medium">U-Value Calculation:</span> Effective U-values derived from surface temperature differentials, accounting for ambient conditions, wind speed, and emissivity corrections per ISO 9869-2.
              </p>
              <p>
                <span className="text-foreground font-medium">Energy Modeling:</span> Heat loss projections based on degree-day methodology using local climate data. Retrofit scenarios modeled against building regulations benchmark values.
              </p>
              <p>
                <span className="text-foreground font-medium">Uncertainty:</span> All values presented with P10-P90 confidence intervals. Factors including wind, precipitation, and internal heat sources contribute to stated uncertainty margins.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportingSection;
