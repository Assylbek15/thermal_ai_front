import { useState, useRef, useEffect } from 'react';
import { Upload, AlertTriangle, Thermometer, Droplets, Zap, X, Plus, Building2 } from 'lucide-react';
import CityDashboard from './CityDashboard';

interface AnalysisResult {
  id: string;
  type: 'heat_loss' | 'moisture' | 'electrical' | 'insulation';
  severity: 'low' | 'medium' | 'high';
  title: string;
  description: string;
  cost: string;
  savings: string;
  payback: string;
  position: { x: number; y: number };
  uValue?: string;
  kwhPerYear?: string;
}

const mockResults: AnalysisResult[] = [
  {
    id: '1',
    type: 'heat_loss',
    severity: 'high',
    title: 'Install cavity wall insulation',
    description: 'Installing cavity wall insulation keeps your home warmer, cuts heating bills, and boosts energy efficiency.',
    cost: '$5,000',
    savings: '$405',
    payback: '12 years',
    position: { x: 25, y: 40 },
    uValue: '5.8 W/m²K',
  },
  {
    id: '2',
    type: 'insulation',
    severity: 'medium',
    title: 'Roof insulation upgrade',
    description: 'Your roof shows significant heat loss. Adding insulation would reduce energy consumption by up to 25%.',
    cost: '$2,500',
    savings: '$280',
    payback: '9 years',
    position: { x: 50, y: 15 },
    kwhPerYear: '220 kWh/m²/yr',
  },
  {
    id: '3',
    type: 'moisture',
    severity: 'medium',
    title: 'Moisture detected in wall',
    description: 'Thermal signature indicates possible moisture ingress in the eastern wall. Recommend further investigation.',
    cost: '$800',
    savings: '$150',
    payback: '5 years',
    position: { x: 75, y: 45 },
  },
  {
    id: '4',
    type: 'heat_loss',
    severity: 'low',
    title: 'Window seal degradation',
    description: 'Minor heat loss detected around window frames. Resealing would improve energy efficiency.',
    cost: '$300',
    savings: '$60',
    payback: '5 years',
    position: { x: 60, y: 55 },
  },
  {
    id: '5',
    type: 'electrical',
    severity: 'low',
    title: 'Normal thermal reading',
    description: 'Electrical systems showing normal operating temperatures. No immediate action required.',
    cost: '$0',
    savings: '$0',
    payback: 'N/A',
    position: { x: 85, y: 70 },
  },
];

type AnalysisMode = 'selection' | 'upload' | 'city-dashboard';

