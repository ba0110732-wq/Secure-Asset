import { useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Activity, Zap, Shield, Globe2, BookOpen, Users } from 'lucide-react';
import { Link } from 'wouter';

function MediAIHero() {
  const { isRtl } = useLanguage();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -100]);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-gradient-to-b from-card via-background to-background z-0" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center text-center mt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-6 inline-block">
            Case Study
          </span>
          <h1 className="text-6xl md:text-8xl font-display font-bold mb-6 tracking-tight text-foreground">
            Medi<span className="text-gradient">AI</span>
          </h1>
          <p className="text-xl md:text-3xl text-muted-foreground max-w-3xl text-balance mb-8 font-medium">
            {isRtl 
              ? 'منصة صحية متكاملة بـ 6 لغات مدعومة بالذكاء الاصطناعي.'
              : 'A 6-language, AI-powered health intelligence platform.'}
          </p>
        </motion.div>

        <motion.div 
          style={{ y }}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-5xl mt-12 relative"
        >
          <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 via-transparent to-secondary/20 rounded-[2.5rem] blur-xl opacity-50" />
          <div className="glass-panel p-2 rounded-[2rem] border border-border/50 shadow-2xl relative">
            <img 
              src="/images/mediai-dashboard.png" 
              alt="MediAI Dashboard" 
              className="w-full rounded-3xl border border-border/50"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const { isRtl } = useLanguage();
  const languages = ['English', 'Arabic', 'French', 'Spanish', 'Chinese', 'Hindi'];
  
  const features = [
    { icon: <Activity />, en: 'Symptom Checker', ar: 'فحص الأعراض' },
    { icon: <Shield />, en: 'Drug Interactions', ar: 'تفاعلات الأدوية' },
    { icon: <Zap />, en: 'AI Consultations', ar: 'استشارات ذكية' },
    { icon: <Activity />, en: 'Vital Signs Tracking', ar: 'تتبع العلامات الحيوية' },
    { icon: <BookOpen />, en: 'Daily Health Blog', ar: 'مدونة صحية يومية' },
    { icon: <Users />, en: 'Community Q&A', ar: 'أسئلة المجتمع' },
    { icon: <Zap />, en: 'Installable PWA', ar: 'تطبيق ويب تقدمي' },
    { icon: <Globe2 />, en: 'Multilingual SEO', ar: 'سيو متعدد اللغات' },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-20">
          <h2 className="text-3xl font-display font-bold text-center mb-10 text-foreground">
            {isRtl ? 'لغات مدعومة بالكامل' : 'Fully Supported Languages'}
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {languages.map(lang => (
              <span key={lang} className="px-6 py-3 rounded-full border border-border bg-card text-foreground font-medium shadow-sm hover:border-primary/50 transition-colors">
                {lang}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel p-6 rounded-2xl border border-border/50 flex flex-col items-center text-center gap-4 hover:bg-card/50 transition-colors"
            >
              <div className="text-primary bg-primary/10 p-4 rounded-full">
                {feat.icon}
              </div>
              <h3 className="font-semibold text-lg text-foreground">
                {isRtl ? feat.ar : feat.en}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MockupsSection() {
  const { isRtl } = useLanguage();
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <section className="py-32 bg-card relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-24 text-foreground">
          {isRtl ? 'نظرة عن قرب' : 'A Closer Look'}
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <motion.div style={{ y: y1 }} className="relative z-10">
            <img src="/images/mediai-symptom.png" alt="Symptom Checker" className="w-full rounded-3xl shadow-2xl border border-border/50" />
          </motion.div>
          <motion.div style={{ y: y2 }} className="relative z-20 mt-12 lg:mt-0">
            <img src="/images/tech-mobile.png" alt="Mobile App" className="w-full rounded-3xl shadow-2xl border border-border/50" />
          </motion.div>
          <motion.div style={{ y: y1 }} className="relative z-10">
            <img src="/images/mediai-multilingual.png" alt="Multilingual Support" className="w-full rounded-3xl shadow-2xl border border-border/50" />
          </motion.div>
          <motion.div style={{ y: y2 }} className="relative z-20 mt-12 lg:mt-0 glass-panel p-12 rounded-3xl flex items-center justify-center border border-border/50">
             <div className="text-center">
               <h3 className="text-3xl font-display font-bold mb-4 text-foreground">
                 {isRtl ? 'تصميم سلس' : 'Seamless Design'}
               </h3>
               <p className="text-muted-foreground text-lg">
                 {isRtl 
                   ? 'تم تصميم كل شاشة بعناية لتقديم تجربة مستخدم مريحة وبديهية عبر جميع اللغات.' 
                   : 'Every screen was meticulously crafted to provide an intuitive and comforting user experience across all languages.'}
               </p>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TechStackSection() {
  const { isRtl } = useLanguage();
  const stack = ['React', 'Vite', 'TypeScript', 'Tailwind', 'Express', 'PostgreSQL', 'Drizzle', 'OpenAI', 'PWA'];

  return (
    <section className="py-24 bg-background border-t border-border/50">
      <div className="container mx-auto px-6 md:px-12 text-center">
        <h2 className="text-3xl font-display font-bold mb-10 text-foreground">
          {isRtl ? 'التقنيات المستخدمة' : 'Technology Stack'}
        </h2>
        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {stack.map((tech, i) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="px-6 py-3 rounded-full border border-primary/20 bg-primary/5 text-primary font-medium tracking-wide"
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function MediAI() {
  const { isRtl, t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <MediAIHero />
        <FeaturesSection />
        <MockupsSection />
        <TechStackSection />
        
        <section className="py-32 text-center bg-card">
          <div className="container mx-auto px-6">
            <Link href="/">
              <Button size="lg" className="rounded-full px-12 h-16 text-lg group shadow-xl">
                {isRtl ? (
                  <>
                    <ChevronRight className="mr-0 ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    العودة للمحفظة
                  </>
                ) : (
                  <>
                    <ChevronLeft className="ml-0 mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
                    Back to Portfolio
                  </>
                )}
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
