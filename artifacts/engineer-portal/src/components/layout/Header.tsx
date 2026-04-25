import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Menu, X, Globe, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t, isRtl } = useLanguage();
  const [location, setLocation] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  const navLinks = [
    { href: '/#about', label: t('nav.about') },
    { href: '/#capabilities', label: t('nav.capabilities') },
    { href: '/#mediai', label: t('nav.mediai') },
    { href: '/#experience', label: t('nav.experience') },
  ];

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    if (href.startsWith('/#')) {
      const id = href.substring(2);
      if (location !== '/') {
        setLocation('/');
        // Need a slight delay for the page to render before scrolling
        setTimeout(() => {
          const el = document.getElementById(id);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      setLocation(href);
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-3 bg-background/80 backdrop-blur-md border-b border-border/50' : 'py-5 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link href="/" className="group flex flex-col items-start gap-0.5 z-50">
          <span className="font-display font-bold text-xl md:text-2xl tracking-tight text-foreground transition-colors group-hover:text-primary">
            Eng. Abdulrazzaq Al-Najjar
          </span>
          <span className="font-arabic font-bold text-sm md:text-base text-muted-foreground transition-colors group-hover:text-primary-foreground">
            المهندس عبدالرزاق نجيب النجار
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleNavClick(link.href)}
                  className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors cursor-pointer"
                  data-testid={`nav-link-${link.label}`}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
          
          <div className="flex items-center gap-4 ml-4 pl-4 border-l border-border/50">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleLanguage}
              className="rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
              title={language === 'en' ? 'Switch to Arabic' : 'Switch to English'}
              data-testid="button-toggle-language"
            >
              <Globe className="h-5 w-5" />
            </Button>
            
            <Button 
              onClick={() => handleNavClick('/#contact')}
              className="rounded-full px-6 font-medium shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all group"
              data-testid="button-nav-contact"
            >
              {t('nav.contact')}
              {isRtl ? (
                <ChevronLeft className="ml-0 mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              ) : (
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              )}
            </Button>
          </div>
        </nav>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-2 lg:hidden z-50">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleLanguage}
            className="rounded-full"
            data-testid="button-toggle-language-mobile"
          >
            <Globe className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="rounded-full"
            data-testid="button-toggle-mobile-menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-2xl lg:hidden"
          >
            <div className="container mx-auto px-6 py-8 flex flex-col gap-6">
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className="text-left text-lg font-medium text-foreground hover:text-primary transition-colors py-2 border-b border-border/30"
                  >
                    {link.label}
                  </button>
                ))}
                <button
                  onClick={() => handleNavClick('/#contact')}
                  className="text-left text-lg font-medium text-primary py-2"
                >
                  {t('nav.contact')}
                </button>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}