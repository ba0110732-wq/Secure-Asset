import { Link } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border pt-16 pb-8 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <Link href="/" className="group flex flex-col items-start gap-1">
              <span className="font-display font-bold text-2xl tracking-tight text-foreground">
                Eng. Abdulrazzaq Al-Najjar
              </span>
              <span className="font-arabic font-bold text-xl text-primary">
                المهندس عبدالرزاق نجيب النجار
              </span>
            </Link>
            <p className="text-muted-foreground max-w-md text-balance leading-relaxed">
              {t('hero.subtitle')} Bringing precision engineering to elegant, human-centered design.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors" data-testid="link-github">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors" data-testid="link-linkedin">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors" data-testid="link-twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="mailto:contact@al-najjar.dev" className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors" data-testid="link-email">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div className="flex flex-col gap-4">
            <h3 className="font-display font-bold text-lg text-foreground">Navigation</h3>
            <ul className="flex flex-col gap-3">
              <li><a href="/#about" className="text-muted-foreground hover:text-primary transition-colors">{t('nav.about')}</a></li>
              <li><a href="/#capabilities" className="text-muted-foreground hover:text-primary transition-colors">{t('nav.capabilities')}</a></li>
              <li><Link href="/medai" className="text-muted-foreground hover:text-primary transition-colors">{t('nav.mediai')}</Link></li>
              <li><a href="/#experience" className="text-muted-foreground hover:text-primary transition-colors">{t('nav.experience')}</a></li>
            </ul>
          </div>
          
          <div className="flex flex-col gap-4">
            <h3 className="font-display font-bold text-lg text-foreground">Contact</h3>
            <ul className="flex flex-col gap-3 text-muted-foreground">
              <li>contact@al-najjar.dev</li>
              <li dir="ltr">+965 XX XXX XXX</li>
              <li>Kuwait City, Kuwait</li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            &copy; {currentYear} Eng. Abdulrazzaq Al-Najjar. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground/60 text-center md:text-right flex flex-col items-center md:items-end">
            <span>{t('footer.credit')}</span>
            <span className="font-arabic mt-1 opacity-70 text-xs">« المهندس عبدالرزاق نجيب النجار »</span>
          </p>
        </div>
      </div>
    </footer>
  );
}