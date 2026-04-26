import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  HeartPulse,
  Stethoscope,
  Pill,
  MessageSquare,
  Activity,
  Newspaper,
  Users,
  Shield,
  Sparkles,
  Globe2,
  ArrowRight,
  Brain,
  Lock,
  Zap,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n, LANGUAGES } from "@/lib/i18n";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Landing() {
  const { t, language, setLanguage } = useI18n();

  const features = [
    {
      icon: Stethoscope,
      title: t("feature.symptoms.title"),
      desc: t("feature.symptoms.desc"),
      href: "/symptoms",
      color: "from-teal-500 to-emerald-500",
    },
    {
      icon: Pill,
      title: t("feature.drugs.title"),
      desc: t("feature.drugs.desc"),
      href: "/drugs",
      color: "from-amber-500 to-orange-500",
    },
    {
      icon: MessageSquare,
      title: t("feature.consultations.title"),
      desc: t("feature.consultations.desc"),
      href: "/consultations",
      color: "from-cyan-500 to-blue-500",
    },
    {
      icon: HeartPulse,
      title: t("feature.vitals.title"),
      desc: t("feature.vitals.desc"),
      href: "/vitals",
      color: "from-rose-500 to-pink-500",
    },
    {
      icon: Activity,
      title: t("feature.profile.title"),
      desc: t("feature.profile.desc"),
      href: "/profile",
      color: "from-violet-500 to-purple-500",
    },
    {
      icon: Newspaper,
      title: t("feature.blog.title"),
      desc: t("feature.blog.desc"),
      href: "/blog",
      color: "from-emerald-500 to-teal-500",
    },
  ];

  const trustItems = [
    { icon: Brain, label: t("trust.ai") },
    { icon: Globe2, label: t("trust.languages") },
    { icon: Lock, label: t("trust.privacy") },
    { icon: Zap, label: t("trust.realtime") },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated medical background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-40 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.03]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Top nav */}
      <nav className="relative z-20 border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto max-w-7xl px-4 md:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 via-emerald-500 to-emerald-700 flex items-center justify-center shadow-lg shadow-teal-500/40 ring-1 ring-teal-300/30">
              <HeartPulse className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-lg bg-gradient-to-r from-teal-300 to-emerald-400 bg-clip-text text-transparent">
                MediAI
              </span>
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                {t("brandSubtitle")}
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1.5">
                  <Globe2 className="h-4 w-4" />
                  <span className="hidden sm:inline">
                    {LANGUAGES.find((l) => l.code === language)?.native}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {LANGUAGES.map((l) => (
                  <DropdownMenuItem
                    key={l.code}
                    onClick={() => setLanguage(l.code)}
                    className={language === l.code ? "bg-accent" : ""}
                  >
                    <span className="me-2 inline-block w-8 text-xs uppercase text-muted-foreground">
                      {l.code}
                    </span>
                    {l.native}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/dashboard">
              <Button
                size="sm"
                className="bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white shadow-lg shadow-teal-500/30 gap-1.5"
              >
                {t("cta.launch")}
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative z-10 container mx-auto max-w-7xl px-4 md:px-6 pt-16 md:pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-sm font-medium mb-6">
            <Sparkles className="h-3.5 w-3.5" />
            {t("hero.badge")}
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.05]">
            <span className="bg-gradient-to-r from-teal-300 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              {t("hero.headline1")}
            </span>
            <br />
            <span className="text-foreground">{t("hero.headline2")}</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            {t("hero.subtitle")}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white shadow-xl shadow-teal-500/30 px-8 py-6 text-base gap-2"
              >
                {t("hero.cta.primary")}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/symptoms">
              <Button
                size="lg"
                variant="outline"
                className="border-teal-500/30 hover:bg-teal-500/10 px-8 py-6 text-base gap-2"
              >
                <Stethoscope className="h-4 w-4" />
                {t("hero.cta.secondary")}
              </Button>
            </Link>
          </div>

          {/* Trust strip */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {trustItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card/50 border border-border/40 backdrop-blur-sm"
              >
                <item.icon className="h-5 w-5 text-teal-400" />
                <span className="text-xs text-muted-foreground text-center">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* FEATURES */}
      <section className="relative z-10 container mx-auto max-w-7xl px-4 md:px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              {t("features.title")}
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t("features.subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.href}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <Link href={f.href}>
                <div className="group relative p-6 rounded-2xl bg-card/50 border border-border/40 backdrop-blur-sm hover:border-teal-500/40 hover:bg-card/80 transition-all cursor-pointer h-full overflow-hidden">
                  <div
                    className={`absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-br ${f.color} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity`}
                  />
                  <div
                    className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-4 shadow-lg`}
                  >
                    <f.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{f.desc}</p>
                  <div className="flex items-center gap-1 text-sm font-medium text-teal-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    {t("features.explore")}
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative z-10 container mx-auto max-w-7xl px-4 md:px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-600/20 via-emerald-700/20 to-cyan-700/20 border border-teal-500/30 p-10 md:p-16 text-center"
        >
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-teal-400 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-emerald-400 rounded-full blur-3xl" />
          </div>
          <div className="relative">
            <Shield className="h-12 w-12 mx-auto text-teal-400 mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("cta.title")}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">{t("cta.subtitle")}</p>
            <Link href="/dashboard">
              <Button
                size="lg"
                className="bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white shadow-xl shadow-teal-500/40 px-10 py-6 text-base gap-2"
              >
                {t("cta.button")}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/40 mt-16 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto max-w-7xl px-4 md:px-6 py-10">
          <div className="grid md:grid-cols-3 gap-8 text-sm">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <HeartPulse className="h-5 w-5 text-teal-400" />
                <span className="font-bold text-foreground">MediAI</span>
              </div>
              <p className="text-muted-foreground text-xs leading-relaxed">{t("disclaimer")}</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">{t("footer.product")}</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link href="/dashboard" className="hover:text-teal-400 transition-colors">{t("dashboard")}</Link></li>
                <li><Link href="/symptoms" className="hover:text-teal-400 transition-colors">{t("symptomChecker")}</Link></li>
                <li><Link href="/drugs" className="hover:text-teal-400 transition-colors">{t("drugInteractions")}</Link></li>
                <li><Link href="/blog" className="hover:text-teal-400 transition-colors">{t("blog")}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">{t("footer.legal")}</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link href="/privacy" className="hover:text-teal-400 transition-colors">{t("privacy")}</Link></li>
                <li><Link href="/terms" className="hover:text-teal-400 transition-colors">{t("terms")}</Link></li>
                <li><Link href="/pricing" className="hover:text-teal-400 transition-colors">{t("pricing")}</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-border/40 text-center text-xs text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} MediAI. {t("footer.rights")}</p>
            <p className="mt-1 text-amber-400/70 font-medium">{t("credit")}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
