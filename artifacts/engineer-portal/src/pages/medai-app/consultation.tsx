import { useState, useRef, useEffect } from "react";
import { useI18n } from "@/lib/i18n";
import { useGetConsultation, getGetConsultationQueryKey, usePostConsultationMessage } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "wouter";
import { MessageSquare, ArrowLeft, Send, Bot, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "wouter";
import { format } from "date-fns";
import { motion } from "framer-motion";

export default function Consultation() {
  const { t, language } = useI18n();
  const params = useParams();
  const id = parseInt(params.id || "0", 10);
  const queryClient = useQueryClient();
  
  const { data: consultation, isLoading } = useGetConsultation(id, { 
    query: { enabled: !!id, queryKey: getGetConsultationQueryKey(id) } 
  });
  
  const postMessage = usePostConsultationMessage();
  const [message, setMessage] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Optimistic messages state
  const [optimisticMessages, setOptimisticMessages] = useState<{role: string, content: string, id: string}[]>([]);

  useEffect(() => {
    // Reset optimistic messages when real data arrives
    if (consultation) {
      setOptimisticMessages([]);
    }
  }, [consultation]);

  useEffect(() => {
    // Scroll to bottom when messages change
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [consultation?.messages, optimisticMessages]);

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim() || !id) return;

    const newMsg = message.trim();
    setMessage("");
    
    // Add optimistic user message
    setOptimisticMessages(prev => [...prev, { role: "user", content: newMsg, id: Date.now().toString() }]);

    postMessage.mutate(
      { id, data: { message: newMsg, language } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getGetConsultationQueryKey(id) });
        }
      }
    );
  }

  const allMessages = [
    ...(consultation?.messages || []),
    ...optimisticMessages
  ];

  if (isLoading) {
    return (
      <div className="space-y-4 max-w-3xl mx-auto h-[80vh] flex flex-col">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-full w-full flex-1" />
      </div>
    );
  }

  if (!consultation && !isLoading) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold">Consultation not found</h2>
        <Link href="/consultations">
          <Button variant="link" className="mt-4">Back to Consultations</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-12rem)] flex flex-col">
      <div className="flex items-center gap-4 mb-4 shrink-0">
        <Link href="/consultations">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5 rtl:rotate-180" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-xl font-bold tracking-tight line-clamp-1">{consultation?.title}</h1>
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <MessageSquare className="h-3 w-3" />
            AI Medical Assistant
          </p>
        </div>
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden border-primary/20 shadow-sm">
        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          <div className="space-y-6 max-w-3xl mx-auto pb-4">
            {allMessages.map((msg, i) => {
              const isUser = msg.role === "user";
              return (
                <motion.div 
                  key={'id' in msg ? msg.id : i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}
                >
                  <div className={`shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${isUser ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
                    {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  </div>
                  <div className={`px-4 py-3 rounded-2xl max-w-[80%] ${isUser ? "bg-primary text-primary-foreground rounded-tr-sm" : "bg-muted rounded-tl-sm"}`}>
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                    {'createdAt' in msg && (
                      <span className={`text-[10px] mt-2 block opacity-70 ${isUser ? "text-right" : "text-left"}`}>
                        {format(new Date((msg as any).createdAt), "h:mm a")}
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
            
            {postMessage.isPending && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-3 flex-row"
              >
                <div className="shrink-0 h-8 w-8 rounded-full flex items-center justify-center bg-secondary text-secondary-foreground">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="px-4 py-4 rounded-2xl bg-muted rounded-tl-sm flex items-center gap-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </motion.div>
            )}
          </div>
        </ScrollArea>
        
        <div className="p-3 bg-background border-t shrink-0">
          <form onSubmit={handleSend} className="flex gap-2 max-w-3xl mx-auto">
            <Input
              placeholder={t("typeMessage")}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 bg-muted/50 border-muted-foreground/20 focus-visible:ring-primary h-12 rounded-full px-6"
            />
            <Button 
              type="submit" 
              size="icon" 
              className="h-12 w-12 rounded-full shrink-0" 
              disabled={postMessage.isPending || !message.trim()}
            >
              <Send className="h-5 w-5 rtl:-scale-x-100" />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}