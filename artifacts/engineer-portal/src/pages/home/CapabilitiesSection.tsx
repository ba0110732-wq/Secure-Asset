import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Layers, BrainCircuit, Globe, Smartphone, Cloud, Zap } from 'lucide-react';

export default function CapabilitiesSection() {
  const { isRtl } = useLanguage();

  const capabilities = [
    {
      icon: <Layers className="w-8 h-8" />,
      titleEn: 'Full-Stack Engineering',
      titleAr: 'هندسة متكاملة (Full-Stack)',
      descEn: 'Architecting end-to-end solutions with React, Node.js, and modern databases.',
      descAr: 'تصميم حلول متكاملة باستخدام تقنيات حديثة وقواعد بيانات متطورة.',
    },
    {
      icon: <BrainCircuit className="w-8 h-8" />,
      titleEn: 'AI Integration',
      titleAr: 'دمج الذكاء الاصطناعي',
      descEn: 'Embedding intelligent capabilities via OpenAI and specialized LLMs into production apps.',
      descAr: 'تضمين قدرات ذكية عبر نماذج لغوية متقدمة في التطبيقات الإنتاجية.',
    },
    {
      icon: <Globe className="w-8 h-8" />,
      titleEn: 'Multilingual Systems',
      titleAr: 'أنظمة متعددة اللغات',
      descEn: 'Building scalable, fully-localized platforms with robust RTL/LTR support.',
      descAr: 'بناء منصات قابلة للتوسع ومحلية بالكامل مع دعم شامل للاتجاهين.',
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      titleEn: 'Progressive Web Apps',
      titleAr: 'تطبيقات ويب تقدمية',
      descEn: 'Delivering native-like mobile experiences directly through the browser.',
      descAr: 'تقديم تجارب تشبه التطبيقات الأصلية مباشرة عبر المتصفح.',
    },
    {
      icon: <Cloud className="w-8 h-8" />,
      titleEn: 'Cloud Deployment',
      titleAr: 'النشر السحابي',
      descEn: 'Designing scalable infrastructure on AWS, Vercel, and edge networks.',
      descAr: 'تصميم بنية تحتية قابلة للتوسع على السحابة وشبكات الحافة.',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      titleEn: 'Performance & SEO',
      titleAr: 'الأداء وتحسين محركات البحث',
      descEn: 'Optimizing web vitals, bundle sizes, and international SEO rankings.',
      descAr: 'تحسين مؤشرات الأداء وحجم الحزم وتصنيفات البحث الدولية.',
    },
  ];

  return (
    <section className="py-24 md:py-32 relative bg-card" id="capabilities">
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/tech-ai.png" 
          alt="Abstract tech" 
          className="w-full h-full object-cover opacity-5 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background z-10" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="mb-16 text-center max-w-3xl mx-auto"
        >
          <span className="text-primary font-medium tracking-wider uppercase text-sm mb-4 block">
            {isRtl ? 'الخبرات التقنية' : 'Technical Expertise'}
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
            <span className="text-gradient">
              {isRtl ? 'قدرات هندسية متقدمة' : 'Core Capabilities'}
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass-panel p-8 rounded-2xl border border-primary/10 hover:border-primary/30 transition-colors group"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                {cap.icon}
              </div>
              <h3 className="text-xl font-display font-bold text-foreground mb-3">
                {isRtl ? cap.titleAr : cap.titleEn}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {isRtl ? cap.descAr : cap.descEn}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
