import { useEffect } from "react";
import { useI18n } from "@/lib/i18n";
import { Card, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function Terms() {
  const { t } = useI18n();
  useEffect(() => {
    document.title = `${t("termsTitle")} – MediAI`;
  }, [t]);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-primary/10 p-3">
          <FileText className="h-6 w-6 text-primary" />
        </div>
        <h1 className="text-3xl font-bold" data-testid="text-terms-title">
          {t("termsTitle")}
        </h1>
      </div>
      <p className="text-sm text-muted-foreground">
        {t("lastUpdated")}: {new Date().toLocaleDateString()}
      </p>
      <Card>
        <CardContent className="prose prose-slate max-w-none py-6 dark:prose-invert">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using MediAI, you agree to be bound by these terms. If you do not agree, do
            not use the service.
          </p>

          <h2>2. Service Description</h2>
          <p>
            MediAI is an educational health information tool powered by artificial intelligence. It is
            <strong> not a medical service, diagnosis tool, or substitute for professional medical care</strong>.
          </p>

          <h2>3. User Responsibilities</h2>
          <ul>
            <li>You will not use the service for emergencies — call your local emergency number.</li>
            <li>You will provide accurate information for analyses to be useful.</li>
            <li>You will not abuse the service, attempt to extract its underlying models, or use it
              to spread medical misinformation.</li>
          </ul>

          <h2>4. AI Outputs</h2>
          <p>
            AI-generated content can be incomplete, inaccurate, or biased. Always verify with a licensed
            healthcare professional before acting on any AI suggestion.
          </p>

          <h2>5. Subscription and Billing</h2>
          <p>
            Free tier users receive a daily limit of usage. Paid tiers, when activated, provide expanded
            access. Subscriptions auto-renew unless cancelled before the renewal date.
          </p>

          <h2>6. Intellectual Property</h2>
          <p>
            MediAI, its branding, and source content are the intellectual property of the project's
            engineer (Eng. Abdulrazzaq) and contributors.
          </p>

          <h2>7. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, MediAI and its operators disclaim all liability for
            health outcomes resulting from use of the service.
          </p>

          <h2>8. Modifications</h2>
          <p>
            We may update these terms at any time. Continued use after changes constitutes acceptance.
          </p>

          <h2>9. Governing Law</h2>
          <p>
            These terms are governed by applicable international consumer protection law where you reside.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
