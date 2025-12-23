import { useNavigate } from 'react-router-dom';
import { Building2 } from 'lucide-react';

interface CityDashboardProps {
  onBack: () => void;
}

const CityDashboard = ({ onBack }: CityDashboardProps) => {
  const navigate = useNavigate();

  // Redirect to the dedicated dashboard page
  const handleGoToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <section className="min-h-screen flex items-center bg-background py-20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm mb-6">
          <Building2 className="w-4 h-4" />
          Government Access Portal
        </div>
        <h2 className="text-4xl md:text-5xl font-medium text-foreground mb-6">
          City Dashboard
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Access comprehensive thermal analysis data for buildings across multiple cities.
        </p>
        <button
          onClick={handleGoToDashboard}
          className="btn-tesla-primary inline-flex items-center gap-3"
        >
          <Building2 className="w-5 h-5" />
          Open Dashboard
        </button>
        <button
          onClick={onBack}
          className="block mx-auto mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back to options
        </button>
      </div>
    </section>
  );
};

export default CityDashboard;