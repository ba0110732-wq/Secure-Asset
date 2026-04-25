import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";

type Props = {
  text: string;
  url?: string;
};

export function ShareButtons({ text, url }: Props) {
  const { t } = useI18n();
  const shareUrl = url ?? (typeof window !== "undefined" ? window.location.href : "");
  const encodedText = encodeURIComponent(text);
  const encodedUrl = encodeURIComponent(shareUrl);

  const links = [
    {
      name: "WhatsApp",
      href: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
      bg: "bg-[#25D366] hover:bg-[#1da851]",
    },
    {
      name: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`,
      bg: "bg-[#1877F2] hover:bg-[#0f5fc7]",
    },
    {
      name: "X / Twitter",
      href: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      bg: "bg-black hover:bg-zinc-800",
    },
    {
      name: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      bg: "bg-[#0A66C2] hover:bg-[#084d96]",
    },
  ];

  return (
    <div className="rounded-lg border bg-muted/30 p-4">
      <div className="mb-3 flex items-center gap-2 text-sm font-medium">
        <Share2 className="h-4 w-4" />
        {t("share")}
      </div>
      <div className="flex flex-wrap gap-2">
        {links.map((link) => (
          <Button
            key={link.name}
            asChild
            size="sm"
            className={`${link.bg} text-white border-none`}
            data-testid={`button-share-${link.name.toLowerCase().split(" ")[0]}`}
          >
            <a href={link.href} target="_blank" rel="noopener noreferrer">
              {link.name}
            </a>
          </Button>
        ))}
      </div>
    </div>
  );
}
