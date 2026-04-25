import { useI18n } from "@/lib/i18n";
import { useGetDashboardSummary, useGetRecentActivity, useGetHealthTip } from "@workspace/api-client-react";
import { Activity, Stethoscope, Pill, MessageSquare, HeartPulse, Clock, ArrowRight, AlertTriangle, CheckCircle, Info } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { motion } from "framer-motion";

export default function Dashboard() {
  const { t, language } = useI18n();
  const { data: summary, isLoading: isLoadingSummary } = useGetDashboardSummary();
  const { data: activity, isLoading: isLoadingActivity } = useGetRecentActivity();
  const { data: tip, isLoading: isLoadingTip } = useGetHealthTip();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const stats = [
    { label: t("consultationsCount"), value: summary?.consultations ?? 0, icon: MessageSquare, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: t("symptomChecksCount"), value: summary?.symptomChecks ?? 0, icon: Stethoscope, color: "text-indigo-500", bg: "bg-indigo-500/10" },
    { label: t("drugChecksCount"), value: summary?.drugChecks ?? 0, icon: Pill, color: "text-purple-500", bg: "bg-purple-500/10" },
    { label: t("vitalRecordsCount"), value: summary?.vitalRecords ?? 0, icon: HeartPulse, color: "text-rose-500", bg: "bg-rose-500/10" },
  ];

  return (
    <motion.div 
      className="space-y-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t("dashboard")}</h1>
          <p className="text-muted-foreground flex items-center gap-2">
            <Clock className="h-4 w-4" />
            {t("lastVitalAt")}: {summary?.lastVitalAt ? new Date(summary.lastVitalAt).toLocaleString() : t("never")}
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {isLoadingSummary ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-4 rounded-full" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16" />
              </CardContent>
            </Card>
          ))
        ) : (
          stats.map((stat, i) => (
            <motion.div key={i} variants={item}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                  <div className={`p-2 rounded-full ${stat.bg}`}>
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Quick Actions */}
        <motion.div variants={item} className="lg:col-span-3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("quickActions")}</CardTitle>
              <CardDescription>Fast access to essential health tools</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <Link href="/symptoms">
                <Button variant="outline" className="w-full justify-start h-14 text-left font-normal border-primary/20 hover:border-primary/50 hover:bg-primary/5">
                  <div className="flex w-full items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-md">
                        <Stethoscope className="h-5 w-5 text-primary" />
                      </div>
                      <span className="font-medium text-foreground">{t("checkSymptoms")}</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground rtl:rotate-180" />
                  </div>
                </Button>
              </Link>
              <Link href="/drugs">
                <Button variant="outline" className="w-full justify-start h-14 text-left font-normal border-primary/20 hover:border-primary/50 hover:bg-primary/5">
                  <div className="flex w-full items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-md">
                        <Pill className="h-5 w-5 text-primary" />
                      </div>
                      <span className="font-medium text-foreground">{t("checkDrugs")}</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground rtl:rotate-180" />
                  </div>
                </Button>
              </Link>
              <Link href="/consultations">
                <Button variant="outline" className="w-full justify-start h-14 text-left font-normal border-primary/20 hover:border-primary/50 hover:bg-primary/5">
                  <div className="flex w-full items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-md">
                        <MessageSquare className="h-5 w-5 text-primary" />
                      </div>
                      <span className="font-medium text-foreground">{t("startConsultation")}</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground rtl:rotate-180" />
                  </div>
                </Button>
              </Link>
              <Link href="/vitals">
                <Button variant="outline" className="w-full justify-start h-14 text-left font-normal border-primary/20 hover:border-primary/50 hover:bg-primary/5">
                  <div className="flex w-full items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-md">
                        <HeartPulse className="h-5 w-5 text-primary" />
                      </div>
                      <span className="font-medium text-foreground">{t("recordVitals")}</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground rtl:rotate-180" />
                  </div>
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Health Tip */}
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2 text-primary">
                <Info className="h-4 w-4" />
                {t("healthTip")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoadingTip ? (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              ) : (
                <p className="text-sm leading-relaxed text-foreground/80">
                  {language === "ar" ? tip?.tipAr : tip?.tip}
                </p>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div variants={item} className="lg:col-span-4">
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle>{t("recentActivity")}</CardTitle>
              <CardDescription>Your latest health interactions</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              {isLoadingActivity ? (
                <div className="space-y-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : activity && activity.length > 0 ? (
                <div className="space-y-6">
                  {activity.map((item, i) => {
                    const icons = {
                      symptom: Stethoscope,
                      drug: Pill,
                      consultation: MessageSquare,
                      vital: HeartPulse,
                    };
                    const Icon = icons[item.kind as keyof typeof icons] || Activity;
                    
                    return (
                      <div key={item.id} className="flex items-start gap-4">
                        <div className="bg-secondary/50 p-2 rounded-full mt-0.5">
                          <Icon className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium leading-none">{item.title}</p>
                            <span className="text-xs text-muted-foreground shrink-0">
                              {format(new Date(item.createdAt), "MMM d, h:mm a")}
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="text-sm text-muted-foreground line-clamp-1">{item.subtitle}</p>
                            {item.severity && (
                              <Badge 
                                variant="outline" 
                                className={
                                  item.severity === "high" ? "border-destructive text-destructive" :
                                  item.severity === "medium" ? "border-amber-500 text-amber-500" :
                                  "border-green-500 text-green-500"
                                }
                              >
                                {item.severity}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-48 text-center text-muted-foreground">
                  <Activity className="h-8 w-8 mb-2 opacity-20" />
                  <p>No recent activity.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
