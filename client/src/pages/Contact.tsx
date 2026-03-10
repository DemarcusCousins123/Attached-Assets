import { useState } from "react";
import { MapPin, Mail, Phone, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("gvclips11@gmail.com");
    setCopied(true);
    toast({
      title: "Email copied!",
      description: "Paste it into your email client.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Contact Info */}
          <div>
            <h1 className="text-4xl font-extrabold text-foreground mb-6" style={{ fontFamily: "var(--font-display)" }}>
              Get in Touch
            </h1>
            <p className="text-lg text-muted-foreground mb-10">
              Have questions about a specific deal or want to learn more about our sourcing process? We're here to help.
            </p>

            <div className="space-y-8">
              <div className="bg-slate-50 dark:bg-slate-800/30 rounded-2xl p-6 border border-border">
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-primary/10 p-3 rounded-xl">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-foreground">Email Us</h4>
                    <p className="text-muted-foreground">gvclips11@gmail.com</p>
                  </div>
                </div>
                <div className="flex gap-3 ml-16">
                  <Button 
                    asChild
                    size="sm"
                    className="rounded-lg"
                  >
                    <a href="mailto:gvclips11@gmail.com">
                      Open Email Client
                    </a>
                  </Button>
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={copyEmail}
                    className="rounded-lg"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 mr-2" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-2" /> Copy Email
                      </>
                    )}
                  </Button>
                </div>
              </div>
              
              <a href="tel:9085308897" className="flex items-start gap-4 group">
                <div className="bg-primary/10 p-3 rounded-xl group-hover:bg-primary/20 transition-colors">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">Call Us</h4>
                  <p className="text-muted-foreground group-hover:text-primary/80 transition-colors">908-530-8897</p>
                  <p className="text-sm text-slate-500 mt-1">Mon-Fri from 9am to 6pm EST.</p>
                </div>
              </a>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-xl">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-foreground">Location</h4>
                  <p className="text-muted-foreground">Central New Jersey</p>
                  <p className="text-sm text-slate-500 mt-1">Serving nationwide.</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-10 border border-border shadow-xl flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-foreground mb-6">Ready to Get Started?</h3>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Tell us about your deal or the car you're looking for. Click the button below to send us an email with your details, and our team will get back to you shortly.
            </p>
            
            <Button 
              asChild
              className="w-full h-14 text-lg rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 font-semibold"
            >
              <a href="mailto:gvclips11@gmail.com?subject=CarConnects%20Request">
                Send Us Your Details
              </a>
            </Button>
            
            <p className="text-center text-sm text-slate-500 mt-6">
              Or you can also reach us by phone at 908-530-8897
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
