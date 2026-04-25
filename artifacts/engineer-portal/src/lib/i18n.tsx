import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Language = "en" | "ar" | "fr" | "es" | "zh" | "hi";

export const LANGUAGES: { code: Language; label: string; native: string; dir: "ltr" | "rtl" }[] = [
  { code: "en", label: "English", native: "English", dir: "ltr" },
  { code: "ar", label: "Arabic", native: "العربية", dir: "rtl" },
  { code: "fr", label: "French", native: "Français", dir: "ltr" },
  { code: "es", label: "Spanish", native: "Español", dir: "ltr" },
  { code: "zh", label: "Chinese", native: "中文", dir: "ltr" },
  { code: "hi", label: "Hindi", native: "हिन्दी", dir: "ltr" },
];

const en = {
  // Portfolio nav
  "nav.home": "Home",
  "nav.about": "About",
  "nav.mediai": "MediAI",
  "nav.capabilities": "Capabilities",
  "nav.experience": "Experience",
  "nav.contact": "Contact",
  "nav.launchApp": "Launch MediAI App",
  "hero.greeting": "Engineered & Designed by",
  "hero.name": "Eng. Abdulrazzaq Najib Al-Najjar",
  "hero.title": "Senior Software Engineer",
  "hero.subtitle":
    "Designing and building production-grade, multilingual, AI-powered medical platforms.",
  "hero.cta.primary": "Explore My Work",
  "hero.cta.secondary": "Get in Touch",
  "hero.cta.tryApp": "Try MediAI Live",
  "footer.credit": "Engineered & Designed by Eng. Abdulrazzaq Najib Al-Najjar",

  // MediAI App
  dashboard: "Dashboard",
  symptomChecker: "Symptom Checker",
  drugInteractions: "Drug Interactions",
  consultations: "AI Consultations",
  vitalSigns: "Vital Signs",
  healthProfile: "Health Profile",
  pricing: "Pricing",
  blog: "Health Blog",
  community: "Community",
  account: "My Account",
  privacy: "Privacy Policy",
  terms: "Terms of Service",
  backToPortfolio: "Back to Portfolio",

  brandTitle: "MediAI",
  brandSubtitle: "Health Intelligence Platform",
  credit: "Engineered by Eng. Abdulrazzaq Al-Najjar",
  disclaimer:
    "MediAI provides health information and AI-powered analysis for educational purposes only. Always consult qualified healthcare professionals for medical decisions.",

  consultationsCount: "Consultations",
  symptomChecksCount: "Symptom Checks",
  drugChecksCount: "Drug Interaction Checks",
  vitalRecordsCount: "Vital Records",
  lastVitalAt: "Last Vitals Recorded",
  never: "Never",
  quickActions: "Quick Actions",
  checkSymptoms: "Check Symptoms",
  checkDrugs: "Check Drug Interactions",
  startConsultation: "Start Consultation",
  recordVitals: "Record Vitals",
  recentActivity: "Recent Activity",
  healthTip: "Health Tip of the Day",

  describeSymptoms: "Describe your symptoms in detail...",
  submitSymptoms: "Analyze Symptoms",
  pastChecks: "Past Symptom Checks",
  severity: "Severity",
  analysis: "Analysis",
  recommendations: "Recommendations",
  noSymptomChecks: "No symptom checks yet.",

  drugName: "Drug Name",
  addDrug: "Add Another Drug",
  checkInteractions: "Check Interactions",
  pastDrugChecks: "Past Drug Checks",
  riskLevel: "Risk Level",
  interactionsLabel: "Interactions",
  noDrugChecks: "No drug interaction checks yet.",

  newConsultation: "New Consultation",
  pastConsultations: "Past Consultations",
  typeMessage: "Type your message...",
  send: "Send",
  noConsultations: "No consultations yet. Start one to get advice.",

  heartRate: "Heart Rate (bpm)",
  bloodPressure: "Blood Pressure (Sys/Dia)",
  temperature: "Temperature (°C)",
  oxygenSaturation: "SpO2 (%)",
  bloodSugar: "Blood Sugar (mg/dL)",
  weight: "Weight (kg)",
  notes: "Notes",
  saveVitals: "Save Vitals",
  pastVitals: "Past Vital Records",
  noVitals: "No vital signs recorded yet.",
  recentHeartRate: "Recent Heart Rate",

  fullName: "Full Name",
  age: "Age",
  gender: "Gender",
  height: "Height (cm)",
  bloodType: "Blood Type",
  allergies: "Allergies",
  chronicConditions: "Chronic Conditions",
  currentMedications: "Current Medications",
  saveProfile: "Save Profile",

  free: "Free",
  pro: "Pro",
  clinic: "Clinic",
  perMonth: "/month",

  loading: "Loading...",
  error: "An error occurred.",
  success: "Success",
  retry: "Retry",
  cancel: "Cancel",
  save: "Save",
  share: "Share this result",

  blogTitle: "Health Articles",
  blogSubtitle: "AI-curated daily insights",
  blogReadMore: "Read more",
  blogNoPosts: "No articles yet. Check back tomorrow.",
  blogPublished: "Published",

  communityTitle: "Community Q&A",
  communitySubtitle: "Ask questions, help others",
  newPost: "New Post",
  postTitle: "Title",
  postBody: "Question or message",
  yourName: "Your name (optional)",
  publish: "Publish",
  replies: "Replies",
  reply: "Reply",
  writeReply: "Write a reply...",
  noPosts: "No discussions yet. Start the first one.",
  back: "Back",

  accountTitle: "My Account",
  currentPlan: "Current Plan",
  usageStats: "Usage Statistics",
  upgrade: "Upgrade Plan",
  totalConsultations: "Total Consultations",
  totalSymptomChecks: "Total Symptom Checks",
  totalDrugChecks: "Total Drug Checks",
  totalVitalRecords: "Total Vital Records",
  memberSince: "Member since",

  cookieMessage:
    "We use cookies to improve your experience and analyze site usage. By continuing, you agree to our cookie policy.",
  accept: "Accept",
  decline: "Decline",

  privacyTitle: "Privacy Policy",
  termsTitle: "Terms of Service",
  lastUpdated: "Last updated",

  offlineMessage: "You are offline. Work will resume when you reconnect.",

  tryAgain: "Try again",
  posted: "Posted",
};

