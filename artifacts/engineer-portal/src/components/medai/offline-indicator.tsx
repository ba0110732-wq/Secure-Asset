import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { WifiOff } from "lucide-react";

export function OfflineIndicator() {
  const { t } = useI18n();
  const [offline, setOffline] = useState(typeof navigator !== "undefined" ? !navigator.onLine : false);

  useEffect(() => {
    const on = () => setOffline(false);
    const off = () => setOffline(true);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
    };
  }, []);

  if (!offline) return null;

  return (
    <div
      className="fixed top-3 inset-x-3 z-50 mx-auto max-w-sm rounded-lg border border-amber-300 bg-amber-50 px-4 py-2 text-sm text-amber-900 shadow-md flex items-center gap-2 dark:bg-amber-900/30 dark:text-amber-100 dark:border-amber-700"
      data-testid="offline-indicator"
    >
      <WifiOff className="h-4 w-4 flex-shrink-0" />
      <span>{t("offlineMessage")}</span>
    </div>
  );
}
