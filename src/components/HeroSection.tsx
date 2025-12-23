import { ChevronDown } from 'lucide-react';

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="section-tesla bg-background"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2072&auto=format&fit=crop')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Gradient Overlay */}
      <div className="gradient-overlay" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-medium text-foreground mb-4 animate-fade-in-up text-shadow">
          Solar Panels
        </h1>
        <p className="text-lg md:text-xl text-foreground/90 mb-2 animate-fade-in-up delay-100 text-shadow">
          Lowest Cost Solar Panels in America
        </p>
        <p className="text-sm md:text-base text-foreground/70 mb-8 animate-fade-in-up delay-200 text-shadow">
          Money-back guarantee
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-300">
          <a
            href="#calculator"
            className="btn-tesla-primary min-w-[200px]"
          >
            Order Now
          </a>
          <a
            href="#features"
            className="btn-tesla-secondary min-w-[200px]"
          >
            Learn More
          </a>
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
