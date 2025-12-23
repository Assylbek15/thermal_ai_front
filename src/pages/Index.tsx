import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ProductFeatures from '@/components/ProductFeatures';
import ThermalAnalyzer from '@/components/ThermalAnalyzer';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <ProductFeatures />
        <ThermalAnalyzer />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
