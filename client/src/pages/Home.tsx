import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ShieldCheck, TrendingUp, DollarSign, CheckCircle2 } from "lucide-react";

export default function Home() {
  const [, navigate] = useLocation();
  
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background -z-10" />
        <div className="absolute right-0 top-20 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -z-10" />
        <div className="absolute left-10 bottom-20 w-72 h-72 bg-blue-400/10 rounded-full blur-[80px] -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <ShieldCheck className="h-4 w-4" /> Trusted Automotive Advisors
              </span>
              <h1 className="text-5xl md:text-6xl font-extrabold text-foreground tracking-tight mb-6 leading-tight">
                Know If Your Car Deal Is <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Good</span> Before You Buy.
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed">
                Submit your car details or upload a deal sheet to CarConnects. Our expert advisors will analyze the market, score the deal, and give you professional recommendations. No upfront payment required—pay only after we find you a car.
              </p>
            </motion.div>
          </div>

          <div className="max-w-2xl mx-auto">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              onClick={() => navigate("/contact")}
              className="w-full bg-primary text-white font-semibold py-4 rounded-2xl text-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-primary/25"
            >
              Start Your Request
            </motion.button>
            <p className="text-center text-muted-foreground mt-4 text-sm">
              Tell us about your deal or the car you're looking for, and we'll be in touch shortly.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-slate-900 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4" style={{ fontFamily: "var(--font-display)" }}>
              Data-Driven Confidence
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We leverage market data and industry expertise to ensure you never overpay for a vehicle again.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: <TrendingUp className="h-8 w-8 text-primary" />,
                title: "Market Comparison",
                desc: "We compare your specific vehicle against thousands of similar listings to find its true value."
              },
              {
                icon: <DollarSign className="h-8 w-8 text-primary" />,
                title: "Hidden Fee Check",
                desc: "Our advisors review deal sheets to spot bogus add-ons, inflated rates, and hidden fees."
              },
              {
                icon: <CheckCircle2 className="h-8 w-8 text-primary" />,
                title: "Actionable Advice",
                desc: "Get a clear 'Buy', 'Negotiate', or 'Walk Away' recommendation with target numbers."
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-8 border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="bg-white dark:bg-slate-800 w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm border border-border mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