type Dict = typeof en;

const ar: Dict = {
  "nav.home": "الرئيسية",
  "nav.about": "نبذة عني",
  "nav.mediai": "مشروع MediAI",
  "nav.capabilities": "القدرات",
  "nav.experience": "الخبرات",
  "nav.contact": "اتصل بي",
  "nav.launchApp": "افتح تطبيق MediAI",
  "hero.greeting": "تمت الهندسة والتصميم بواسطة",
  "hero.name": "المهندس عبدالرزاق نجيب النجار",
  "hero.title": "مهندس برمجيات أول",
  "hero.subtitle":
    "أصمم وأبني منصات طبية إنتاجية متعددة اللغات مدعومة بالذكاء الاصطناعي.",
  "hero.cta.primary": "استكشف أعمالي",
  "hero.cta.secondary": "تواصل معي",
  "hero.cta.tryApp": "جرّب MediAI مباشرة",
  "footer.credit": "تمت الهندسة والتصميم بواسطة المهندس عبدالرزاق نجيب النجار",

  dashboard: "لوحة القيادة",
  symptomChecker: "فحص الأعراض",
  drugInteractions: "تفاعلات الأدوية",
  consultations: "الاستشارات الذكية",
  vitalSigns: "العلامات الحيوية",
  healthProfile: "الملف الصحي",
  pricing: "الأسعار",
  blog: "المدونة الصحية",
  community: "المجتمع",
  account: "حسابي",
  privacy: "سياسة الخصوصية",
  terms: "شروط الخدمة",
  backToPortfolio: "العودة للبروفايل",

  brandTitle: "MediAI",
  brandSubtitle: "منصة الذكاء الصحي",
  credit: "تطوير المهندس عبدالرزاق النجار",
  disclaimer:
    "تقدم MediAI المعلومات الصحية والتحليلات المدعومة بالذكاء الاصطناعي للأغراض التعليمية فقط. استشر دائمًا أخصائيي الرعاية الصحية المؤهلين لاتخاذ القرارات الطبية.",

  consultationsCount: "الاستشارات",
  symptomChecksCount: "فحوصات الأعراض",
  drugChecksCount: "فحوصات تفاعلات الأدوية",
  vitalRecordsCount: "السجلات الحيوية",
  lastVitalAt: "آخر تسجيل للعلامات الحيوية",
  never: "أبداً",
  quickActions: "إجراءات سريعة",
  checkSymptoms: "فحص الأعراض",
  checkDrugs: "التحقق من تفاعلات الأدوية",
  startConsultation: "بدء استشارة",
  recordVitals: "تسجيل العلامات الحيوية",
  recentActivity: "النشاط الأخير",
  healthTip: "نصيحة صحية لليوم",

  describeSymptoms: "صف أعراضك بالتفصيل...",
  submitSymptoms: "تحليل الأعراض",
  pastChecks: "فحوصات الأعراض السابقة",
  severity: "الخطورة",
  analysis: "التحليل",
  recommendations: "التوصيات",
  noSymptomChecks: "لا توجد فحوصات أعراض بعد.",

  drugName: "اسم الدواء",
  addDrug: "إضافة دواء آخر",
  checkInteractions: "التحقق من التفاعلات",
  pastDrugChecks: "فحوصات الأدوية السابقة",
  riskLevel: "مستوى الخطر",
  interactionsLabel: "التفاعلات",
  noDrugChecks: "لا توجد فحوصات تفاعلات أدوية بعد.",

  newConsultation: "استشارة جديدة",
  pastConsultations: "الاستشارات السابقة",
  typeMessage: "اكتب رسالتك...",
  send: "إرسال",
  noConsultations: "لا توجد استشارات بعد. ابدأ واحدة للحصول على المشورة.",

  heartRate: "معدل ضربات القلب (bpm)",
  bloodPressure: "ضغط الدم (انقباضي/انبساطي)",
  temperature: "درجة الحرارة (°C)",
  oxygenSaturation: "نسبة الأكسجين (%)",
  bloodSugar: "سكر الدم (mg/dL)",
  weight: "الوزن (kg)",
  notes: "ملاحظات",
  saveVitals: "حفظ العلامات الحيوية",
  pastVitals: "السجلات الحيوية السابقة",
  noVitals: "لم يتم تسجيل أي علامات حيوية بعد.",
  recentHeartRate: "معدل ضربات القلب الأخير",

  fullName: "الاسم الكامل",
  age: "العمر",
  gender: "الجنس",
  height: "الطول (cm)",
  bloodType: "فصيلة الدم",
  allergies: "الحساسية",
  chronicConditions: "الأمراض المزمنة",
  currentMedications: "الأدوية الحالية",
  saveProfile: "حفظ الملف",

  free: "مجاني",
  pro: "احترافي",
  clinic: "عيادة",
  perMonth: "/شهر",

  loading: "جاري التحميل...",
  error: "حدث خطأ.",
  success: "تم بنجاح",
  retry: "إعادة المحاولة",
  cancel: "إلغاء",
  save: "حفظ",
  share: "شارك النتيجة",

  blogTitle: "المقالات الصحية",
  blogSubtitle: "رؤى يومية بالذكاء الاصطناعي",
  blogReadMore: "اقرأ المزيد",
  blogNoPosts: "لا توجد مقالات بعد. عد غدًا.",
  blogPublished: "نُشر",

  communityTitle: "أسئلة وأجوبة المجتمع",
  communitySubtitle: "اطرح أسئلتك وساعد الآخرين",
  newPost: "منشور جديد",
  postTitle: "العنوان",
  postBody: "السؤال أو الرسالة",
  yourName: "اسمك (اختياري)",
  publish: "نشر",
  replies: "الردود",
  reply: "رد",
  writeReply: "اكتب ردًا...",
  noPosts: "لا توجد نقاشات بعد. ابدأ أول واحد.",
  back: "رجوع",

  accountTitle: "حسابي",
  currentPlan: "الخطة الحالية",
  usageStats: "إحصائيات الاستخدام",
  upgrade: "ترقية الخطة",
  totalConsultations: "إجمالي الاستشارات",
  totalSymptomChecks: "إجمالي فحوصات الأعراض",
  totalDrugChecks: "إجمالي فحوصات الأدوية",
  totalVitalRecords: "إجمالي السجلات الحيوية",
  memberSince: "عضو منذ",

  cookieMessage:
    "نستخدم ملفات تعريف الارتباط لتحسين تجربتك وتحليل استخدام الموقع. باستمرارك توافق على سياسة الكوكيز.",
  accept: "موافق",
  decline: "رفض",

  privacyTitle: "سياسة الخصوصية",
  termsTitle: "شروط الخدمة",
  lastUpdated: "آخر تحديث",

  offlineMessage: "أنت غير متصل، سيتم استئناف العمل فور عودة الإنترنت.",

  tryAgain: "أعد المحاولة",
  posted: "نُشر",
};

