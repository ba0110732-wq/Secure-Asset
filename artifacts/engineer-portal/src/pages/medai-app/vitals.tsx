import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { useCreateVital, useListVitals, getListVitalsQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { HeartPulse, Activity, Thermometer, Droplets, Scale, FileText, Plus, LineChart as LineChartIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const formSchema = z.object({
  heartRate: z.coerce.number().min(30).max(250).optional().or(z.literal("")),
  systolic: z.coerce.number().min(60).max(250).optional().or(z.literal("")),
  diastolic: z.coerce.number().min(40).max(150).optional().or(z.literal("")),
  temperature: z.coerce.number().min(30).max(45).optional().or(z.literal("")),
  oxygenSaturation: z.coerce.number().min(50).max(100).optional().or(z.literal("")),
  bloodSugar: z.coerce.number().min(20).max(600).optional().or(z.literal("")),
  weight: z.coerce.number().min(1).max(500).optional().or(z.literal("")),
  notes: z.string().optional(),
}).refine(data => 
  data.heartRate || data.systolic || data.diastolic || 
  data.temperature || data.oxygenSaturation || 
  data.bloodSugar || data.weight || data.notes, 
{
  message: "At least one vital sign or note must be recorded.",
  path: ["notes"] // Attach to notes to show general error
});

export default function Vitals() {
  const { t } = useI18n();
  const queryClient = useQueryClient();
  const { data: vitals, isLoading } = useListVitals();
  const createVital = useCreateVital();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      heartRate: "",
      systolic: "",
      diastolic: "",
      temperature: "",
      oxygenSaturation: "",
      bloodSugar: "",
      weight: "",
      notes: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const submitData = {
      heartRate: values.heartRate ? Number(values.heartRate) : null,
      systolic: values.systolic ? Number(values.systolic) : null,
      diastolic: values.diastolic ? Number(values.diastolic) : null,
      temperature: values.temperature ? Number(values.temperature) : null,
      oxygenSaturation: values.oxygenSaturation ? Number(values.oxygenSaturation) : null,
      bloodSugar: values.bloodSugar ? Number(values.bloodSugar) : null,
      weight: values.weight ? Number(values.weight) : null,
      notes: values.notes || null,
    };

    createVital.mutate(
      { data: submitData },
      {
        onSuccess: () => {
          toast.success(t("success"));
          form.reset();
          queryClient.invalidateQueries({ queryKey: getListVitalsQueryKey() });
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

  // Prepare chart data (reverse to chronological order)
  const chartData = vitals
    ? [...vitals]
        .reverse()
        .filter(v => v.heartRate != null)
        .map(v => ({
          date: format(new Date(v.createdAt), "MMM d"),
          time: format(new Date(v.createdAt), "HH:mm"),
          heartRate: v.heartRate
        }))
    : [];

  return (
    <motion.div className="space-y-8" variants={container} initial="hidden" animate="show">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t("vitalSigns")}</h1>
        <p className="text-muted-foreground">Log and track your health metrics over time.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-12">
        <motion.div variants={item} className="md:col-span-5 lg:col-span-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5 text-primary" />
                {t("recordVitals")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="heartRate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-1">
                            <HeartPulse className="h-3 w-3 text-rose-500" />
                            HR
                          </FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="bpm" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <FormField
                        control={form.control}
                        name="systolic"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-1">
                              <Activity className="h-3 w-3 text-blue-500" />
                              BP (Sys)
                            </FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="mmHg" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="diastolic"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-transparent">Dia</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="mmHg" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="temperature"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-1">
                            <Thermometer className="h-3 w-3 text-amber-500" />
                            Temp
                          </FormLabel>
                          <FormControl>
                            <Input type="number" step="0.1" placeholder="°C" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="oxygenSaturation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-1">
                            <Droplets className="h-3 w-3 text-cyan-500" />
                            SpO2
                          </FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="%" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="bloodSugar"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-1">
                            <Activity className="h-3 w-3 text-purple-500" />
                            Sugar
                          </FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="mg/dL" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="weight"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-1">
                            <Scale className="h-3 w-3 text-emerald-500" />
                            Weight
                          </FormLabel>
                          <FormControl>
                            <Input type="number" step="0.1" placeholder="kg" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-1">
                          <FileText className="h-3 w-3 text-muted-foreground" />
                          {t("notes")}
                        </FormLabel>
                        <FormControl>
                          <Textarea placeholder="How are you feeling?" className="resize-none" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full" disabled={createVital.isPending}>
                    {createVital.isPending ? t("loading") : t("saveVitals")}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item} className="md:col-span-7 lg:col-span-8 space-y-6">
          {chartData.length > 1 && (
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <LineChartIcon className="h-5 w-5 text-primary" />
                  {t("recentHeartRate")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted-foreground)/0.2)" />
                      <XAxis 
                        dataKey="date" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                        dy={10}
                      />
                      <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                        domain={['dataMin - 10', 'dataMax + 10']}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          borderColor: 'hsl(var(--border))',
                          borderRadius: '0.5rem',
                          color: 'hsl(var(--foreground))'
                        }}
                        itemStyle={{ color: 'hsl(var(--primary))' }}
                        labelStyle={{ color: 'hsl(var(--muted-foreground))', marginBottom: '0.25rem' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="heartRate" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={3}
                        dot={{ r: 4, fill: 'hsl(var(--primary))', strokeWidth: 0 }}
                        activeDot={{ r: 6, fill: 'hsl(var(--primary))' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          )}

          <h2 className="text-xl font-semibold">{t("pastVitals")}</h2>
          
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-24 w-full" />
              ))}
            </div>
          ) : vitals && vitals.length > 0 ? (
            <div className="space-y-4">
              {vitals.map((vital) => (
                <Card key={vital.id} className="overflow-hidden">
                  <CardHeader className="bg-muted/30 py-3 border-b">
                    <CardTitle className="text-sm font-medium">
                      {format(new Date(vital.createdAt), "EEEE, MMMM d, yyyy 'at' h:mm a")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="flex flex-wrap gap-x-6 gap-y-4">
                      {vital.heartRate && (
                        <div className="space-y-1">
                          <span className="text-xs text-muted-foreground uppercase flex items-center gap-1"><HeartPulse className="h-3 w-3 text-rose-500" /> HR</span>
                          <span className="font-semibold">{vital.heartRate} <span className="text-xs font-normal text-muted-foreground">bpm</span></span>
                        </div>
                      )}
                      {(vital.systolic || vital.diastolic) && (
                        <div className="space-y-1">
                          <span className="text-xs text-muted-foreground uppercase flex items-center gap-1"><Activity className="h-3 w-3 text-blue-500" /> BP</span>
                          <span className="font-semibold">{vital.systolic || "--"}/{vital.diastolic || "--"} <span className="text-xs font-normal text-muted-foreground">mmHg</span></span>
                        </div>
                      )}
                      {vital.temperature && (
                        <div className="space-y-1">
                          <span className="text-xs text-muted-foreground uppercase flex items-center gap-1"><Thermometer className="h-3 w-3 text-amber-500" /> Temp</span>
                          <span className="font-semibold">{vital.temperature} <span className="text-xs font-normal text-muted-foreground">°C</span></span>
                        </div>
                      )}
                      {vital.oxygenSaturation && (
                        <div className="space-y-1">
                          <span className="text-xs text-muted-foreground uppercase flex items-center gap-1"><Droplets className="h-3 w-3 text-cyan-500" /> SpO2</span>
                          <span className="font-semibold">{vital.oxygenSaturation}<span className="text-xs font-normal text-muted-foreground">%</span></span>
                        </div>
                      )}
                      {vital.bloodSugar && (
                        <div className="space-y-1">
                          <span className="text-xs text-muted-foreground uppercase flex items-center gap-1"><Activity className="h-3 w-3 text-purple-500" /> Sugar</span>
                          <span className="font-semibold">{vital.bloodSugar} <span className="text-xs font-normal text-muted-foreground">mg/dL</span></span>
                        </div>
                      )}
                      {vital.weight && (
                        <div className="space-y-1">
                          <span className="text-xs text-muted-foreground uppercase flex items-center gap-1"><Scale className="h-3 w-3 text-emerald-500" /> Weight</span>
                          <span className="font-semibold">{vital.weight} <span className="text-xs font-normal text-muted-foreground">kg</span></span>
                        </div>
                      )}
                    </div>
                    {vital.notes && (
                      <div className="mt-4 pt-4 border-t border-border/50 text-sm text-muted-foreground flex gap-2">
                        <FileText className="h-4 w-4 shrink-0" />
                        <p>{vital.notes}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border-dashed border-2 bg-muted/20">
              <CardContent className="flex flex-col items-center justify-center h-48 text-center p-6">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <HeartPulse className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">{t("noVitals")}</h3>
                <p className="text-sm text-muted-foreground mt-1 max-w-sm">
                  Record your first vital signs using the form to start tracking your health.
                </p>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}