const ThermalAnalyzer = () => {
  const [mode, setMode] = useState<AnalysisMode>('selection');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedResult, setSelectedResult] = useState<AnalysisResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Listen for mode changes from hero section
  useEffect(() => {
    const handleModeChange = (event: CustomEvent<'upload' | 'dashboard'>) => {
      if (event.detail === 'upload') {
        setMode('upload');
      } else if (event.detail === 'dashboard') {
        setMode('city-dashboard');
      }
    };

    window.addEventListener('setAnalyzerMode', handleModeChange as EventListener);
    return () => {
      window.removeEventListener('setAnalyzerMode', handleModeChange as EventListener);
    };
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        setShowResults(false);
        setSelectedResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    // Simulate analysis time
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 2500);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-destructive text-destructive-foreground';
      case 'medium':
        return 'bg-yellow-500 text-black';
      case 'low':
        return 'bg-green-500 text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'heat_loss':
        return <Thermometer className="w-4 h-4" />;
      case 'moisture':
        return <Droplets className="w-4 h-4" />;
      case 'electrical':
        return <Zap className="w-4 h-4" />;
      default:
        return <AlertTriangle className="w-4 h-4" />;
    }
  };

  // Handle City Dashboard mode
  if (mode === 'city-dashboard') {
    return <CityDashboard onBack={() => setMode('selection')} />;
  }

  // Mode selection screen
  if (mode === 'selection') {
    return (
      <section id="analyzer" className="min-h-screen flex items-center bg-background py-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">
              Building Analysis Tool
            </p>
            <h2 className="text-4xl md:text-5xl font-medium text-foreground mb-6">
              Analyze Your Building
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose how you'd like to analyze thermal data - upload your own image or access the city-wide dashboard.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Upload Image Option */}
            <button
              onClick={() => setMode('upload')}
              className="group bg-card hover:bg-secondary/80 rounded-sm p-12 text-center transition-all duration-300 border border-border hover:border-primary"
            >
              <div className="p-6 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors mx-auto w-fit mb-6">
                <Upload className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-medium text-foreground mb-3">Upload Image</h3>
              <p className="text-muted-foreground">
                Upload a thermal image of your building to receive an instant AI-powered analysis of heat loss and insulation gaps.
              </p>
            </button>

            {/* City Dashboard Option */}
            <button
              onClick={() => setMode('city-dashboard')}
              className="group bg-card hover:bg-secondary/80 rounded-sm p-12 text-center transition-all duration-300 border border-border hover:border-primary"
            >
              <div className="p-6 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors mx-auto w-fit mb-6">
                <Building2 className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-medium text-foreground mb-3">City Dashboard</h3>
              <p className="text-muted-foreground">
                Government access portal to view thermal analysis data for buildings across multiple cities.
              </p>
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="analyzer" className="min-h-screen flex items-center bg-background py-20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full">
        <div className="text-center mb-12">
          <button
            onClick={() => {
              setMode('selection');
              setUploadedImage(null);
              setShowResults(false);
              setSelectedResult(null);
            }}
            className="text-sm text-muted-foreground hover:text-foreground mb-4 inline-flex items-center gap-2"
          >
            ← Back to options
          </button>
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">
            Building Analysis Tool
          </p>
          <h2 className="text-4xl md:text-5xl font-medium text-foreground mb-6">
            Upload Thermal Image
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload a thermal image of your building to receive an instant AI-powered analysis of heat loss, insulation gaps, and potential issues.
          </p>
        </div>

        {/* Upload Area */}
        {!uploadedImage && (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="max-w-2xl mx-auto border-2 border-dashed border-border rounded-sm p-12 text-center cursor-pointer hover:border-primary transition-colors"
          >
            <Upload className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
            <p className="text-lg text-foreground mb-2">
              Drop your thermal image here
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              or click to browse files
            </p>
            <button className="btn-tesla-primary">
              Select Image
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        )}

        {/* Analysis View */}
        {uploadedImage && (
          <div className="animate-fade-in">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Image with markers */}
              <div className="lg:col-span-2 relative">
                <div className="relative rounded-sm overflow-hidden bg-secondary">
                  {/* Thermal overlay effect */}
                  <div className="relative">
                    <img
                      src={uploadedImage}
                      alt="Thermal analysis"
                      className={`w-full h-auto ${showResults ? 'hue-rotate-180 saturate-150' : ''}`}
                      style={showResults ? { filter: 'hue-rotate(270deg) saturate(1.5)' } : {}}
                    />
                    
                    {/* Analysis markers */}
                    {showResults && mockResults.map((result) => (
                      <button
                        key={result.id}
                        onClick={() => setSelectedResult(selectedResult?.id === result.id ? null : result)}
                        className={`absolute w-8 h-8 rounded-full flex items-center justify-center transition-all transform hover:scale-110 ${
                          selectedResult?.id === result.id
                            ? 'ring-4 ring-foreground scale-110'
                            : ''
                        } ${getSeverityColor(result.severity)}`}
                        style={{
                          left: `${result.position.x}%`,
                          top: `${result.position.y}%`,
                          transform: 'translate(-50%, -50%)',
                        }}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    ))}

                    {/* Selected result tooltip on image */}
                    {showResults && selectedResult && (
                      <div
                        className="absolute bg-background/95 backdrop-blur-sm rounded-sm p-2 shadow-lg text-sm max-w-[150px]"
                        style={{
                          left: `${Math.min(selectedResult.position.x + 5, 70)}%`,
                          top: `${selectedResult.position.y}%`,
                        }}
                      >
                        {selectedResult.uValue && (
                          <p className="font-medium">U-value: {selectedResult.uValue}</p>
                        )}
                        {selectedResult.kwhPerYear && (
                          <p className="font-medium">{selectedResult.kwhPerYear}</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-4 mt-6">
                  <button
                    onClick={() => {
                      setUploadedImage(null);
                      setShowResults(false);
                      setSelectedResult(null);
                    }}
                    className="btn-tesla-secondary flex-1"
                  >
                    Upload New Image
                  </button>
                  {!showResults && (
                    <button
                      onClick={handleAnalyze}
                      disabled={isAnalyzing}
                      className="btn-tesla-primary flex-1"
                    >
                      {isAnalyzing ? (
                        <span className="flex items-center justify-center gap-2">
                          <span className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                          Analyzing...
                        </span>
                      ) : (
                        'Analyze Image'
                      )}
                    </button>
                  )}
                </div>
              </div>

              {/* Results Panel */}
              <div className="lg:col-span-1">
                {showResults ? (
                  <div className="bg-card rounded-sm p-6">
                    <h3 className="text-xl font-medium text-foreground mb-6">
                      Analysis Results
                    </h3>

                    {/* Selected result details */}
                    {selectedResult ? (
                      <div className="animate-fade-in">
                        <div className="flex items-center justify-between mb-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getSeverityColor(selectedResult.severity)}`}>
                            Priority: {selectedResult.severity.charAt(0).toUpperCase() + selectedResult.severity.slice(1)} →
                          </span>
                          <button
                            onClick={() => setSelectedResult(null)}
                            className="text-muted-foreground hover:text-foreground"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        <h4 className="text-lg font-medium text-foreground mb-2">
                          {selectedResult.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mb-6">
                          {selectedResult.description}
                        </p>

                        <p className="text-sm text-primary font-medium mb-4">
                          Reduce Bills
                        </p>

                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Cost</span>
                            <span className="font-medium text-foreground">{selectedResult.cost}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Annual savings</span>
                            <span className="font-medium text-foreground">{selectedResult.savings}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Payback period</span>
                            <span className="font-medium text-foreground">{selectedResult.payback}</span>
                          </div>
                        </div>

                        <button className="text-sm text-primary mt-4 hover:underline">
                          Collapse
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <p className="text-sm text-muted-foreground mb-4">
                          Click on a marker to see details
                        </p>
                        {mockResults.map((result) => (
                          <button
                            key={result.id}
                            onClick={() => setSelectedResult(result)}
                            className="w-full flex items-center gap-3 p-3 bg-secondary/50 rounded-sm hover:bg-secondary transition-colors text-left"
                          >
                            <span className={`p-2 rounded-full ${getSeverityColor(result.severity)}`}>
                              {getTypeIcon(result.type)}
                            </span>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-foreground truncate">
                                {result.title}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {result.severity.charAt(0).toUpperCase() + result.severity.slice(1)} priority
                              </p>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Summary stats */}
                    <div className="mt-8 pt-6 border-t border-border">
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <p className="text-2xl font-medium text-foreground">5</p>
                          <p className="text-xs text-muted-foreground">Issues Found</p>
                        </div>
                        <div>
                          <p className="text-2xl font-medium text-primary">$895</p>
                          <p className="text-xs text-muted-foreground">Potential Savings/yr</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-card rounded-sm p-6 text-center">
                    <AlertTriangle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">
                      Ready for Analysis
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Click "Analyze Image" to detect thermal anomalies, heat loss zones, and insulation issues in your building.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ThermalAnalyzer;
