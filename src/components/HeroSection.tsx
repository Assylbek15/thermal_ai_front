import { ChevronDown, Upload, Building2 } from 'lucide-react';
import thermalHeroBg from '@/assets/thermal-hero-bg.jpg';

const HeroSection = () => {
  const scrollToAnalyzer = (mode: 'upload' | 'dashboard') => {
    const element = document.getElementById('analyzer');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      // Dispatch custom event to set mode
      window.dispatchEvent(new CustomEvent('setAnalyzerMode', { detail: mode }));
    }
  };

  return (
    <section
      id="hero"
      className="section-tesla bg-background"
      style={{
        backgroundImage: `url(${thermalHeroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Enhanced Gradient Overlay for contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-medium text-foreground mb-4 animate-fade-in-up drop-shadow-2xl">
          Thermal Imaging
        </h1>
        <p className="text-lg md:text-xl text-foreground/90 mb-2 animate-fade-in-up delay-100 drop-shadow-lg">
          Uncover the Unseen with Advanced Building Analysis
        </p>
        <p className="text-sm md:text-base text-foreground/80 mb-8 animate-fade-in-up delay-200 drop-shadow-lg">
          Pinpoint heat loss, thermal anomalies, and moisture intrusion
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-300">
          <button
            onClick={() => scrollToAnalyzer('upload')}
            className="btn-tesla-primary min-w-[220px] flex items-center justify-center gap-3"
          >
            <Upload className="w-5 h-5" />
            Upload Image
          </button>
          <button
            onClick={() => scrollToAnalyzer('dashboard')}
            className="btn-tesla-secondary min-w-[220px] flex items-center justify-center gap-3"
          >
            <Building2 className="w-5 h-5" />
            City Dashboard
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-slow">
        <a href="#features" className="text-foreground/60 hover:text-foreground transition-colors">
          <ChevronDown className="w-8 h-8" />
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