const baseExtras = (overrides: Partial<Dict>): Dict => ({ ...en, ...overrides });

const fr: Dict = baseExtras({
  "nav.home": "Accueil",
  "nav.about": "À propos",
  "nav.mediai": "MediAI",
  "nav.capabilities": "Compétences",
  "nav.experience": "Expérience",
  "nav.contact": "Contact",
  "nav.launchApp": "Lancer MediAI",
  "hero.greeting": "Conçu et développé par",
  "hero.title": "Ingénieur Logiciel Senior",
  "hero.subtitle":
    "Conception et développement de plateformes médicales multilingues alimentées par l'IA.",
  "hero.cta.primary": "Explorer mes travaux",
  "hero.cta.secondary": "Me contacter",
  "hero.cta.tryApp": "Essayer MediAI",
  dashboard: "Tableau de bord",
  symptomChecker: "Analyseur de symptômes",
  drugInteractions: "Interactions médicamenteuses",
  consultations: "Consultations IA",
  vitalSigns: "Signes vitaux",
  healthProfile: "Profil santé",
  pricing: "Tarifs",
  blog: "Blog santé",
  community: "Communauté",
  account: "Mon compte",
  privacy: "Politique de confidentialité",
  terms: "Conditions d'utilisation",
  backToPortfolio: "Retour au portfolio",
  brandSubtitle: "Plateforme d'intelligence santé",
  credit: "Conçu par l'Ing. Abdulrazzaq Al-Najjar",
});

