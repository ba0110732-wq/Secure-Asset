import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { useI18n, LANGUAGES } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu, X, Globe, ChevronRight, ChevronLeft, Activity, HeartPulse } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t, isRtl } = useI18n();
  const [location, setLocation] = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        setTimeout(() => {
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      setLocation(href);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-background/80 backdrop-blur-md border-b border-border/50'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link href="/" className="group flex items-center gap-3 z-50">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-teal-500/30 group-hover:scale-110 transition-transform">
            <HeartPulse className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col items-start gap-0.5">
            <span className="font-display font-bold text-lg md:text-xl tracking-tight text-foreground transition-colors group-hover:text-primary leading-tight">
              Eng. Abdulrazzaq Al-Najjar
            </span>
            <span className="font-arabic font-bold text-xs md:text-sm text-muted-foreground transition-colors group-hover:text-amber-400 leading-tight">
              المهندس عبدالرزاق نجيب النجار
            </span>
          </div>
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

          <div className="flex items-center gap-3 ml-4 pl-4 border-l border-border/50">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
                  title="Language"
                  data-testid="button-language"
                >
                  <Globe className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {LANGUAGES.map((l) => (
                  <DropdownMenuItem
                    key={l.code}
                    onClick={() => setLanguage(l.code)}
                    className={language === l.code ? 'bg-accent' : ''}
                  >
                    <span className="me-2 inline-block w-8 text-xs uppercase text-muted-foreground">
                      {l.code}
                    </span>
                    {l.native}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/app">
              <Button
                variant="outline"
                className="rounded-full border-teal-500/40 text-teal-300 hover:bg-teal-500/10 hover:text-teal-200 hover:border-teal-400 font-medium gap-2"
              >
                <Activity className="h-4 w-4" />
                {t('nav.launchApp')}
              </Button>
            </Link>

            <Button
              onClick={() => handleNavClick('/#contact')}
              className="rounded-full px-6 font-medium shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all group"
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Globe className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {LANGUAGES.map((l) => (
                <DropdownMenuItem
                  key={l.code}
                  onClick={() => setLanguage(l.code)}
                  className={language === l.code ? 'bg-accent' : ''}
                >
                  <span className="me-2 inline-block w-8 text-xs uppercase text-muted-foreground">
                    {l.code}
                  </span>
                  {l.native}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="rounded-full"
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
                <Link href="/app" onClick={() => setIsMobileMenuOpen(false)}>
                  <button className="w-full text-left text-lg font-medium text-teal-300 py-2 border-b border-border/30 flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    {t('nav.launchApp')}
                  </button>
                </Link>
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
