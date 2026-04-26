import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useI18n, LANGUAGES } from "@/lib/i18n";
import {
  Activity,
  Stethoscope,
  Pill,
  MessageSquare,
  HeartPulse,
  User,
  CreditCard,
  Menu,
  Languages,
  Newspaper,
  Users,
  UserCircle,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Layout({ children }: { children: React.ReactNode }) {
  const { t, language, setLanguage } = useI18n();
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navItems = [
    { href: "/dashboard", label: t("dashboard"), icon: Activity },
    { href: "/symptoms", label: t("symptomChecker"), icon: Stethoscope },
    { href: "/drugs", label: t("drugInteractions"), icon: Pill },
    { href: "/consultations", label: t("consultations"), icon: MessageSquare },
    { href: "/vitals", label: t("vitalSigns"), icon: HeartPulse },
    { href: "/profile", label: t("healthProfile"), icon: User },
    { href: "/blog", label: t("blog"), icon: Newspaper },
    { href: "/community", label: t("community"), icon: Users },
    { href: "/account", label: t("account"), icon: UserCircle },
    { href: "/pricing", label: t("pricing"), icon: CreditCard },
  ];

  const SidebarContent = () => (
    <div className="flex h-full flex-col bg-card">
      <div className="flex h-16 items-center justify-between px-6 border-b border-border/50">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold text-lg">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-teal-500/30">
            <HeartPulse className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="leading-tight bg-gradient-to-r from-teal-300 to-emerald-400 bg-clip-text text-transparent">
              {t("brandTitle")}
            </span>
            <span className="text-[10px] text-muted-foreground leading-tight uppercase tracking-wider">
              {t("brandSubtitle")}
            </span>
          </div>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <nav className="grid gap-1 px-3">
          {navItems.map((item) => {
            const isActive =
              location === item.href ||
              (item.href !== "/dashboard" && location.startsWith(item.href));
            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-r from-teal-500/20 to-emerald-500/10 text-teal-300 border border-teal-500/30"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-border/50 space-y-3">
        <Link href="/">
          <div className="flex items-center gap-2 text-xs text-muted-foreground hover:text-amber-400 transition-colors cursor-pointer">
            <ArrowLeft className="h-3 w-3" />
            {t("backToHome")}
          </div>
        </Link>
        <p className="text-xs text-center text-muted-foreground pt-2 border-t border-border/30">
          {t("credit")}
        </p>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-[100dvh] w-full bg-background">
      <aside className="hidden border-r border-border/50 w-64 md:block flex-shrink-0">
        <SidebarContent />
      </aside>

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center justify-between border-b border-border/50 bg-card/80 backdrop-blur-md px-4 md:px-6 shrink-0 z-10">
          <div className="flex items-center gap-4 md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="-ml-2">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side={language === "ar" ? "right" : "left"}
                className="w-72 p-0"
              >
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <SheetDescription className="sr-only">Access app pages</SheetDescription>
                <SidebarContent />
              </SheetContent>
            </Sheet>
            <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
              <HeartPulse className="h-5 w-5 text-teal-400" />
              <span className="bg-gradient-to-r from-teal-300 to-emerald-400 bg-clip-text text-transparent">
                {t("brandTitle")}
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
            <span className="font-medium">{t("brandTitle")}</span>
            <span className="text-xs">·</span>
            <span className="text-xs">{t("credit")}</span>
          </div>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  title="Language"
                  data-testid="button-language"
                >
                  <Languages className="h-5 w-5" />
                  <span className="sr-only">Language</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {LANGUAGES.map((l) => (
                  <DropdownMenuItem
                    key={l.code}
                    onClick={() => setLanguage(l.code)}
                    className={language === l.code ? "bg-accent" : ""}
                    data-testid={`menu-lang-${l.code}`}
                  >
                    <span className="me-2 inline-block w-8 text-xs uppercase text-muted-foreground">
                      {l.code}
                    </span>
                    {l.native}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="container max-w-6xl mx-auto p-4 md:p-6 lg:p-8">
            {children}
          </div>

          <footer className="mt-8 border-t border-border/50 py-6 text-center text-sm text-muted-foreground">
            <div className="container max-w-4xl mx-auto px-4">
              <p className="mb-2 text-xs">{t("disclaimer")}</p>
              <p className="font-medium text-amber-400/80">{t("credit")}</p>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
