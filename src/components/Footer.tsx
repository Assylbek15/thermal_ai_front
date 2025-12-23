import { Globe } from 'lucide-react';

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
  return (
    <footer className="bg-background border-t border-border py-16">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Solutions */}
          <div>
            <h3 className="text-sm font-medium text-foreground uppercase tracking-wider mb-4">
              Solutions
            </h3>
            <ul className="space-y-3">
              {footerLinks.solutions.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-medium text-foreground uppercase tracking-wider mb-4">
              Support
            </h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-medium text-foreground uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Language/Region */}
          <div>
            <h3 className="text-sm font-medium text-foreground uppercase tracking-wider mb-4">
              Region
            </h3>
            <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Globe className="w-4 h-4" />
              United Kingdom
            </button>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Cookie Policy
            </a>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 InspektAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
