import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRtl: boolean;
}

const translations = {
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.mediai': 'MediAI',
    'nav.capabilities': 'Capabilities',
    'nav.experience': 'Experience',
    'nav.contact': 'Contact',
    'hero.greeting': 'Engineered & Designed by',
    'hero.name': 'Eng. Abdulrazzaq Najib Al-Najjar',
    'hero.title': 'Senior Software Engineer',
    'hero.subtitle': 'Designing and building production-grade, multilingual, AI-powered platforms.',
    'hero.cta.primary': 'Explore My Work',
    'hero.cta.secondary': 'Get in Touch',
    'footer.credit': 'Engineered & Designed by Eng. Abdulrazzaq Najib Al-Najjar',
  },
  ar: {
    'nav.home': 'الرئيسية',
    'nav.about': 'نبذة عني',
    'nav.mediai': 'مشروع MediAI',
    'nav.capabilities': 'القدرات',
    'nav.experience': 'الخبرات',
    'nav.contact': 'اتصل بي',
    'hero.greeting': 'تمت الهندسة والتصميم بواسطة',
    'hero.name': 'المهندس عبدالرزاق نجيب النجار',
    'hero.title': 'مهندس برمجيات أول',
    'hero.subtitle': 'أصمم وأبني منصات إنتاجية متعددة اللغات مدعومة بالذكاء الاصطناعي.',
    'hero.cta.primary': 'استكشف أعمالي',
    'hero.cta.secondary': 'تواصل معي',
    'footer.credit': 'تمت الهندسة والتصميم بواسطة المهندس عبدالرزاق نجيب النجار',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };

  // Ensure DOM is synced on mount
  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    document.documentElement.classList.add('dark'); // Force dark mode
  }, []);

  const t = (key: string): string => {
    // @ts-ignore
    return translations[language][key] || key;
  };

  const isRtl = language === 'ar';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRtl }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}