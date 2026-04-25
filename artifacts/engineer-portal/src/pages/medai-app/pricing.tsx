import { useI18n } from "@/lib/i18n";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Star } from "lucide-react";
import { motion } from "framer-motion";

export default function Pricing() {
  const { t } = useI18n();

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const tiers = [
    {
      name: t("free"),
      price: "$0",
      description: "Basic health tracking and limited AI consultations.",
      features: [
        "Up to 5 symptom checks/month",
        "Up to 10 drug interaction checks",
        "Basic vital signs logging",
        "Standard AI Assistant responses"
      ],
      popular: false,
      buttonText: "Current Plan",
      buttonVariant: "outline" as const
    },
    {
      name: t("pro"),
      price: "$12",
      description: "Advanced health intelligence for individuals.",
      features: [
        "Unlimited symptom checks",
        "Unlimited drug interaction checks",
        "Advanced vitals tracking with insights",
        "Priority AI Assistant responses",
        "Export health reports",
        "Personalized health tips"
      ],
      popular: true,
      buttonText: "Upgrade to Pro",
      buttonVariant: "default" as const
    },
    {
      name: t("clinic"),
      price: "$49",
      description: "Professional tools for families and caretakers.",
      features: [
        "Everything in Pro",
        "Up to 5 family profiles",
        "Connect with real doctors (coming soon)",
        "API access",
        "Advanced historical analysis",
        "24/7 Priority support"
      ],
      popular: false,
      buttonText: "Contact Sales",
      buttonVariant: "outline" as const
    }
  ];

  return (
    <motion.div className="space-y-12 max-w-6xl mx-auto py-8" variants={container} initial="hidden" animate="show">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Simple, transparent pricing</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Choose the right health intelligence plan for you. Upgrade or downgrade at any time.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3 items-start">
        {tiers.map((tier, i) => (
          <motion.div key={i} variants={item} className="relative h-full">
            {tier.popular && (
              <div className="absolute -top-4 left-0 right-0 flex justify-center z-10">
                <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                  <Star className="h-3 w-3 fill-current" />
                  Most Popular
                </span>
              </div>
            )}
            <Card className={`h-full flex flex-col ${tier.popular ? 'border-primary shadow-md relative' : ''}`}>
              <CardHeader className="text-center pb-8 pt-8">
                <CardTitle className="text-2xl mb-2">{tier.name}</CardTitle>
                <div className="flex justify-center items-baseline">
                  <span className="text-5xl font-extrabold">{tier.price}</span>
                  <span className="text-muted-foreground ml-1">{t("perMonth")}</span>
                </div>
                <CardDescription className="mt-4">{tier.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-4">
                  {tier.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <CheckCircle2 className={`h-5 w-5 shrink-0 ${tier.popular ? 'text-primary' : 'text-muted-foreground'}`} />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="pt-8">
                <Button className="w-full" variant={tier.buttonVariant} size="lg">
                  {tier.buttonText}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}