const es: Dict = baseExtras({
  "nav.home": "Inicio",
  "nav.about": "Acerca",
  "nav.capabilities": "Capacidades",
  "nav.experience": "Experiencia",
  "nav.contact": "Contacto",
  "nav.launchApp": "Abrir MediAI",
  "hero.greeting": "Diseñado e implementado por",
  "hero.title": "Ingeniero de Software Sénior",
  "hero.subtitle":
    "Diseño y desarrollo de plataformas médicas multilingües impulsadas por IA.",
  "hero.cta.primary": "Explorar mis trabajos",
  "hero.cta.secondary": "Contáctame",
  "hero.cta.tryApp": "Probar MediAI",
  dashboard: "Panel",
  symptomChecker: "Verificador de síntomas",
  drugInteractions: "Interacciones de medicamentos",
  consultations: "Consultas IA",
  vitalSigns: "Signos vitales",
  healthProfile: "Perfil de salud",
  pricing: "Precios",
  blog: "Blog de salud",
  community: "Comunidad",
  account: "Mi cuenta",
  privacy: "Política de privacidad",
  terms: "Términos del servicio",
  backToPortfolio: "Volver al portafolio",
  brandSubtitle: "Plataforma de inteligencia de salud",
  credit: "Diseñado por el Ing. Abdulrazzaq Al-Najjar",
});

