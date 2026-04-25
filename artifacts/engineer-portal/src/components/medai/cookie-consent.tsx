import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

export function CookieConsent() {
  const { t } = useI18n();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) setVisible(true);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-4 inset-x-4 z-50 mx-auto max-w-3xl rounded-lg border bg-background/95 p-4 shadow-lg backdrop-blur md:flex md:items-center md:gap-4"
      data-testid="cookie-consent-banner"
    >
      <p className="flex-1 text-sm text-muted-foreground">{t("cookieMessage")}</p>
      <div className="mt-3 flex gap-2 md:mt-0">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            localStorage.setItem("cookie-consent", "declined");
            setVisible(false);
          }}
          data-testid="button-cookie-decline"
        >
          {t("decline")}
        </Button>
        <Button
          size="sm"
          onClick={() => {
            localStorage.setItem("cookie-consent", "accepted");
            setVisible(false);
          }}
          data-testid="button-cookie-accept"
        >
          {t("accept")}
        </Button>
      </div>
    </div>
  );
}
