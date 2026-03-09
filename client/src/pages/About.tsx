import { motion } from "framer-motion";
import { Heart, Target, Zap } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-background py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-foreground mb-6">Our Story</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're two high school students united by a shared passion for cars.
          </p>
        </motion.div>

        {/* Main Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 border border-border shadow-lg mb-16"
        >
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              Like most people searching for their first vehicle, we spent countless hours scrolling through listings, comparing options, and trying to make sense of an overwhelming process — and that frustration sparked an idea.
            </p>
            <p>
              What if we could make that experience easier for someone else?
            </p>
            <p>
              That question became the foundation of our business. We built something we wish had existed when we started our own search: a service dedicated to helping people find a car they'll genuinely love — not just settle for.
            </p>
            <p className="font-semibold text-foreground">
              We're just getting started, but our passion for cars and commitment to our customers drives everything we do.
            </p>
          </div>
        </motion.div>

        {/* Values Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Heart className="h-8 w-8 text-primary" />,
              title: "Passion",
              description: "We love cars and we care about getting you the right one."
            },
            {
              icon: <Target className="h-8 w-8 text-primary" />,
              title: "Honesty",
              description: "We're transparent about deals and never steer you wrong."
            },
            {
              icon: <Zap className="h-8 w-8 text-primary" />,
              title: "Hustle",
              description: "We work hard to find you the best vehicles at the best prices."
            }
          ].map((value, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
              className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-8 border border-border text-center"
            >
              <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                {value.icon}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">{value.title}</h3>
              <p className="text-muted-foreground">{value.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-20 text-center"
        >
          <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Find Your Perfect Car?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Whether you need us to analyze a deal, find you a vehicle, or both — we're here to make the car-buying experience easier.
          </p>
          <a
            href="/contact"
            className="inline-block bg-primary text-white font-semibold py-3 px-8 rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300 shadow-md shadow-primary/25"
          >
            Get Started
          </a>
        </motion.div>
      </div>
    </div>
  );
}
