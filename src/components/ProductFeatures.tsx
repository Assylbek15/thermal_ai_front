import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import FeatureSection from './FeatureSection';
import { Thermometer, Droplets, Wind } from 'lucide-react';

const ProductFeatures = () => {
  const capabilitiesRef = useRef(null);
  const isInView = useInView(capabilitiesRef, { once: true, margin: "-100px" });

  const features = [
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
  ];

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
        ref={capabilitiesRef}
        className="min-h-screen flex items-center bg-card py-20"
      >
        <motion.div 
          className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <motion.p 
              className="text-sm uppercase tracking-widest text-muted-foreground mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            >
              Advanced Capabilities
            </motion.p>
            <motion.h2 
              className="text-4xl md:text-5xl font-medium text-foreground mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              Comprehensive Building Analysis
            </motion.h2>
            <motion.p 
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            >
              Our AI-powered thermal imaging platform provides complete visibility into your building's thermal performance, from insulation to HVAC systems.
            </motion.p>
          </div>

          {/* Feature Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-secondary/50 p-8 rounded-sm text-center group cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.15, ease: "easeOut" }}
                whileHover={{ 
                  y: -8, 
                  backgroundColor: "hsl(var(--secondary))",
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
              >
                <motion.div 
                  className="flex justify-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-medium text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
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