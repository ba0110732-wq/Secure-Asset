import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { useListConsultations, useCreateConsultation, getListConsultationsQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { MessageSquare, Plus, Clock, ChevronRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { format } from "date-fns";
import { motion } from "framer-motion";

export default function Consultations() {
  const { t, language } = useI18n();
  const queryClient = useQueryClient();
  const [, setLocation] = useLocation();
  const { data: consultations, isLoading } = useListConsultations();
  const createConsultation = useCreateConsultation();
  const [message, setMessage] = useState("");

  function handleStart(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) return;

    createConsultation.mutate(
      { data: { message, language } },
      {
        onSuccess: (newConsultation) => {
          queryClient.invalidateQueries({ queryKey: getListConsultationsQueryKey() });
          setLocation(`/consultations/${newConsultation.id}`);
        },
        onError: () => {
          toast.error(t("error"));
        }
      }
    );
  }

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div className="space-y-8" variants={container} initial="hidden" animate="show">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t("consultations")}</h1>
          <p className="text-muted-foreground">Chat with your AI medical assistant.</p>
        </div>
      </div>

      <motion.div variants={item}>
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2 text-primary">
              <Plus className="h-5 w-5" />
              {t("newConsultation")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleStart} className="flex gap-2">
              <Input
                placeholder={t("typeMessage")}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="bg-background"
              />
              <Button type="submit" disabled={createConsultation.isPending || !message.trim()}>
                {createConsultation.isPending ? t("loading") : t("send")}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item} className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Clock className="h-5 w-5" />
          {t("pastConsultations")}
        </h2>

        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-5 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : consultations && consultations.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {consultations.map((consultation) => (
              <Link key={consultation.id} href={`/consultations/${consultation.id}`}>
                <Card className="cursor-pointer hover:border-primary/50 transition-colors h-full flex flex-col">
                  <CardHeader className="flex-1">
                    <CardTitle className="text-base line-clamp-2 leading-snug">
                      {consultation.title}
                    </CardTitle>
                    <CardDescription className="mt-2">
                      {format(new Date(consultation.updatedAt), "PPP")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0 flex justify-between items-center text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" />
                      {consultation.messages.length} messages
                    </span>
                    <ChevronRight className="h-4 w-4 rtl:rotate-180" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <Card className="border-dashed border-2 bg-muted/20">
            <CardContent className="flex flex-col items-center justify-center h-48 text-center p-6">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <MessageSquare className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">{t("noConsultations")}</h3>
              <p className="text-sm text-muted-foreground mt-1 max-w-sm">
                Start a new conversation above to ask health-related questions.
              </p>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </motion.div>
  );
}