const zh: Dict = baseExtras({
  "nav.home": "首页",
  "nav.about": "关于",
  "nav.capabilities": "能力",
  "nav.experience": "经验",
  "nav.contact": "联系",
  "nav.launchApp": "启动 MediAI",
  "hero.greeting": "由以下设计与开发",
  "hero.title": "高级软件工程师",
  "hero.subtitle": "设计并构建多语言、AI 驱动的医疗平台。",
  "hero.cta.primary": "查看我的作品",
  "hero.cta.secondary": "联系我",
  "hero.cta.tryApp": "立即体验 MediAI",
  dashboard: "仪表板",
  symptomChecker: "症状检查",
  drugInteractions: "药物相互作用",
  consultations: "AI 咨询",
  vitalSigns: "生命体征",
  healthProfile: "健康档案",
  pricing: "定价",
  blog: "健康博客",
  community: "社区",
  account: "我的账户",
  privacy: "隐私政策",
  terms: "服务条款",
  backToPortfolio: "返回作品集",
  brandSubtitle: "健康智能平台",
  credit: "由 Eng. Abdulrazzaq Al-Najjar 工程师设计",
});

const hi: Dict = baseExtras({
  "nav.home": "होम",
  "nav.about": "परिचय",
  "nav.capabilities": "क्षमताएँ",
  "nav.experience": "अनुभव",
  "nav.contact": "संपर्क",
  "nav.launchApp": "MediAI ऐप खोलें",
  "hero.greeting": "द्वारा डिज़ाइन और विकसित",
  "hero.title": "वरिष्ठ सॉफ़्टवेयर इंजीनियर",
  "hero.subtitle":
    "बहुभाषी, एआई-संचालित चिकित्सा प्लेटफ़ॉर्म डिज़ाइन और निर्माण।",
  "hero.cta.primary": "मेरा कार्य देखें",
  "hero.cta.secondary": "संपर्क करें",
  "hero.cta.tryApp": "MediAI आज़माएँ",
  dashboard: "डैशबोर्ड",
  symptomChecker: "लक्षण जाँच",
  drugInteractions: "दवा परस्पर क्रिया",
  consultations: "एआई परामर्श",
  vitalSigns: "महत्वपूर्ण संकेत",
  healthProfile: "स्वास्थ्य प्रोफ़ाइल",
  pricing: "मूल्य निर्धारण",
  blog: "स्वास्थ्य ब्लॉग",
  community: "समुदाय",
  account: "मेरा खाता",
  privacy: "गोपनीयता नीति",
  terms: "सेवा की शर्तें",
  backToPortfolio: "पोर्टफोलियो पर लौटें",
  brandSubtitle: "स्वास्थ्य इंटेलिजेंस प्लेटफ़ॉर्म",
  credit: "इं. अब्दुलरज़्ज़ाक अल-नज्जार द्वारा डिज़ाइन",
});

const translations: Record<Language, Dict> = { en, ar, fr, es, zh, hi };

type I18nContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof Dict | string) => string;
  dir: "ltr" | "rtl";
  isRtl: boolean;
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window === "undefined") return "en";
    const saved = localStorage.getItem("language") as Language;
    return LANGUAGES.find((l) => l.code === saved)?.code ?? "en";
  });

  const dir = LANGUAGES.find((l) => l.code === language)?.dir ?? "ltr";
  const isRtl = dir === "rtl";

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
    document.documentElement.classList.add("dark");
    LANGUAGES.forEach((l) => {
      const id = `hreflang-${l.code}`;
      let link = document.getElementById(id) as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement("link");
        link.id = id;
        link.rel = "alternate";
        document.head.appendChild(link);
      }
      link.hreflang = l.code;
      link.href = `${window.location.origin}${window.location.pathname}?lang=${l.code}`;
    });
  }, [language, dir]);

  const t = (key: keyof Dict | string): string => {
    const dict = translations[language] as Record<string, string>;
    const fallback = translations.en as Record<string, string>;
    return dict[key as string] || fallback[key as string] || (key as string);
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t, dir, isRtl }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}
