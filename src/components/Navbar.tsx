import { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';

const navItems = [
  { label: 'Solar Panels', href: '#hero' },
  { label: 'Solar Roof', href: '#features' },
  { label: 'Powerwall', href: '#powerwall' },
  { label: 'Megapack', href: '#calculator' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-background/95 backdrop-blur-md'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <a href="#" className="flex items-center">
              <svg
                viewBox="0 0 342 35"
                className="h-3 w-auto fill-foreground"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 .1a9.7 9.7 0 007 7h11l.5.1v27.6h6.8V7.3L26 7h11a9.8 9.8 0 007-7H0zm238.6 0h-6.8v34.8H263a9.7 9.7 0 006-6.8h-30.3V0zm-52.3 6.8c3.6-1 6.6-3.8 7.4-6.9l-38.1.1v20.6h31.1v7.2h-24.4a13.6 13.6 0 00-8.7 7h39.9v-21h-31.2v-7h24zm116.2 28h6.7v-14h24.6v14h6.7v-21h-38zM85.3 7h26a9.6 9.6 0 007.1-7H78.3a9.6 9.6 0 007 7zm0 13.8h26a9.6 9.6 0 007.1-7H78.3a9.6 9.6 0 007 7zm0 14.1h26a9.6 9.6 0 007.1-7H78.3a9.6 9.6 0 007 7zM308.5 7h26a9.6 9.6 0 007-7h-40a9.6 9.6 0 007 7z" />
              </svg>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium text-foreground/90 hover:text-foreground transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Right side actions */}
            <div className="hidden lg:flex items-center gap-6">
              <a
                href="#"
                className="text-sm font-medium text-foreground/90 hover:text-foreground transition-colors"
              >
                Shop
              </a>
              <a
                href="#"
                className="text-sm font-medium text-foreground/90 hover:text-foreground transition-colors"
              >
                Account
              </a>
              <button className="text-foreground/90 hover:text-foreground transition-colors">
                <Globe className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-background transition-transform duration-300 lg:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="pt-20 px-6">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-lg font-medium text-foreground py-3 border-b border-border"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#"
              className="text-lg font-medium text-foreground py-3 border-b border-border"
            >
              Shop
            </a>
            <a
              href="#"
              className="text-lg font-medium text-foreground py-3 border-b border-border"
            >
              Account
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
