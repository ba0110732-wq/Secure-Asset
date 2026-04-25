import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft, ArrowDown } from 'lucide-react';

export default function HeroSection() {
  const { t, isRtl } = useLanguage();

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-20" id="home">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-background/80 mix-blend-multiply z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background z-10" />
        <img 
          src="/images/hero-bg.png" 
          alt="Abstract Technology Background" 
          className="w-full h-full object-cover object-center opacity-40"
        />
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] opacity-50 mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-secondary/20 rounded-full blur-[128px] opacity-50 mix-blend-screen" />
      </div>

      <div className="container relative z-20 mx-auto px-6 md:px-12">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-6 md:gap-8">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary shadow-sm backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2 mr-2 rtl:ml-2 rtl:mr-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Available for new projects
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col gap-2 md:gap-4"
          >
            <p className="text-xl md:text-2xl font-medium text-muted-foreground uppercase tracking-widest">
              {t('hero.greeting')}
            </p>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-extrabold tracking-tight text-foreground text-balance">
              <span className="text-gradient-gold block mb-2">{t('hero.name')}</span>
              <span className="text-gradient block opacity-90">{t('hero.title')}</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg md:text-2xl text-muted-foreground max-w-3xl text-balance leading-relaxed"
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center gap-4 mt-8"
          >
            <Button 
              size="lg" 
              className="rounded-full px-8 h-14 text-lg shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all group min-w-[200px]"
              onClick={() => {
                document.getElementById('mediai')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {t('hero.cta.primary')}
              {isRtl ? (
                <ChevronLeft className="ml-0 mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
              ) : (
                <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              )}
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="rounded-full px-8 h-14 text-lg border-border/50 bg-background/50 backdrop-blur-sm hover:bg-background/80 transition-all min-w-[200px]"
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {t('hero.cta.secondary')}
            </Button>
          </motion.div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-muted-foreground animate-bounce"
      >
        <span className="text-xs uppercase tracking-widest font-medium">Scroll</span>
        <ArrowDown className="w-4 h-4" />
      </motion.div>
    </section>
  );
}