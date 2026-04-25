import { useI18n } from "@/lib/i18n";
import { useGetProfile, useUpdateProfile, getGetProfileQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { User, Save, HeartPulse, Stethoscope, Clock, ShieldAlert } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const formSchema = z.object({
  fullName: z.string().optional(),
  age: z.coerce.number().min(0).max(150).optional().or(z.literal("")),
  gender: z.enum(["male", "female", "other"]).optional().or(z.literal("")),
  height: z.coerce.number().min(0).max(300).optional().or(z.literal("")),
  weight: z.coerce.number().min(0).max(500).optional().or(z.literal("")),
  bloodType: z.string().optional(),
  allergies: z.string().optional(),
  chronicConditions: z.string().optional(),
  currentMedications: z.string().optional(),
});

export default function Profile() {
  const { t } = useI18n();
  const queryClient = useQueryClient();
  const { data: profile, isLoading } = useGetProfile();
  const updateProfile = useUpdateProfile();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      age: "",
      gender: "",
      height: "",
      weight: "",
      bloodType: "",
      allergies: "",
      chronicConditions: "",
      currentMedications: "",
    },
  });

  const isInitialized = useRef(false);

  useEffect(() => {
    if (profile && !isInitialized.current) {
      form.reset({
        fullName: profile.fullName || "",
        age: profile.age ?? "",
        gender: profile.gender || "",
        height: profile.height ?? "",
        weight: profile.weight ?? "",
        bloodType: profile.bloodType || "",
        allergies: profile.allergies || "",
        chronicConditions: profile.chronicConditions || "",
        currentMedications: profile.currentMedications || "",
      });
      isInitialized.current = true;
    }
  }, [profile, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const dataToSubmit = {
      fullName: values.fullName || null,
      age: values.age ? Number(values.age) : null,
      gender: (values.gender === "male" || values.gender === "female" || values.gender === "other") ? values.gender : null,
      height: values.height ? Number(values.height) : null,
      weight: values.weight ? Number(values.weight) : null,
      bloodType: values.bloodType || null,
      allergies: values.allergies || null,
      chronicConditions: values.chronicConditions || null,
      currentMedications: values.currentMedications || null,
    };

    updateProfile.mutate(
      { data: dataToSubmit },
      {
        onSuccess: (updatedProfile) => {
          toast.success(t("success"));
          queryClient.setQueryData(getGetProfileQueryKey(), updatedProfile);
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

  if (isLoading) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        <div>
          <Skeleton className="h-10 w-48 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="grid gap-6 md:grid-cols-2">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i}>
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </div>
            <Skeleton className="h-10 w-32 mt-6" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <motion.div className="space-y-6 max-w-4xl mx-auto" variants={container} initial="hidden" animate="show">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <User className="h-8 w-8 text-primary" />
          {t("healthProfile")}
        </h1>
        <p className="text-muted-foreground mt-1">Manage your personal and medical information.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          
          {/* Personal Info */}
          <motion.div variants={item}>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Personal Information</CardTitle>
                <CardDescription>Basic details used for health calculations.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("fullName")}</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("age")}</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="30" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("gender")}</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value as string}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Physical & Medical Info */}
          <motion.div variants={item}>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <HeartPulse className="h-5 w-5 text-primary" />
                  Physical & Blood Type
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6 md:grid-cols-3">
                <FormField
                  control={form.control}
                  name="height"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("height")}</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="175" {...field} />
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
                      <FormLabel>{t("weight")}</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="70" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bloodType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("bloodType")}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="A+">A+</SelectItem>
                          <SelectItem value="A-">A-</SelectItem>
                          <SelectItem value="B+">B+</SelectItem>
                          <SelectItem value="B-">B-</SelectItem>
                          <SelectItem value="AB+">AB+</SelectItem>
                          <SelectItem value="AB-">AB-</SelectItem>
                          <SelectItem value="O+">O+</SelectItem>
                          <SelectItem value="O-">O-</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </motion.div>

          {/* Health History */}
          <motion.div variants={item}>
            <Card className="border-l-4 border-l-amber-500">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <ShieldAlert className="h-5 w-5 text-amber-500" />
                  Health History
                </CardTitle>
                <CardDescription>Important information for AI analysis and interactions.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <FormField
                  control={form.control}
                  name="allergies"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("allergies")}</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Peanuts, Penicillin..." className="resize-none" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="chronicConditions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("chronicConditions")}</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Asthma, Type 2 Diabetes..." className="resize-none" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="currentMedications"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("currentMedications")}</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Aspirin 81mg daily..." className="resize-none" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item} className="flex justify-end">
            <Button type="submit" size="lg" disabled={updateProfile.isPending}>
              <Save className="mr-2 h-5 w-5" />
              {updateProfile.isPending ? t("loading") : t("saveProfile")}
            </Button>
          </motion.div>
        </form>
      </Form>
    </motion.div>
  );
}