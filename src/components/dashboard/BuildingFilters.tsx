import { useState } from 'react';
import { Filter, X } from 'lucide-react';

interface BuildingFiltersProps {
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  retrofitReadiness: string[];
  epcRating: string[];
  co2Intensity: string[];
  buildingType: string[];
  riskIndex: string[];
}

const BuildingFilters = ({ onFilterChange }: BuildingFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    retrofitReadiness: [],
    epcRating: [],
    co2Intensity: [],
    buildingType: [],
    riskIndex: [],
  });

  const filterOptions = {
    retrofitReadiness: ['Ready', 'Moderate', 'Complex'],
    epcRating: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
    co2Intensity: ['Low (<20)', 'Medium (20-40)', 'High (>40)'],
    buildingType: ['Residential', 'School', 'Hospital', 'Commercial', 'Industrial'],
    riskIndex: ['Low Risk', 'Medium Risk', 'High Risk'],
  };

  const toggleFilter = (category: keyof FilterState, value: string) => {
    const newFilters = {
      ...filters,
      [category]: filters[category].includes(value)
        ? filters[category].filter((v) => v !== value)
        : [...filters[category], value],
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const emptyFilters: FilterState = {
      retrofitReadiness: [],
      epcRating: [],
      co2Intensity: [],
      buildingType: [],
      riskIndex: [],
    };
    setFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };

  const activeFilterCount = Object.values(filters).flat().length;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-2 border transition-colors text-xs font-mono tracking-wider ${
          activeFilterCount > 0
            ? 'border-primary text-primary'
            : 'border-foreground/20 text-muted-foreground hover:border-foreground/40'
        }`}
      >
        <Filter className="w-3 h-3" />
        FILTERS
        {activeFilterCount > 0 && (
          <span className="px-1.5 py-0.5 bg-primary text-primary-foreground text-[10px]">
            {activeFilterCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-background border border-foreground/20 z-50 shadow-xl">
          <div className="p-3 border-b border-foreground/10 flex items-center justify-between">
            <span className="text-xs font-mono text-muted-foreground tracking-wider">FILTER BUILDINGS</span>
            {activeFilterCount > 0 && (
              <button
                onClick={clearFilters}
                className="text-xs font-mono text-analytics-pink hover:underline"
              >
                Clear all
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto divide-y divide-foreground/5">
            {Object.entries(filterOptions).map(([category, options]) => (
              <div key={category} className="p-3">
                <p className="text-[10px] font-mono text-muted-foreground tracking-wider mb-2">
                  {category.replace(/([A-Z])/g, ' $1').trim().toUpperCase()}
                </p>
                <div className="flex flex-wrap gap-1">
                  {options.map((option) => (
                    <button
                      key={option}
                      onClick={() => toggleFilter(category as keyof FilterState, option)}
                      className={`px-2 py-1 text-[10px] font-mono border transition-all ${
                        filters[category as keyof FilterState].includes(option)
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-foreground/10 text-muted-foreground hover:border-foreground/30'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 border-t border-foreground/10">
            <button
              onClick={() => setIsOpen(false)}
              className="w-full py-2 bg-primary text-primary-foreground text-xs font-mono tracking-wider"
            >
              APPLY FILTERS
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuildingFilters;
