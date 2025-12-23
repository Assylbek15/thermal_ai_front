import FeatureSection from './FeatureSection';

const ProductFeatures = () => {
  return (
    <>
      {/* Design Section */}
      <FeatureSection
        id="features"
        subtitle="Sleek Design"
        title="Beautiful & Durable"
        description="Our solar panels are designed to be both beautiful and efficient. The sleek all-black design integrates seamlessly with your roof, while the tempered glass surface and metal frame are built to withstand any weather condition."
        imageUrl="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=2072&auto=format&fit=crop"
        stats={[
          { value: '25', label: 'Year Warranty' },
          { value: '400W', label: 'Per Panel' },
        ]}
      />

      {/* Powerwall Section */}
      <FeatureSection
        id="powerwall"
        subtitle="Energy Storage"
        title="Powerwall Integration"
        description="Combine solar panels with Powerwall to store energy generated during the day and use it anytime—at night or during an outage. Powerwall gives you the ability to go off-grid and power your home 24/7."
        imageUrl="https://images.unsplash.com/photo-1558449028-b53a39d100fc?q=80&w=2074&auto=format&fit=crop"
        imagePosition="left"
        stats={[
          { value: '24/7', label: 'Backup Power' },
          { value: '13.5', label: 'kWh Capacity' },
        ]}
      />

      {/* Durability Section */}
      <section
        id="durability"
        className="min-h-screen flex items-center bg-card py-20"
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">
              Built to Last
            </p>
            <h2 className="text-4xl md:text-5xl font-medium text-foreground mb-6">
              Industry-Leading Durability
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Engineered with tempered glass, our panels are built to handle
              extreme weather—from 1-inch hail at 50 mph to high winds and heavy snow.
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: '25-Year Warranty',
                description:
                  'Our comprehensive warranty covers both product performance and power output for 25 years.',
                icon: (
                  <svg className="w-12 h-12 text-primary mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
              },
              {
                title: 'Hail Tested',
                description:
                  'Tempered glass surface withstands impacts from 1-inch hail traveling at 50 mph.',
                icon: (
                  <svg className="w-12 h-12 text-primary mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                ),
              },
              {
                title: 'High Efficiency',
                description:
                  'Industry-leading efficiency means more energy from less roof space.',
                icon: (
                  <svg className="w-12 h-12 text-primary mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-secondary/50 p-8 rounded-sm text-center hover:bg-secondary transition-colors"
              >
                <div className="flex justify-center">{feature.icon}</div>
                <h3 className="text-xl font-medium text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* App Monitoring Section */}
      <FeatureSection
        id="app"
        subtitle="Tesla App"
        title="Monitor Your Energy"
        description="The Tesla app lets you monitor your energy production in real time. Track how much energy your panels produce, how much your home uses, and how much you're exporting back to the grid—all from your phone."
        imageUrl="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop"
        stats={[
          { value: '24/7', label: 'Monitoring' },
          { value: 'Real', label: 'Time Data' },
        ]}
      />
    </>
  );
};

export default ProductFeatures;
