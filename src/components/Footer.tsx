import { useRef } from 'react';
import { Globe } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

const footerLinks = {
  solutions: [
    'Thermal Imaging',
    'AI Drone Analysis',
    'Building Assessment',
    'Energy Audits',
    'Moisture Detection',
    'HVAC Optimization',
  ],
  support: [
    'Documentation',
    'API Reference',
    'Case Studies',
    'Training',
    'Contact Us',
  ],
  company: [
    'About',
    'Careers',
    'Partners',
    'Blog',
    'Press',
  ],
};

const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <footer ref={ref} className="bg-background border-t border-border py-16">
      <motion.div 
        className="max-w-[1400px] mx-auto px-6 lg:px-12"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, staggerChildren: 0.1 }}
      >
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Solutions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            <h3 className="text-sm font-medium text-foreground uppercase tracking-wider mb-4">
              Solutions
            </h3>
            <ul className="space-y-3">
              {footerLinks.solutions.map((link, i) => (
                <motion.li 
                  key={link}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.05, ease: "easeOut" }}
                >
                  <motion.a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-block"
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    {link}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <h3 className="text-sm font-medium text-foreground uppercase tracking-wider mb-4">
              Support
            </h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link, i) => (
                <motion.li 
                  key={link}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.05, ease: "easeOut" }}
                >
                  <motion.a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-block"
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    {link}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          >
            <h3 className="text-sm font-medium text-foreground uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, i) => (
                <motion.li 
                  key={link}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.05, ease: "easeOut" }}
                >
                  <motion.a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-block"
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    {link}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Regions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            <h3 className="text-sm font-medium text-foreground uppercase tracking-wider mb-4">
              Regions
            </h3>
            <ul className="space-y-2">
              {['Azerbaijan', 'Türkiye', 'Pakistan', 'Kazakhstan', 'Uzbekistan', 'Kyrgyzstan'].map((country, i) => (
                <motion.li 
                  key={country} 
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.05, ease: "easeOut" }}
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Globe className="w-3 h-3" />
                  </motion.div>
                  {country}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom */}
        <motion.div 
          className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
        >
          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link) => (
              <motion.a 
                key={link}
                href="#" 
                className="hover:text-foreground transition-colors"
                whileHover={{ y: -2 }}
              >
                {link}
              </motion.a>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            © 2025 CECECO × Thermal AI. All rights reserved.
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;