import { useEffect, useState } from "react";
import { Link } from "wouter";
import { useI18n } from "@/lib/i18n";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Users, MessageCircle, Plus } from "lucide-react";
import { motion } from "framer-motion";

type Post = {
  id: number;
  authorName: string;
  language: string;
  title: string;
  body: string;
  replyCount: number;
  createdAt: string;
};

export default function Community() {
  const { t, language } = useI18n();
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    document.title = `${t("communityTitle")} – MediAI`;
    refresh();
  }, []);

  const refresh = () => {
    fetch("/api/community")
      .then((r) => r.json())
      .then((d) => setPosts(d.posts ?? []))
      .catch(() => setPosts([]));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/community", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body, authorName: name || undefined, language }),
      });
      if (res.ok) {
        setTitle("");
        setBody("");
        setName("");
        setShowForm(false);
        refresh();
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-primary/10 p-3">
            <Users className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold" data-testid="text-community-title">
              {t("communityTitle")}
            </h1>
            <p className="text-muted-foreground">{t("communitySubtitle")}</p>
          </div>
        </div>
        <Button onClick={() => setShowForm((v) => !v)} data-testid="button-new-post">
          <Plus className="me-2 h-4 w-4" /> {t("newPost")}
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{t("newPost")}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={submit} className="space-y-3">
              <div>
                <Label htmlFor="title">{t("postTitle")}</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  data-testid="input-post-title"
                />
              </div>
              <div>
                <Label htmlFor="body">{t("postBody")}</Label>
                <Textarea
                  id="body"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  rows={5}
                  required
                  data-testid="input-post-body"
                />
              </div>
              <div>
                <Label htmlFor="name">{t("yourName")}</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  data-testid="input-post-name"
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" disabled={submitting} data-testid="button-publish-post">
                  {t("publish")}
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  {t("cancel")}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {posts === null ? (
        <p className="text-muted-foreground">{t("loading")}</p>
      ) : posts.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">{t("noPosts")}</CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {posts.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <Link href={`/community/${p.id}`}>
                <Card className="cursor-pointer transition hover:border-primary/50">
                  <CardContent className="p-5">
                    <h3 className="text-lg font-semibold" data-testid={`link-post-${p.id}`}>
                      {p.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{p.body}</p>
                    <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                      <span>{p.authorName} · {new Date(p.createdAt).toLocaleDateString()}</span>
                      <span className="inline-flex items-center gap-1">
                        <MessageCircle className="h-3 w-3" /> {p.replyCount}
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
