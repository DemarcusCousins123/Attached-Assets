import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "@shared/routes";
import { useCreateContactMessage } from "@/hooks/use-contact-messages";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function Contact() {
  const { toast } = useToast();
  const createMutation = useCreateContactMessage();

  const form = useForm<z.infer<typeof api.contactMessages.create.input>>({
    resolver: zodResolver(api.contactMessages.create.input),
    defaultValues: {
      name: "", email: "", phone: "", subject: "", message: ""
    }
  });

  const onSubmit = (data: z.infer<typeof api.contactMessages.create.input>) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        toast({
          title: "Message Sent!",
          description: "Our team will get back to you shortly.",
        });
        form.reset();
      },
      onError: (err) => {
        toast({
          variant: "destructive",
          title: "Error sending message",
          description: err.message,
        });
      }
    });
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
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-xl">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-foreground">Email Us</h4>
                  <p className="text-muted-foreground">hello@apexautoadvisory.com</p>
                  <p className="text-sm text-slate-500 mt-1">We aim to reply within 4 hours.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-xl">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-foreground">Call Us</h4>
                  <p className="text-muted-foreground">(555) 123-4567</p>
                  <p className="text-sm text-slate-500 mt-1">Mon-Fri from 8am to 6pm PST.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-xl">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-foreground">Office</h4>
                  <p className="text-muted-foreground">San Francisco, CA</p>
                  <p className="text-sm text-slate-500 mt-1">Available nationwide remotely.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-10 border border-border shadow-xl">
            <h3 className="text-2xl font-bold text-foreground mb-8">Send a Message</h3>
            
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input id="name" placeholder="John Doe" className="h-12 rounded-xl" {...form.register("name")} />
                  {form.formState.errors.name && <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="john@example.com" className="h-12 rounded-xl" {...form.register("email")} />
                  {form.formState.errors.email && <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number (Optional)</Label>
                  <Input id="phone" placeholder="(555) 000-0000" className="h-12 rounded-xl" {...form.register("phone")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="How can we help?" className="h-12 rounded-xl" {...form.register("subject")} />
                  {form.formState.errors.subject && <p className="text-sm text-destructive">{form.formState.errors.subject.message}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Type your message here..." className="min-h-[150px] rounded-xl resize-none" {...form.register("message")} />
                {form.formState.errors.message && <p className="text-sm text-destructive">{form.formState.errors.message.message}</p>}
              </div>

              <Button 
                type="submit" 
                disabled={createMutation.isPending}
                className="w-full h-14 text-lg rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 font-semibold"
              >
                {createMutation.isPending ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
