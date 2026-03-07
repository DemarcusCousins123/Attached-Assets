import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function Services() {
  const { toast } = useToast();

  const handleBuy = (plan: string) => {
    toast({
      title: `${plan} Selected`,
      description: "Our team will reach out to you to finalize the details. Payment is required only after you get your car!",
    });
  };

  const tiers = [
    {
      name: "Basic Deal Analysis",
      price: "$29",
      description: "A quick, data-driven review of your dealer quote.",
      features: [
        "Market value comparison",
        "Dealer fee audit",
        "Lease vs Buy breakdown",
        "24-hour turnaround"
      ],
      popular: false
    },
    {
      name: "Full Deal Review",
      price: "$79",
      description: "Comprehensive analysis with negotiation strategy.",
      features: [
        "Everything in Basic",
        "Target counter-offer numbers",
        "Trade-in value assessment",
        "Direct email support",
        "4-hour expedited turnaround"
      ],
      popular: true
    },
    {
      name: "Vehicle Sourcing",
      price: "$149",
      description: "We find the perfect car for you based on your criteria.",
      features: [
        "Detailed criteria assessment",
        "Multi-state vehicle search",
        "Deal analysis on found vehicles",
        "Negotiation support",
        "Nationwide inventory access"
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6" style={{ fontFamily: "var(--font-display)" }}>
            Advisory Services
          </h1>
          <p className="text-xl text-muted-foreground">
            Transparent pricing. Data-backed insights. Choose the level of support you need to secure the best car deal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers.map((tier, idx) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className={`relative bg-white dark:bg-slate-900 rounded-3xl p-8 border ${
                tier.popular ? "border-primary shadow-xl shadow-primary/10" : "border-border shadow-md"
              } flex flex-col`}
            >
              {tier.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-primary text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-xl font-bold text-foreground mb-2">{tier.name}</h3>
                <p className="text-muted-foreground text-sm h-10">{tier.description}</p>
                <div className="mt-6 flex items-baseline text-5xl font-extrabold">
                  {tier.price}
                  <span className="ml-1 text-xl font-medium text-muted-foreground">/deal</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="h-5 w-5 text-primary shrink-0 mr-3" />
                    <span className="text-slate-600 dark:text-slate-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                onClick={() => handleBuy(tier.name)}
                variant={tier.popular ? "default" : "outline"}
                className={`w-full h-12 rounded-xl text-base font-semibold transition-all duration-300 ${
                  tier.popular ? "shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-0.5" : ""
                }`}
              >
                Reserve Now
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
