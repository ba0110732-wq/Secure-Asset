import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Github, Linkedin, Mail } from 'lucide-react';

export default function ContactSection() {
  const { isRtl } = useLanguage();

  const links = [
    {
      icon: <Mail className="w-6 h-6" />,
      label: 'abdulrazzaq@example.com',
      href: 'mailto:abdulrazzaq@example.com',
      testid: 'contact-email'
    },
    {
      icon: <Github className="w-6 h-6" />,
      label: 'github.com/abdulrazzaq',
      href: 'https://github.com/abdulrazzaq',
      testid: 'contact-github'
    },
    {
      icon: <Linkedin className="w-6 h-6" />,
      label: 'linkedin.com/in/abdulrazzaq',
      href: 'https://linkedin.com/in/abdulrazzaq',
      testid: 'contact-linkedin'
    }
  ];

  return (
    <section className="py-32 relative overflow-hidden bg-card" id="contact">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-background z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[128px] pointer-events-none opacity-50 mix-blend-screen" />

      <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center gap-8"
        >
          <span className="inline-flex items-center rounded-full border border-border bg-background/50 px-6 py-2 text-sm font-medium text-foreground backdrop-blur-sm">
            {isRtl ? 'متاح للفرص الجديدة' : 'Available for opportunities'}
          </span>
          
          <h2 className="text-5xl md:text-7xl lg:text-9xl font-display font-extrabold tracking-tight text-balance text-foreground">
            {isRtl ? (
              <span className="block text-gradient-gold drop-shadow-lg">عبدالرزاق النجار</span>
            ) : (
              <span className="block text-gradient-gold drop-shadow-lg">Abdulrazzaq<br/>Al-Najjar</span>
            )}
          </h2>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl text-balance mt-4">
            {isRtl 
              ? 'دعنا نبني شيئاً استثنائياً معاً.'
              : 'Let\'s build something extraordinary together.'
            }
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 w-full max-w-3xl">
            {links.map((link, i) => (
              <a
                key={i}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                data-testid={link.testid}
                className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-full glass-panel border border-border/50 hover:bg-primary/10 hover:border-primary/50 transition-all text-foreground hover:text-primary group shadow-lg"
              >
                <span className="group-hover:scale-110 transition-transform">
                  {link.icon}
                </span>
                <span className="font-medium tracking-wide">{link.label}</span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
