import { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';

const navItems = [
  { label: 'Thermal Imaging', href: '#hero' },
  { label: 'Features', href: '#features' },
  { label: 'Analysis', href: '#analyzer' },
  { label: 'Dashboard', href: '#dashboard' },
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
            <a href="#" className="flex items-center gap-1">
              <span className="text-xl font-bold text-foreground">CECECO</span>
              <span className="text-xl font-bold text-muted-foreground mx-1">×</span>
              <span className="text-xl font-bold text-primary">Thermal AI</span>
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
                Book Demo
              </a>
              <a
                href="#"
                className="text-sm font-medium text-foreground/90 hover:text-foreground transition-colors"
              >
                Login
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
              Book Demo
            </a>
            <a
              href="#"
              className="text-lg font-medium text-foreground py-3 border-b border-border"
            >
              Login
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
