import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

export default function TimelineSection() {
  const { isRtl } = useLanguage();

  const steps = [
    {
      num: '01',
      titleEn: 'Discover',
      titleAr: 'الاكتشاف',
      descEn: 'Deep dive into requirements, architecture planning, and defining the technology stack.',
      descAr: 'دراسة متعمقة للمتطلبات، تخطيط الهيكلية، وتحديد التقنيات المناسبة.',
    },
    {
      num: '02',
      titleEn: 'Architect',
      titleAr: 'الهندسة والتصميم',
      descEn: 'Designing scalable database schemas, API contracts, and robust system foundations.',
      descAr: 'تصميم مخططات قواعد البيانات، واجهات برمجة التطبيقات، وأسس النظام المتينة.',
    },
    {
      num: '03',
      titleEn: 'Build',
      titleAr: 'البناء والتطوير',
      descEn: 'Iterative development focusing on clean code, testability, and core feature delivery.',
      descAr: 'تطوير متكرر يركز على الكود النظيف، القابلية للاختبار، وتقديم الميزات الأساسية.',
    },
    {
      num: '04',
      titleEn: 'Polish',
      titleAr: 'الصقل والتحسين',
      descEn: 'Refining UI/UX, optimizing performance, and ensuring flawless multilingual support.',
      descAr: 'تحسين واجهات وتجربة المستخدم، تحسين الأداء، وضمان دعم مثالي للغات المتعددة.',
    },
    {
      num: '05',
      titleEn: 'Ship',
      titleAr: 'الإطلاق',
      descEn: 'Deploying to cloud infrastructure, setting up CI/CD, and monitoring production.',
      descAr: 'النشر على البنية التحتية السحابية، إعداد مسارات النشر المستمر، ومراقبة الإنتاج.',
    },
  ];

  return (
    <section className="py-24 md:py-32 relative bg-background" id="experience">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="mb-16 md:mb-24 text-center max-w-3xl mx-auto"
        >
          <span className="text-secondary font-medium tracking-wider uppercase text-sm mb-4 block">
            {isRtl ? 'النهج المتبع' : 'The Process'}
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
            {isRtl ? 'من الفكرة إلى الإطلاق' : 'From Concept to Production'}
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          {/* Vertical Line */}
          <div className="absolute top-0 bottom-0 left-4 md:left-1/2 w-px bg-border md:-translate-x-1/2 z-0" />

          <div className="flex flex-col gap-12 md:gap-24 relative z-10">
            {steps.map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
                className={`flex flex-col md:flex-row gap-8 items-start md:items-center ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className={`md:w-1/2 flex ${i % 2 === 0 ? 'md:justify-start pl-12 md:pl-8' : 'md:justify-end pl-12 md:pr-8'}`}>
                  <div className="glass-panel p-6 md:p-8 rounded-2xl w-full">
                    <span className="text-5xl font-display font-extrabold text-muted-foreground/20 block mb-4">
                      {step.num}
                    </span>
                    <h3 className="text-2xl font-bold text-foreground mb-3">
                      {isRtl ? step.titleAr : step.titleEn}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {isRtl ? step.descAr : step.descEn}
                    </p>
                  </div>
                </div>

                <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-secondary border-4 border-background md:-translate-x-1/2 mt-6 md:mt-0" />
                
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
