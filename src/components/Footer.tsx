import { Globe } from 'lucide-react';

const footerLinks = {
  products: [
    'Model S',
    'Model 3',
    'Model X',
    'Model Y',
    'Cybertruck',
    'Solar Panels',
    'Solar Roof',
    'Powerwall',
  ],
  support: [
    'Charging',
    'Energy Support',
    'Vehicle Support',
    'Trade-In',
    'Find Us',
    'Contact Us',
  ],
  company: [
    'About',
    'Careers',
    'Investor Relations',
    'Blog',
    'Press',
  ],
};

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border py-16">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Products */}
          <div>
            <h3 className="text-sm font-medium text-foreground uppercase tracking-wider mb-4">
              Products
            </h3>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
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
              United States
            </button>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy & Legal
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Locations
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              News
            </a>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 Tesla Clone. For demonstration purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
