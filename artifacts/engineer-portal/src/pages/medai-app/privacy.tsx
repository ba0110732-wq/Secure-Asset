import { useEffect } from "react";
import { useI18n } from "@/lib/i18n";
import { Card, CardContent } from "@/components/ui/card";
import { Shield } from "lucide-react";

export default function Privacy() {
  const { t } = useI18n();
  useEffect(() => {
    document.title = `${t("privacyTitle")} – MediAI`;
  }, [t]);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-primary/10 p-3">
          <Shield className="h-6 w-6 text-primary" />
        </div>
        <h1 className="text-3xl font-bold" data-testid="text-privacy-title">
          {t("privacyTitle")}
        </h1>
      </div>
      <p className="text-sm text-muted-foreground">
        {t("lastUpdated")}: {new Date().toLocaleDateString()}
      </p>
      <Card>
        <CardContent className="prose prose-slate max-w-none py-6 dark:prose-invert">
          <h2>1. Information We Collect</h2>
          <p>
            MediAI collects health data you voluntarily provide: symptom descriptions, drug names you check
            for interactions, vital sign readings, and consultation messages. We also collect technical data
            (device, browser, language preference) to improve the service.
          </p>

          <h2>2. How We Use Your Data</h2>
          <p>
            Your health data is used solely to power AI analyses, generate recommendations, and display your
            personal health history. We do not sell or share personal health information with third parties
            for advertising.
          </p>

          <h2>3. AI Processing</h2>
          <p>
            Symptom, drug, and consultation prompts are sent to our AI provider (OpenAI) for processing.
            These providers may retain anonymized prompts according to their own privacy policies.
          </p>

          <h2>4. Storage and Security</h2>
          <p>
            Data is stored in encrypted PostgreSQL databases. We employ industry-standard security
            practices including TLS in transit, hashed credentials, and restricted database access.
          </p>

          <h2>5. Your Rights</h2>
          <p>
            You can request deletion of your data at any time by contacting us. EU and California residents
            have additional rights under GDPR and CCPA respectively.
          </p>

          <h2>6. Cookies</h2>
          <p>
            We use a minimal set of cookies for language preference, theme, and (with your consent)
            analytics. See our cookie consent banner for details.
          </p>

          <h2>7. Medical Disclaimer</h2>
          <p>
            MediAI is an educational tool, not a medical service. AI outputs do not constitute medical
            advice and must not replace consultation with a licensed physician.
          </p>

          <h2>8. Contact</h2>
          <p>For privacy questions, contact the project maintainer through the app's community page.</p>
        </CardContent>
      </Card>
    </div>
  );
}
