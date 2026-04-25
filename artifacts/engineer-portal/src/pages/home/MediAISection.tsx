import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { ChevronRight, ExternalLink, Globe2, Activity, MessageSquare, BookOpen } from 'lucide-react';

export default function MediAISection() {
  const { t, isRtl } = useLanguage();

  const features = [
    { icon: <Activity />, title: 'Symptom Checker', desc: 'AI-driven analysis of user symptoms.' },
    { icon: <Globe2 />, title: '6 Languages', desc: 'EN, AR, FR, ES, ZH, HI supported.' },
    { icon: <MessageSquare />, title: 'AI Consultations', desc: 'Virtual health assistant interactions.' },
    { icon: <BookOpen />, title: 'Daily Health Blog', desc: 'AI-generated personalized content.' },
  ];

  return (
    <section className="py-24 md:py-32 relative bg-card/30 border-y border-border/50 overflow-hidden" id="mediai">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-secondary/10 rounded-full blur-[100px] pointer-events-none -translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        <div className="flex flex-col md:flex-row gap-8 items-end justify-between mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <span className="text-primary font-medium tracking-wider uppercase text-sm mb-4 block">Flagship Project</span>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-6">
              MediAI <span className="text-muted-foreground font-light">Platform</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              A comprehensive, 6-language AI health dashboard featuring an intelligent symptom checker, drug interaction monitoring, AI consultations, and vital signs tracking.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link href="/medai">
              <Button size="lg" className="rounded-full shadow-lg shadow-primary/20 group">
                {isRtl ? 'عرض دراسة الحالة كاملة' : 'View Full Case Study'}
                <ExternalLink className={`w-4 h-4 ${isRtl ? 'mr-2' : 'ml-2'} group-hover:scale-110 transition-transform`} />
              </Button>
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Showcase Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-8 rounded-3xl overflow-hidden glass-panel border border-border/50 group relative aspect-[16/10]"
          >
            <img 
              src="/images/mediai-dashboard.png" 
              alt="MediAI Dashboard Interface" 
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent flex items-end p-8">
              <div className="flex gap-3 flex-wrap">
                <span className="px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-medium backdrop-blur-md">React</span>
                <span className="px-3 py-1 rounded-full bg-secondary/20 border border-secondary/30 text-secondary-foreground text-xs font-medium backdrop-blur-md">Node.js</span>
                <span className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-medium backdrop-blur-md">OpenAI API</span>
                <span className="px-3 py-1 rounded-full bg-background/50 border border-border text-foreground text-xs font-medium backdrop-blur-md">PostgreSQL</span>
              </div>
            </div>
          </motion.div>

          {/* Features Grid */}
          <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * idx }}
                className="glass-panel p-6 rounded-2xl hover:bg-card/80 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}