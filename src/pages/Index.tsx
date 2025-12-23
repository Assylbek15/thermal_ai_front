import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ProductFeatures from '@/components/ProductFeatures';
import SizingCalculator from '@/components/SizingCalculator';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <ProductFeatures />
        <SizingCalculator />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
