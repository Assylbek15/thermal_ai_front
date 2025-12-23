import { ChevronDown, Upload, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const scrollToAnalyzer = (mode: 'upload' | 'dashboard') => {
    const element = document.getElementById('analyzer');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.dispatchEvent(new CustomEvent('setAnalyzerMode', { detail: mode }));
    }
  };

  return (
    <section
      id="hero"
      className="section-tesla bg-background"
    >
      {/* Video Background */}
      <motion.div 
        className="absolute inset-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover scale-105"
        >
          <source src="/videos/thermal-hero.mp4" type="video/mp4" />
        </video>
      </motion.div>
      
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/50" />
      
      {/* Thermal glow overlay */}
      <div className="absolute inset-0 thermal-glow-overlay opacity-50" />
      
      {/* Gradient Overlay for text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.h1 
          className="text-5xl md:text-7xl font-medium text-white mb-4 drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Thermal Imaging
        </motion.h1>
        <motion.p 
          className="text-lg md:text-xl text-white/95 mb-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Uncover the Unseen with Advanced Building Analysis
        </motion.p>
        <motion.p 
          className="text-sm md:text-base text-white/85 mb-8 drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Pinpoint heat loss, thermal anomalies, and moisture intrusion
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.button
            onClick={() => scrollToAnalyzer('upload')}
            className="btn-tesla-primary min-w-[220px] flex items-center justify-center gap-3"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Upload className="w-5 h-5" />
            Upload Image
          </motion.button>
          <motion.button
            onClick={() => scrollToAnalyzer('dashboard')}
            className="btn-tesla-secondary min-w-[220px] flex items-center justify-center gap-3"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Building2 className="w-5 h-5" />
            City Dashboard
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ 
          opacity: { delay: 1.2, duration: 0.5 },
          y: { delay: 1.2, duration: 2, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <a href="#features" className="text-white/60 hover:text-white transition-colors">
          <ChevronDown className="w-8 h-8" />
        </a>
      </motion.div>
    </section>
  );
};

export default HeroSection;