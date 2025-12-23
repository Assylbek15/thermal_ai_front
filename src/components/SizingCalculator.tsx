import { useState } from 'react';
import { Home, Zap, DollarSign, Sun } from 'lucide-react';

const systemSizes = [
  { name: 'Small', panels: '12 panels', power: '4.8 kW', price: '$9,600', savings: '$50/mo' },
  { name: 'Medium', panels: '20 panels', power: '8.0 kW', price: '$16,000', savings: '$95/mo' },
  { name: 'Large', panels: '28 panels', power: '11.2 kW', price: '$22,400', savings: '$140/mo' },
  { name: 'Extra Large', panels: '36 panels', power: '14.4 kW', price: '$28,800', savings: '$180/mo' },
];

const SizingCalculator = () => {
  const [address, setAddress] = useState('');
  const [monthlyBill, setMonthlyBill] = useState('');
  const [selectedSize, setSelectedSize] = useState(1);
  const [showResults, setShowResults] = useState(false);

  const handleCalculate = () => {
    if (address && monthlyBill) {
      // Simple logic to recommend a size based on bill
      const bill = parseInt(monthlyBill) || 0;
      if (bill < 100) setSelectedSize(0);
      else if (bill < 200) setSelectedSize(1);
      else if (bill < 300) setSelectedSize(2);
      else setSelectedSize(3);
      setShowResults(true);
    }
  };

  return (
    <section id="calculator" className="min-h-screen flex items-center bg-background py-20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">
            Design Your System
          </p>
          <h2 className="text-4xl md:text-5xl font-medium text-foreground mb-6">
            Size Your Solar System
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Enter your address and average electric bill to get a personalized
            recommendation for your home.
          </p>
        </div>

        {/* Calculator Form */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Your Address
              </label>
              <div className="relative">
                <Home className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="123 Main St, City, State"
                  className="w-full pl-12 pr-4 py-4 bg-secondary border border-border rounded-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Average Monthly Electric Bill
              </label>
              <div className="relative">
                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="number"
                  value={monthlyBill}
                  onChange={(e) => setMonthlyBill(e.target.value)}
                  placeholder="150"
                  className="w-full pl-12 pr-4 py-4 bg-secondary border border-border rounded-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>
          <button
            onClick={handleCalculate}
            className="w-full btn-tesla-primary py-4"
          >
            Calculate System Size
          </button>
        </div>

        {/* Results */}
        {showResults && (
          <div className="animate-fade-in">
            <p className="text-center text-lg text-muted-foreground mb-8">
              Based on your inputs, we recommend a{' '}
              <span className="text-foreground font-medium">
                {systemSizes[selectedSize].name}
              </span>{' '}
              system for your home.
            </p>

            {/* System Size Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {systemSizes.map((size, index) => (
                <button
                  key={size.name}
                  onClick={() => setSelectedSize(index)}
                  className={`p-6 rounded-sm text-left transition-all ${
                    selectedSize === index
                      ? 'bg-foreground text-background ring-2 ring-primary'
                      : 'bg-secondary hover:bg-accent'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Sun
                      className={`w-8 h-8 ${
                        selectedSize === index ? 'text-primary' : 'text-primary'
                      }`}
                    />
                    <span className="text-xl font-medium">{size.name}</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className={selectedSize === index ? 'text-background/70' : 'text-muted-foreground'}>
                        Panels
                      </span>
                      <span className="font-medium">{size.panels}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={selectedSize === index ? 'text-background/70' : 'text-muted-foreground'}>
                        System Size
                      </span>
                      <span className="font-medium">{size.power}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={selectedSize === index ? 'text-background/70' : 'text-muted-foreground'}>
                        Est. Price
                      </span>
                      <span className="font-medium">{size.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={selectedSize === index ? 'text-background/70' : 'text-muted-foreground'}>
                        Est. Savings
                      </span>
                      <span className="font-medium text-primary">{size.savings}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Order CTA */}
            <div className="text-center mt-12">
              <a href="#" className="btn-tesla-primary inline-block min-w-[200px]">
                Order {systemSizes[selectedSize].name} System
              </a>
              <p className="text-sm text-muted-foreground mt-4">
                Price before incentives. Federal tax credit and local incentives may reduce your cost by up to 30%.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SizingCalculator;
