import { useEffect, useState } from "react";
import { Link, useParams } from "wouter";
import { useI18n } from "@/lib/i18n";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ShareButtons } from "@/components/medai/share-buttons";
import { ArrowLeft, MessageCircle } from "lucide-react";

type Post = { id: number; title: string; body: string; authorName: string; createdAt: string; replyCount: number };
type Reply = { id: number; body: string; authorName: string; createdAt: string };

export default function CommunityPostPage() {
  const params = useParams<{ id: string }>();
  const { t } = useI18n();
  const [post, setPost] = useState<Post | null>(null);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [body, setBody] = useState("");
  const [name, setName] = useState("");

  const load = () => {
    fetch(`/api/community/${params.id}`)
      .then((r) => r.json())
      .then((d) => {
        setPost(d.post);
        setReplies(d.replies ?? []);
      })
      .catch(() => {});
  };

  useEffect(() => {
    load();
  }, [params.id]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!body.trim()) return;
    const res = await fetch(`/api/community/${params.id}/replies`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body, authorName: name || undefined }),
    });
    if (res.ok) {
      setBody("");
      setName("");
      load();
    }
  };

  if (!post) return <p className="text-muted-foreground">{t("loading")}</p>;

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Button asChild variant="ghost" size="sm">
        <Link href="/community">
          <ArrowLeft className="me-2 h-4 w-4" /> {t("back")}
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle data-testid="text-post-title">{post.title}</CardTitle>
          <p className="text-sm text-muted-foreground">
            {post.authorName} · {new Date(post.createdAt).toLocaleString()}
          </p>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-wrap leading-relaxed">{post.body}</p>
          <div className="mt-4">
            <ShareButtons text={post.title} />
          </div>
        </CardContent>
      </Card>

      <div>
        <h2 className="mb-3 flex items-center gap-2 text-xl font-semibold">
          <MessageCircle className="h-5 w-5" />
          {t("replies")} ({replies.length})
        </h2>
        <div className="space-y-2">
          {replies.map((r) => (
            <Card key={r.id}>
              <CardContent className="p-4">
                <p className="whitespace-pre-wrap">{r.body}</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  {r.authorName} · {new Date(r.createdAt).toLocaleString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("reply")}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="space-y-3">
            <div>
              <Label htmlFor="rbody">{t("writeReply")}</Label>
              <Textarea
                id="rbody"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={4}
                required
                data-testid="input-reply-body"
              />
            </div>
            <div>
              <Label htmlFor="rname">{t("yourName")}</Label>
              <Input
                id="rname"
                value={name}
                onChange={(e) => setName(e.target.value)}
                data-testid="input-reply-name"
              />
            </div>
            <Button type="submit" data-testid="button-submit-reply">
              {t("publish")}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
