import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

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

const easeOut = [0.25, 0.46, 0.45, 0.94] as const;

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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id={id}
      ref={ref}
      className="min-h-screen flex items-center relative overflow-hidden bg-background"
    >
      {/* Background Image with parallax-like effect */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${imageUrl}')` }}
        initial={{ scale: 1.1 }}
        animate={isInView ? { scale: 1 } : { scale: 1.1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />

      {/* Overlay */}
      {darkOverlay && (
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
      )}

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 w-full py-20"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, staggerChildren: 0.15 }}
      >
        <div
          className={`max-w-xl ${
            imagePosition === 'right' ? 'mr-auto' : 'ml-auto text-right'
          }`}
        >
          {subtitle && (
            <motion.p 
              className="text-sm uppercase tracking-widest text-muted-foreground mb-4"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            >
              {subtitle}
            </motion.p>
          )}
          <motion.h2 
            className="text-4xl md:text-5xl font-medium text-foreground mb-6"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            {title}
          </motion.h2>
          <motion.p 
            className="text-lg text-muted-foreground mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            {description}
          </motion.p>

          {/* Stats */}
          {stats && (
            <motion.div
              className={`flex gap-12 ${
                imagePosition === 'right' ? '' : 'justify-end'
              }`}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {stats.map((stat, index) => (
                <motion.div 
                  key={index} 
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1, ease: "easeOut" }}
                >
                  <div className="text-3xl md:text-4xl font-medium text-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wide">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default FeatureSection;