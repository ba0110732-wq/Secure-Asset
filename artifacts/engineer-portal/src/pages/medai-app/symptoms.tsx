import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { useCreateSymptomCheck, useListSymptomChecks, getListSymptomChecksQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Stethoscope, AlertCircle, Clock, ChevronRight } from "lucide-react";
import { ShareButtons } from "@/components/medai/share-buttons";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { format } from "date-fns";
import { motion } from "framer-motion";

const formSchema = z.object({
  symptoms: z.string().min(10, {
    message: "Please describe your symptoms in at least 10 characters.",
  }),
});

export default function Symptoms() {
  const { t, language } = useI18n();
  const queryClient = useQueryClient();
  const { data: pastChecks, isLoading } = useListSymptomChecks();
  
  const createCheck = useCreateSymptomCheck();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      symptoms: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createCheck.mutate(
      { data: { symptoms: values.symptoms, language } },
      {
        onSuccess: () => {
          toast.success(t("success"));
          form.reset();
          queryClient.invalidateQueries({ queryKey: getListSymptomChecksQueryKey() });
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
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t("symptomChecker")}</h1>
        <p className="text-muted-foreground">Describe how you're feeling and get AI-powered insights.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-12">
        <motion.div variants={item} className="md:col-span-5 lg:col-span-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Stethoscope className="h-5 w-5 text-primary" />
                {t("symptomChecker")}
              </CardTitle>
              <CardDescription>
                Provide detailed symptoms including duration and severity.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="symptoms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("describeSymptoms")}</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="e.g. I have had a headache for 3 days, mild fever, and nausea..." 
                            className="min-h-[120px] resize-none"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={createCheck.isPending}>
                    {createCheck.isPending ? t("loading") : t("submitSymptoms")}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item} className="md:col-span-7 lg:col-span-8 space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Clock className="h-5 w-5" />
            {t("pastChecks")}
          </h2>
          
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <Card key={i}>
                  <CardHeader className="pb-2">
                    <Skeleton className="h-4 w-32 mb-2" />
                    <Skeleton className="h-4 w-full" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-16 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : pastChecks && pastChecks.length > 0 ? (
            <div className="space-y-4">
              {pastChecks.map((check, idx) => (
                <Card key={check.id} className="overflow-hidden border-l-4 border-l-primary/50">
                  <CardHeader className="bg-muted/30 pb-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-base line-clamp-1">{check.symptoms}</CardTitle>
                        <CardDescription>
                          {format(new Date(check.createdAt), "PPP 'at' p")}
                        </CardDescription>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={
                          check.severity === "high" ? "border-destructive text-destructive bg-destructive/10" :
                          check.severity === "medium" ? "border-amber-500 text-amber-500 bg-amber-500/10" :
                          "border-green-500 text-green-500 bg-green-500/10"
                        }
                      >
                        {t("severity")}: {check.severity}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold mb-1 text-foreground flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {t("analysis")}
                      </h4>
                      <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">{check.analysis}</p>
                    </div>
                    {check.recommendations && check.recommendations.length > 0 && (
                      <div className="bg-primary/5 p-3 rounded-md border border-primary/10">
                        <h4 className="text-sm font-semibold mb-2 text-primary">{t("recommendations")}</h4>
                        <ul className="space-y-1">
                          {check.recommendations.map((rec, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                              <ChevronRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                              <span>{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {idx === 0 && (
                      <ShareButtons text={`MediAI Symptom Analysis: ${check.analysis.slice(0, 120)}...`} />
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border-dashed border-2 bg-muted/20">
              <CardContent className="flex flex-col items-center justify-center h-48 text-center p-6">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <Stethoscope className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">{t("noSymptomChecks")}</h3>
                <p className="text-sm text-muted-foreground mt-1 max-w-sm">
                  Record your symptoms in the form to get an AI analysis and recommendations.
                </p>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}