interface FeatureSectionProps {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  imageUrl: string;
  imagePosition?: 'left' | 'right';
  stats?: { value: string; label: string }[];
  darkOverlay?: boolean;
}

const FeatureSection = ({
  id,
  title,
  subtitle,
  description,
  imageUrl,
  imagePosition = 'right',
  stats,
  darkOverlay = true,
}: FeatureSectionProps) => {
  return (
    <section
      id={id}
      className="min-h-screen flex items-center relative overflow-hidden bg-background"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${imageUrl}')` }}
      />

      {/* Overlay */}
      {darkOverlay && (
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
      )}

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 w-full py-20">
        <div
          className={`max-w-xl ${
            imagePosition === 'right' ? 'mr-auto' : 'ml-auto text-right'
          }`}
        >
          {subtitle && (
            <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">
              {subtitle}
            </p>
          )}
          <h2 className="text-4xl md:text-5xl font-medium text-foreground mb-6">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            {description}
          </p>

          {/* Stats */}
          {stats && (
            <div
              className={`flex gap-12 ${
                imagePosition === 'right' ? '' : 'justify-end'
              }`}
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-medium text-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
