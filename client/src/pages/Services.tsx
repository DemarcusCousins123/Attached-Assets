import { motion } from "framer-motion";
import { Check, Search, TrendingUp, Handshake, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function Services() {
  const { toast } = useToast();

  const handleBuy = (plan: string) => {
    toast({
      title: `${plan} Selected`,
      description: "Our team will reach out to you to finalize the details. Payment is required only after we find your car or help you get a good deal!",
    });
  };

  const tiers = [
    {
      name: "Basic Deal Analysis",
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

  const findingProcess = [
    {
      icon: <FileText className="h-8 w-8 text-primary" />,
      title: "We Review Your Criteria",
      description: "You tell us exactly what you're looking for—budget, make/model, features, location, and any must-haves. We dive deep to understand your needs."
    },
    {
      icon: <Search className="h-8 w-8 text-primary" />,
      title: "We Search the Market",
      description: "We scour nationwide inventory across dealerships, auctions, and private sellers to find vehicles that match your requirements."
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-primary" />,
      title: "We Analyze Each Deal",
      description: "Every vehicle we find gets a full deal analysis. We check market value, hidden fees, condition reports, and flag any red flags."
    },
    {
      icon: <Handshake className="h-8 w-8 text-primary" />,
      title: "We Negotiate for You",
      description: "We handle the back-and-forth with dealers to get you the best price, favorable terms, and a solid warranty."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6" style={{ fontFamily: "var(--font-display)" }}>
            Our Services
          </h1>
          <p className="text-xl text-muted-foreground">
            Expert automotive advisory tailored to your needs. Whether you're reviewing a deal, looking for a car, or need us to find the perfect vehicle for you.
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
                <p className="text-muted-foreground text-sm">{tier.description}</p>
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="h-5 w-5 text-primary shrink-0 mr-3" />
                    <span className="text-slate-600 dark:text-slate-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* How We Find Cars Section */}
        <div className="mt-32 pt-20 border-t border-border">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">Our Vehicle Sourcing Process</h2>
            <p className="text-lg text-muted-foreground">
              When you choose Vehicle Sourcing, here's exactly what we do to find your perfect car.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {findingProcess.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-border"
              >
                <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                  {step.icon}
                </div>
                <h3 className="text-lg font-bold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Pricing Disclaimer */}
        <div className="mt-32 pt-20 border-t border-border">
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 max-w-3xl mx-auto text-center">
            <p className="text-lg text-foreground font-semibold mb-3">
              💡 Pricing Information
            </p>
            <p className="text-muted-foreground">
              Pricing for all services will be provided once we've matched you with a vehicle or completed your deal analysis. We charge only after we deliver results—when you get your car or finalize a deal on the vehicle you want.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
