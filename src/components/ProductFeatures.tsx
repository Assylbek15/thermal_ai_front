import FeatureSection from './FeatureSection';
import { Thermometer, Zap, Droplets, Wind, Shield, Eye } from 'lucide-react';

const ProductFeatures = () => {
  return (
    <>
      {/* Heat Loss Detection Section */}
      <FeatureSection
        id="features"
        subtitle="Heat Loss Detection"
        title="Pinpoint Heat Loss"
        description="Precisely map heat loss across the building envelope to fix insulation gaps and thermal bridging. Our AI-powered analysis identifies areas where energy is escaping, helping you prioritize repairs and reduce heating costs."
        imageUrl="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2070&auto=format&fit=crop"
        stats={[
          { value: '30%', label: 'Energy Savings' },
          { value: '99%', label: 'Accuracy' },
        ]}
      />

      {/* Electrical Fault Detection Section */}
      <FeatureSection
        id="electrical"
        subtitle="Safety First"
        title="Visualize Electrical Faults"
        description="Prevent electrical fires by revealing overheating circuits and faulty connections. Thermal imaging detects dangerous hotspots in electrical systems before they become hazardous, protecting your property and occupants."
        imageUrl="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=2069&auto=format&fit=crop"
        imagePosition="left"
        stats={[
          { value: '24/7', label: 'Monitoring' },
          { value: '100%', label: 'Non-Invasive' },
        ]}
      />

      {/* Capabilities Section */}
      <section
        id="capabilities"
        className="min-h-screen flex items-center bg-card py-20"
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">
              Advanced Capabilities
            </p>
            <h2 className="text-4xl md:text-5xl font-medium text-foreground mb-6">
              Comprehensive Building Analysis
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered thermal imaging platform provides complete visibility into your building's thermal performance, from insulation to HVAC systems.
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Insulation Assessment',
                description:
                  'Validate insulation effectiveness to reveal performance gaps that compromise energy efficiency.',
                icon: <Thermometer className="w-12 h-12 text-primary mb-4" />,
              },
              {
                title: 'Moisture Detection',
                description:
                  'Expose the heat signature of hidden moisture intrusion to prevent costly damage and mold growth.',
                icon: <Droplets className="w-12 h-12 text-primary mb-4" />,
              },
              {
                title: 'HVAC Optimization',
                description:
                  'Diagnose duct leaks and insulation flaws to optimize performance and cut energy waste.',
                icon: <Wind className="w-12 h-12 text-primary mb-4" />,
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

      {/* Dashboard Section */}
      <FeatureSection
        id="dashboard"
        subtitle="Real-Time Insights"
        title="AI-Powered Dashboard"
        description="Monitor building thermal performance in real time. Track energy consumption patterns, identify anomalies, and receive actionable recommendations—all from a single, intuitive dashboard powered by advanced AI analytics."
        imageUrl="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
        stats={[
          { value: 'Real', label: 'Time Analysis' },
          { value: 'AI', label: 'Powered' },
        ]}
      />
    </>
  );
};

export default ProductFeatures;
