import { useEffect, useState } from "react";
import { Link, useParams } from "wouter";
import { useI18n } from "@/lib/i18n";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShareButtons } from "@/components/medai/share-buttons";
import { ArrowLeft, Calendar } from "lucide-react";

type Post = {
  id: number;
  slug: string;
  language: string;
  title: string;
  excerpt: string;
  content: string;
  metaDescription: string;
  tags: string[];
  createdAt: string;
};

function renderMarkdown(md: string): string {
  return md
    .replace(/^### (.*$)/gim, '<h3 class="mt-6 mb-2 text-lg font-semibold">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="mt-8 mb-3 text-xl font-bold">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="mt-8 mb-4 text-2xl font-bold">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/^- (.+)$/gim, '<li class="ml-6 list-disc">$1</li>')
    .split(/\n\n+/)
    .map((p) =>
      p.startsWith("<h") || p.startsWith("<li")
        ? p
        : `<p class="mb-4 leading-relaxed">${p.replace(/\n/g, "<br/>")}</p>`,
    )
    .join("\n");
}

export default function BlogPost() {
  const params = useParams<{ slug: string }>();
  const { t } = useI18n();
  const [post, setPost] = useState<Post | null | "missing">(null);

  useEffect(() => {
    fetch(`/api/blog/${params.slug}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => {
        setPost(d.post);
        document.title = `${d.post.title} – MediAI`;
        const meta = document.querySelector('meta[name="description"]');
        if (meta) meta.setAttribute("content", d.post.metaDescription);
      })
      .catch(() => setPost("missing"));
  }, [params.slug]);

  if (post === null) return <p className="text-muted-foreground">{t("loading")}</p>;
  if (post === "missing")
    return (
      <Card>
        <CardContent className="py-12 text-center">{t("error")}</CardContent>
      </Card>
    );

  return (
    <article className="mx-auto max-w-3xl space-y-6">
      <Button asChild variant="ghost" size="sm">
        <Link href="/blog">
          <ArrowLeft className="me-2 h-4 w-4" /> {t("blog")}
        </Link>
      </Button>
      <header className="space-y-3">
        <h1 className="text-3xl font-bold leading-tight md:text-4xl" data-testid="text-post-title">
          {post.title}
        </h1>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          {new Date(post.createdAt).toLocaleDateString()}
        </div>
        <div className="flex flex-wrap gap-1">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </header>
      <div
        className="prose prose-slate max-w-none dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
      />
      <ShareButtons text={post.title} />
    </article>
  );
}
