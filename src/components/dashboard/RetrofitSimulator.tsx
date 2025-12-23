import { useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';

interface RetrofitOption {
  id: string;
  label: string;
  category: string;
  newUValue: number;
  annualSavings: number;
  co2Reduction: number;
  costSavings: number;
  paybackYears: number;
}

const retrofitOptions: RetrofitOption[] = [
  { id: 'window-seal', label: 'Window Sealing', category: 'Windows', newUValue: 2.4, annualSavings: 850, co2Reduction: 180, costSavings: 120, paybackYears: 2 },
  { id: 'window-replace', label: 'Window Replacement', category: 'Windows', newUValue: 1.2, annualSavings: 2100, co2Reduction: 450, costSavings: 290, paybackYears: 8 },
  { id: 'roof-insulation', label: 'Roof Insulation', category: 'Roof', newUValue: 0.15, annualSavings: 1800, co2Reduction: 380, costSavings: 250, paybackYears: 5 },
  { id: 'wall-insulation', label: 'Wall Insulation', category: 'Walls', newUValue: 0.25, annualSavings: 2400, co2Reduction: 510, costSavings: 340, paybackYears: 7 },
  { id: 'heating-upgrade', label: 'Heating System Upgrade', category: 'Heating', newUValue: 0, annualSavings: 3200, co2Reduction: 720, costSavings: 450, paybackYears: 10 },
];

const RetrofitSimulator = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleOption = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const selectedOptions = retrofitOptions.filter((opt) => selected.includes(opt.id));
  const totalSavings = selectedOptions.reduce((sum, opt) => sum + opt.annualSavings, 0);
  const totalCO2 = selectedOptions.reduce((sum, opt) => sum + opt.co2Reduction, 0);
  const totalCost = selectedOptions.reduce((sum, opt) => sum + opt.costSavings, 0);
  const avgPayback = selectedOptions.length > 0 
    ? Math.round(selectedOptions.reduce((sum, opt) => sum + opt.paybackYears, 0) / selectedOptions.length)
    : 0;

  return (
    <div className="border border-foreground/10">
      <div className="p-4 border-b border-foreground/10">
        <h4 className="font-mono text-xs tracking-wider text-muted-foreground">RETROFIT SIMULATION</h4>
      </div>

      <div className="grid lg:grid-cols-2 divide-x divide-foreground/10">
        {/* Options */}
        <div className="p-4 space-y-2">
          {retrofitOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => toggleOption(opt.id)}
              className={`w-full flex items-center justify-between p-3 border transition-all ${
                selected.includes(opt.id)
                  ? 'border-primary bg-primary/5'
                  : 'border-foreground/10 hover:border-foreground/30'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 border flex items-center justify-center ${
                  selected.includes(opt.id) ? 'border-primary bg-primary' : 'border-foreground/30'
                }`}>
                  {selected.includes(opt.id) && <Check className="w-3 h-3 text-primary-foreground" />}
                </div>
                <div className="text-left">
                  <p className="text-sm text-foreground">{opt.label}</p>
                  <p className="text-[10px] font-mono text-muted-foreground">{opt.category}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-mono text-analytics-green">-{opt.annualSavings} kWh</p>
                <p className="text-[10px] font-mono text-muted-foreground">{opt.paybackYears}yr payback</p>
              </div>
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="p-4">
          <div className="mb-4">
            <p className="text-[10px] font-mono text-muted-foreground tracking-wider mb-2">PROJECTED IMPACT</p>
          </div>
          
          {selected.length === 0 ? (
            <div className="flex items-center justify-center h-40 text-muted-foreground text-sm font-mono">
              Select retrofits to simulate
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 border border-foreground/10">
                  <p className="text-[10px] font-mono text-muted-foreground tracking-wider">ANNUAL SAVINGS</p>
                  <p className="text-2xl font-light font-mono text-analytics-green">{totalSavings.toLocaleString()}</p>
                  <p className="text-[10px] font-mono text-muted-foreground">kWh/year</p>
                </div>
                <div className="p-3 border border-foreground/10">
                  <p className="text-[10px] font-mono text-muted-foreground tracking-wider">CO₂ REDUCTION</p>
                  <p className="text-2xl font-light font-mono text-primary">{totalCO2}</p>
                  <p className="text-[10px] font-mono text-muted-foreground">kgCO₂/year</p>
                </div>
                <div className="p-3 border border-foreground/10">
                  <p className="text-[10px] font-mono text-muted-foreground tracking-wider">COST SAVINGS</p>
                  <p className="text-2xl font-light font-mono text-foreground">£{totalCost}</p>
                  <p className="text-[10px] font-mono text-muted-foreground">/year</p>
                </div>
                <div className="p-3 border border-foreground/10">
                  <p className="text-[10px] font-mono text-muted-foreground tracking-wider">AVG PAYBACK</p>
                  <p className="text-2xl font-light font-mono text-foreground">{avgPayback}</p>
                  <p className="text-[10px] font-mono text-muted-foreground">years</p>
                </div>
              </div>

              {selectedOptions.length > 0 && (
                <div className="border border-foreground/10 p-3">
                  <p className="text-[10px] font-mono text-muted-foreground tracking-wider mb-2">NEW U-VALUES</p>
                  <div className="space-y-1">
                    {selectedOptions.filter(o => o.newUValue > 0).map((opt) => (
                      <div key={opt.id} className="flex items-center justify-between text-xs font-mono">
                        <span className="text-foreground">{opt.label}</span>
                        <span className="text-primary">{opt.newUValue} W/m²K</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RetrofitSimulator;
