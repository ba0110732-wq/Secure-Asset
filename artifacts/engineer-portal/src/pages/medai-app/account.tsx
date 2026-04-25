import { useEffect, useState } from "react";
import { Link } from "wouter";
import { useI18n } from "@/lib/i18n";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User2, Crown, Activity, Pill, MessageSquare, HeartPulse } from "lucide-react";

type Summary = {
  consultations: number;
  symptomChecks: number;
  drugChecks: number;
  vitalRecords: number;
  lastVitalAt: string | null;
};

export default function Account() {
  const { t } = useI18n();
  const [summary, setSummary] = useState<Summary | null>(null);
  const plan = (typeof window !== "undefined" && localStorage.getItem("plan")) || "free";

  useEffect(() => {
    document.title = `${t("accountTitle")} – MediAI`;
    fetch("/api/dashboard/summary")
      .then((r) => r.json())
      .then((d) => setSummary(d))
      .catch(() => setSummary(null));
  }, [t]);

  const stats = [
    { label: t("totalConsultations"), value: summary?.consultations ?? 0, icon: MessageSquare },
    { label: t("totalSymptomChecks"), value: summary?.symptomChecks ?? 0, icon: Activity },
    { label: t("totalDrugChecks"), value: summary?.drugChecks ?? 0, icon: Pill },
    { label: t("totalVitalRecords"), value: summary?.vitalRecords ?? 0, icon: HeartPulse },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-primary/10 p-3">
          <User2 className="h-6 w-6 text-primary" />
        </div>
        <h1 className="text-3xl font-bold" data-testid="text-account-title">
          {t("accountTitle")}
        </h1>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-primary" /> {t("currentPlan")}
          </CardTitle>
          <Badge variant="secondary" className="text-base capitalize" data-testid="badge-plan">
            {plan}
          </Badge>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {plan === "free"
              ? "5 symptom checks + 5 drug interaction checks per day. Upgrade for unlimited."
              : plan === "pro"
                ? "Unlimited AI consultations, symptom and drug checks."
                : "Enterprise tier with private API access."}
          </p>
          <Button asChild className="mt-4">
            <Link href="/pricing">{t("upgrade")}</Link>
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("usageStats")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-lg border bg-muted/20 p-4">
                <s.icon className="mb-2 h-5 w-5 text-primary" />
                <div className="text-2xl font-bold" data-testid={`stat-${s.label.replace(/\s/g, "-")}`}>
                  {s.value}
                </div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
          {summary?.lastVitalAt && (
            <p className="mt-4 text-sm text-muted-foreground">
              {t("lastVitalAt")}: {new Date(summary.lastVitalAt).toLocaleString()}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
