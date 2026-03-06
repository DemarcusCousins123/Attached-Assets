import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "@shared/routes";
import { useCreateDealRequest, useCreateVehicleRequest } from "@/hooks/use-deal-requests"; // Actually imported below from respective hooks
import { useCreateVehicleRequest as useVehicleCreate } from "@/hooks/use-vehicle-requests";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, Search, ShieldCheck, TrendingUp, DollarSign, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"analyze" | "find">("analyze");
  
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
                Upload your deal sheet or vehicle link, and our expert advisors will score the deal, check the market, and give you professional recommendations.
              </p>
            </motion.div>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Custom Tab Toggle */}
            <div className="flex justify-center mb-8">
              <div className="bg-muted p-1.5 rounded-2xl flex items-center shadow-inner">
                <button
                  onClick={() => setActiveTab("analyze")}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeTab === "analyze"
                      ? "bg-white dark:bg-slate-800 text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Calculator className="h-4 w-4" />
                  Analyze a Deal
                </button>
                <button
                  onClick={() => setActiveTab("find")}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeTab === "find"
                      ? "bg-white dark:bg-slate-800 text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Search className="h-4 w-4" />
                  Find Me a Car
                </button>
              </div>
            </div>

            <div className="glass-panel rounded-3xl p-6 md:p-10 relative overflow-hidden">
              <AnimatePresence mode="wait">
                {activeTab === "analyze" ? (
                  <motion.div
                    key="analyze"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <DealAnalyzerForm />
                  </motion.div>
                ) : (
                  <motion.div
                    key="find"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <VehicleRequestForm />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
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

function DealAnalyzerForm() {
  const { toast } = useToast();
  const createMutation = useCreateDealRequest();

  const form = useForm<z.infer<typeof api.dealRequests.create.input>>({
    resolver: zodResolver(api.dealRequests.create.input),
    defaultValues: {
      make: "", model: "", year: new Date().getFullYear(), mileage: 0, price: 0, location: "", url: ""
    }
  });

  const onSubmit = (data: z.infer<typeof api.dealRequests.create.input>) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        toast({
          title: "Deal Request Submitted!",
          description: "Our advisors are reviewing your deal. Check your dashboard for updates.",
        });
        form.reset();
      },
      onError: (err) => {
        toast({
          variant: "destructive",
          title: "Error submitting deal",
          description: err.message,
        });
      }
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-foreground">Analyze Your Deal</h3>
        <p className="text-muted-foreground mt-1">Enter the vehicle details to get a comprehensive deal score.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="make" className="text-slate-600 dark:text-slate-300">Make</Label>
          <Input id="make" placeholder="e.g. Toyota" className="bg-white dark:bg-slate-950 h-12 rounded-xl" {...form.register("make")} />
          {form.formState.errors.make && <p className="text-sm text-destructive">{form.formState.errors.make.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="model" className="text-slate-600 dark:text-slate-300">Model</Label>
          <Input id="model" placeholder="e.g. Camry" className="bg-white dark:bg-slate-950 h-12 rounded-xl" {...form.register("model")} />
          {form.formState.errors.model && <p className="text-sm text-destructive">{form.formState.errors.model.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label htmlFor="year" className="text-slate-600 dark:text-slate-300">Year</Label>
          <Input id="year" type="number" placeholder="2024" className="bg-white dark:bg-slate-950 h-12 rounded-xl" {...form.register("year")} />
          {form.formState.errors.year && <p className="text-sm text-destructive">{form.formState.errors.year.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="mileage" className="text-slate-600 dark:text-slate-300">Mileage</Label>
          <Input id="mileage" type="number" placeholder="15000" className="bg-white dark:bg-slate-950 h-12 rounded-xl" {...form.register("mileage")} />
          {form.formState.errors.mileage && <p className="text-sm text-destructive">{form.formState.errors.mileage.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="price" className="text-slate-600 dark:text-slate-300">Dealer Price ($)</Label>
          <Input id="price" type="number" placeholder="25000" className="bg-white dark:bg-slate-950 h-12 rounded-xl" {...form.register("price")} />
          {form.formState.errors.price && <p className="text-sm text-destructive">{form.formState.errors.price.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="location" className="text-slate-600 dark:text-slate-300">Location (Zip or City)</Label>
          <Input id="location" placeholder="90210" className="bg-white dark:bg-slate-950 h-12 rounded-xl" {...form.register("location")} />
          {form.formState.errors.location && <p className="text-sm text-destructive">{form.formState.errors.location.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="url" className="text-slate-600 dark:text-slate-300">Listing URL (Optional)</Label>
          <Input id="url" placeholder="https://..." className="bg-white dark:bg-slate-950 h-12 rounded-xl" {...form.register("url")} />
          {form.formState.errors.url && <p className="text-sm text-destructive">{form.formState.errors.url.message}</p>}
        </div>
      </div>

      <Button 
        type="submit" 
        disabled={createMutation.isPending}
        className="w-full h-14 text-lg rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 mt-4 font-semibold"
      >
        {createMutation.isPending ? "Analyzing..." : "Analyze This Deal"}
      </Button>
    </form>
  );
}

function VehicleRequestForm() {
  const { toast } = useToast();
  const createMutation = useVehicleCreate();

  const form = useForm<z.infer<typeof api.vehicleRequests.create.input>>({
    resolver: zodResolver(api.vehicleRequests.create.input),
    defaultValues: {
      budgetRange: "", preferredMakeModel: "", vehicleType: "", maxMileage: 50000, yearRange: "", location: "", notes: ""
    }
  });

  const onSubmit = (data: z.infer<typeof api.vehicleRequests.create.input>) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        toast({
          title: "Vehicle Request Submitted!",
          description: "Our team will start sourcing vehicles that match your criteria.",
        });
        form.reset();
      },
      onError: (err) => {
        toast({
          variant: "destructive",
          title: "Error submitting request",
          description: err.message,
        });
      }
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-foreground">Find Me a Car</h3>
        <p className="text-muted-foreground mt-1">Tell us what you're looking for and we'll handle the sourcing and negotiation.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="preferredMakeModel" className="text-slate-600 dark:text-slate-300">Preferred Make/Model</Label>
          <Input id="preferredMakeModel" placeholder="e.g. BMW RAV4 or Similar" className="bg-white dark:bg-slate-950 h-12 rounded-xl" {...form.register("preferredMakeModel")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="vehicleType" className="text-slate-600 dark:text-slate-300">Vehicle Type</Label>
          <Input id="vehicleType" placeholder="SUV, Sedan, Truck..." className="bg-white dark:bg-slate-950 h-12 rounded-xl" {...form.register("vehicleType")} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="budgetRange" className="text-slate-600 dark:text-slate-300">Budget Range</Label>
          <Input id="budgetRange" placeholder="$30k - $40k" className="bg-white dark:bg-slate-950 h-12 rounded-xl" {...form.register("budgetRange")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="yearRange" className="text-slate-600 dark:text-slate-300">Acceptable Years</Label>
          <Input id="yearRange" placeholder="2018 - 2024" className="bg-white dark:bg-slate-950 h-12 rounded-xl" {...form.register("yearRange")} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="maxMileage" className="text-slate-600 dark:text-slate-300">Max Mileage</Label>
          <Input id="maxMileage" type="number" placeholder="50000" className="bg-white dark:bg-slate-950 h-12 rounded-xl" {...form.register("maxMileage")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location2" className="text-slate-600 dark:text-slate-300">Your Location</Label>
          <Input id="location2" placeholder="Austin, TX" className="bg-white dark:bg-slate-950 h-12 rounded-xl" {...form.register("location")} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes" className="text-slate-600 dark:text-slate-300">Additional Requirements (Colors, Packages, etc.)</Label>
        <Textarea id="notes" placeholder="Must have leather seats and apple carplay..." className="bg-white dark:bg-slate-950 min-h-[100px] rounded-xl resize-none" {...form.register("notes")} />
      </div>

      <Button 
        type="submit" 
        disabled={createMutation.isPending}
        className="w-full h-14 text-lg rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 mt-4 font-semibold"
      >
        {createMutation.isPending ? "Submitting..." : "Submit Vehicle Request"}
      </Button>
    </form>
  );
}
