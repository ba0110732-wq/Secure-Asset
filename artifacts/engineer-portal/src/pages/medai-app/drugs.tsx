import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { useCreateDrugCheck, useListDrugChecks, getListDrugChecksQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Pill, AlertCircle, Clock, Plus, Trash2, ShieldAlert } from "lucide-react";
import { ShareButtons } from "@/components/medai/share-buttons";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { format } from "date-fns";
import { motion } from "framer-motion";

const formSchema = z.object({
  drugs: z.array(z.object({
    name: z.string().min(2, { message: "Drug name is required" })
  })).min(2, { message: "Add at least two drugs to check interactions" }),
});

export default function Drugs() {
  const { t, language } = useI18n();
  const queryClient = useQueryClient();
  const { data: pastChecks, isLoading } = useListDrugChecks();
  
  const createCheck = useCreateDrugCheck();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      drugs: [{ name: "" }, { name: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "drugs",
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createCheck.mutate(
      { data: { drugs: values.drugs.map(d => d.name), language } },
      {
        onSuccess: () => {
          toast.success(t("success"));
          form.reset({ drugs: [{ name: "" }, { name: "" }] });
          queryClient.invalidateQueries({ queryKey: getListDrugChecksQueryKey() });
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

  const getRiskColor = (level: string) => {
    switch (level) {
      case "high": return "border-destructive text-destructive bg-destructive/10";
      case "moderate": return "border-amber-500 text-amber-500 bg-amber-500/10";
      case "low": return "border-blue-500 text-blue-500 bg-blue-500/10";
      default: return "border-green-500 text-green-500 bg-green-500/10";
    }
  };

  return (
    <motion.div className="space-y-8" variants={container} initial="hidden" animate="show">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t("drugInteractions")}</h1>
        <p className="text-muted-foreground">Check for potential interactions between multiple medications.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-12">
        <motion.div variants={item} className="md:col-span-5 lg:col-span-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Pill className="h-5 w-5 text-primary" />
                {t("drugInteractions")}
              </CardTitle>
              <CardDescription>
                Enter the names of medications, supplements, or vitamins.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="space-y-3">
                    {fields.map((field, index) => (
                      <FormField
                        key={field.id}
                        control={form.control}
                        name={`drugs.${index}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className={index !== 0 ? "sr-only" : ""}>
                              {index === 0 ? t("drugName") : `Drug ${index + 1}`}
                            </FormLabel>
                            <FormControl>
                              <div className="flex items-center gap-2">
                                <Input {...field} placeholder="e.g. Aspirin" />
                                {fields.length > 2 && (
                                  <Button 
                                    type="button" 
                                    variant="ghost" 
                                    size="icon" 
                                    className="text-destructive shrink-0"
                                    onClick={() => remove(index)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                  
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full border-dashed"
                    onClick={() => append({ name: "" })}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    {t("addDrug")}
                  </Button>

                  <Button type="submit" className="w-full" disabled={createCheck.isPending}>
                    {createCheck.isPending ? t("loading") : t("checkInteractions")}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item} className="md:col-span-7 lg:col-span-8 space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Clock className="h-5 w-5" />
            {t("pastDrugChecks")}
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
                <Card key={check.id} className="overflow-hidden">
                  <CardHeader className="bg-muted/30 pb-4 border-b">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex flex-wrap gap-2">
                          {check.drugs.map((drug, i) => (
                            <Badge key={i} variant="secondary" className="bg-secondary/50">
                              {drug}
                            </Badge>
                          ))}
                        </div>
                        <CardDescription>
                          {format(new Date(check.createdAt), "PPP 'at' p")}
                        </CardDescription>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={getRiskColor(check.riskLevel)}
                      >
                        {t("riskLevel")}: {check.riskLevel}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-6">
                    <div>
                      <h4 className="text-sm font-semibold mb-2 text-foreground flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {t("analysis")}
                      </h4>
                      <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">{check.analysis}</p>
                    </div>
                    
                    {check.interactions && check.interactions.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold mb-3 text-foreground flex items-center gap-1">
                          <ShieldAlert className="h-4 w-4 text-amber-500" />
                          {t("interactionsLabel")}
                        </h4>
                        <div className="space-y-3">
                          {check.interactions.map((interaction, i) => (
                            <div key={i} className="bg-secondary/20 rounded-md p-3 border border-border/50">
                              <div className="flex justify-between items-start mb-2">
                                <div className="font-medium text-sm flex gap-2">
                                  <span className="text-primary">{interaction.drugA}</span>
                                  <span className="text-muted-foreground">+</span>
                                  <span className="text-primary">{interaction.drugB}</span>
                                </div>
                                <Badge variant="outline" className={`text-xs ${getRiskColor(interaction.severity)}`}>
                                  {interaction.severity}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{interaction.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {idx === 0 && (
                      <ShareButtons text={`MediAI Drug Interaction Check: ${check.analysis.slice(0, 120)}...`} />
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border-dashed border-2 bg-muted/20">
              <CardContent className="flex flex-col items-center justify-center h-48 text-center p-6">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <Pill className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">{t("noDrugChecks")}</h3>
                <p className="text-sm text-muted-foreground mt-1 max-w-sm">
                  Enter multiple medications to see if they are safe to take together.
                </p>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}