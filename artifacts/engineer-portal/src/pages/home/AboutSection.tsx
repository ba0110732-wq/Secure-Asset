import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Code2, Database, Globe, BrainCircuit } from 'lucide-react';

export default function AboutSection() {
  const { t, isRtl } = useLanguage();

  const stats = [
    { value: '10+', label: isRtl ? 'سنوات خبرة' : 'Years Experience' },
    { value: '50+', label: isRtl ? 'مشروع منجز' : 'Projects Delivered' },
    { value: '6', label: isRtl ? 'لغات مدعومة في MediAI' : 'Languages in MediAI' },
  ];

  const features = [
    {
      icon: <BrainCircuit className="w-6 h-6 text-primary" />,
      title: isRtl ? 'هندسة الذكاء الاصطناعي' : 'AI Engineering',
      description: isRtl ? 'دمج نماذج لغوية متقدمة وأنظمة خبيرة.' : 'Integrating advanced LLMs and expert systems.'
    },
    {
      icon: <Globe className="w-6 h-6 text-primary" />,
      title: isRtl ? 'أنظمة متعددة اللغات' : 'Multilingual Systems',
      description: isRtl ? 'بناء منصات تدعم لغات متعددة بسلاسة.' : 'Building scalable platforms for global audiences.'
    },
    {
      icon: <Code2 className="w-6 h-6 text-primary" />,
      title: isRtl ? 'تطوير شامل' : 'Full-Stack Development',
      description: isRtl ? 'من واجهات المستخدم المعقدة إلى قواعد البيانات القوية.' : 'From complex UIs to robust backend architectures.'
    },
  ];

  return (
    <section className="py-24 md:py-32 relative bg-background" id="about">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: isRtl ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-8"
          >
            <div>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-6 text-balance">
                <span className="text-gradient">Engineering the Future.</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                I am a senior software engineer specializing in building high-performance, multilingual applications with deep AI integrations. My approach combines rigorous software architecture with an eye for elegant, intuitive user experiences.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Whether it's creating a multi-language health platform like MediAI or designing robust enterprise systems, I focus on delivering scalable, maintainable, and visually striking solutions.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-border/50">
              {stats.map((stat, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <span className="text-4xl font-display font-bold text-primary">{stat.value}</span>
                  <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: isRtl ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-3xl blur-3xl opacity-50"></div>
            <div className="glass-panel p-8 md:p-10 rounded-3xl relative z-10 flex flex-col gap-8">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-4 border border-border/50 shadow-2xl relative">
                 <img 
                    src="/images/portrait-abstract.png" 
                    alt="Eng. Abdulrazzaq Abstract Portrait" 
                    className="w-full h-full object-cover object-center"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"></div>
                 <div className="absolute bottom-6 left-6 right-6">
                   <h3 className="text-xl font-display font-bold text-white mb-1">Eng. Abdulrazzaq Al-Najjar</h3>
                   <p className="text-primary font-medium text-sm">Senior Software Engineer</p>
                 </div>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                {features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-background/50 border border-border/50 flex items-center justify-center shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-1">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}