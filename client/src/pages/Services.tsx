import { motion } from "framer-motion";
import { Check, Search, TrendingUp, Handshake, FileText } from "lucide-react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";

export default function Services() {
  const [, navigate] = useLocation();

  const tiers = [
    {
      name: "Basic Deal Check",
      price: "$30",
      description: "Perfect for buyers who want a quick evaluation.",
      features: [
        "Price fairness analysis",
        "Market comparison with similar listings",
        "Basic vehicle value estimate",
        "Short written recommendation",
        "Respond within 24-48 hours"
      ],
      popular: false
    },
    {
      name: "Smart Buyer Review",
      price: "$55",
      description: "Best for buyers seriously considering a vehicle.",
      features: [
        "Full deal evaluation",
        "Market price analysis",
        "Vehicle reliability overview",
        "Ownership cost estimate",
        "Negotiation price target",
        "Respond within 12 hours"
      ],
      popular: true
    },
    {
      name: "Premium Car Consultation",
      price: "$75",
      description: "Complete guidance before purchasing a vehicle.",
      features: [
        "Everything in Smart Buyer Review",
        "Personalized vehicle recommendations",
        "Comparison of multiple listings",
        "Negotiation strategy",
        "One-on-one consultation"
      ],
      popular: false
    },
    {
      name: "Custom Search Service",
      price: "$50",
      description: "We help find the right car for you.",
      features: [
        "Personalized car search based on your needs",
        "Curated vehicle listings",
        "Market value analysis for each option",
        "Purchase strategy consultation"
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
      title: "We Advise on Negotiation",
      description: "We suggest exactly what you should negotiate with the dealers to get you the best price, favorable terms, and a solid warranty."
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

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 max-w-6xl mx-auto">
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

              <div className="mb-6">
                <h3 className="text-lg font-bold text-foreground mb-1">{tier.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{tier.description}</p>
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-extrabold text-foreground">{tier.price}</span>
                  <span className="text-muted-foreground text-sm mb-1">/ service</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="h-4 w-4 text-primary shrink-0 mr-2 mt-0.5" />
                    <span className="text-slate-600 dark:text-slate-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => navigate("/contact")}
                variant={tier.popular ? "default" : "outline"}
                className="w-full rounded-xl"
                data-testid={`button-get-started-${idx}`}
              >
                Get Started
              </Button>
            </motion.div>
          ))}
        </div>

        {/* How We Find Cars Section */}
        <div className="mt-32 pt-20 border-t border-border">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">Our Vehicle Sourcing Process</h2>
            <p className="text-lg text-muted-foreground">
              When you choose Custom Search Service, here's exactly what we do to find your perfect car.
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

        {/* CTA */}
        <div className="mt-24 text-center">
          <p className="text-muted-foreground mb-6 text-lg">Ready to get started? Reach out and we'll take it from there.</p>
          <Button
            size="lg"
            onClick={() => navigate("/contact")}
            className="rounded-xl px-10 shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 font-semibold"
            data-testid="button-contact-cta"
          >
            Contact Us
          </Button>
        </div>
      </div>
    </div>
  );
}
