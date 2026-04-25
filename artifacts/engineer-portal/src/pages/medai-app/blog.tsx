import { useEffect, useState } from "react";
import { Link } from "wouter";
import { useI18n } from "@/lib/i18n";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Newspaper, ArrowRight } from "lucide-react";

type Post = {
  id: number;
  slug: string;
  language: string;
  title: string;
  excerpt: string;
  metaDescription: string;
  tags: string[];
  createdAt: string;
};

export default function Blog() {
  const { t, language } = useI18n();
  const [posts, setPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    document.title = `${t("blogTitle")} – MediAI`;
    fetch(`/api/blog?lang=${language}`)
      .then((r) => r.json())
      .then((d) => setPosts(d.posts ?? []))
      .catch(() => setPosts([]));
  }, [language, t]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-primary/10 p-3">
          <Newspaper className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold" data-testid="text-blog-title">
            {t("blogTitle")}
          </h1>
          <p className="text-muted-foreground">{t("blogSubtitle")}</p>
        </div>
      </div>

      {posts === null ? (
        <p className="text-muted-foreground">{t("loading")}</p>
      ) : posts.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            {t("blogNoPosts")}
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {posts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link href={`/blog/${post.slug}`}>
                <Card className="h-full cursor-pointer transition hover:border-primary/50 hover:shadow-md">
                  <CardHeader>
                    <CardTitle className="line-clamp-2" data-testid={`link-blog-${post.id}`}>
                      {post.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-3 flex flex-wrap gap-1">
                      {post.tags.slice(0, 4).map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                      <span className="inline-flex items-center gap-1 text-primary">
                        {t("blogReadMore")} <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
