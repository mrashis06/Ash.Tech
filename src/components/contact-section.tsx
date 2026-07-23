'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Send, ArrowUpRight, CheckCircle2, Mail, Github, Linkedin } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export function ContactSection() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error('Something went wrong.');
      toast({
        title: "Message Sent! 🎉",
        description: "Thank you for reaching out. I'll get back to you shortly.",
      });
      setSent(true);
      form.reset();
      setTimeout(() => setSent(false), 3500);
    } catch {
      toast({
        title: "Oh no!",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact" className="w-full py-24 md:py-36 bg-background border-t border-border/30">
      <div className="container px-4 md:px-6 max-w-3xl mx-auto">
        
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <span className="text-xs font-mono font-semibold tracking-widest text-primary uppercase mb-3 block">
            Contact
          </span>
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl font-headline text-foreground">
            Let&apos;s Work Together
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto mt-3 font-sans leading-relaxed">
            Have a project in mind, an engineering role opportunity, or just want to say hello? Drop a message below.
          </p>
        </motion.div>

        {/* Minimal Classic Hairline Form (Zero Cards / Zero Shimmer) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
              
              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10">
                {/* Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-xs font-mono font-semibold text-muted-foreground tracking-wider uppercase">
                        Your Name
                      </FormLabel>
                      <FormControl>
                        <input
                          type="text"
                          placeholder="Ashis Kumar Rai"
                          {...field}
                          disabled={isSubmitting}
                          className="w-full bg-transparent border-b border-border/50 focus:border-foreground text-foreground placeholder:text-muted-foreground/40 text-sm sm:text-base py-2.5 outline-none transition-colors font-sans rounded-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-xs font-mono font-semibold text-muted-foreground tracking-wider uppercase">
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <input
                          type="email"
                          placeholder="your.email@example.com"
                          {...field}
                          disabled={isSubmitting}
                          className="w-full bg-transparent border-b border-border/50 focus:border-foreground text-foreground placeholder:text-muted-foreground/40 text-sm sm:text-base py-2.5 outline-none transition-colors font-sans rounded-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Message */}
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-xs font-mono font-semibold text-muted-foreground tracking-wider uppercase">
                      Your Message
                    </FormLabel>
                    <FormControl>
                      <textarea
                        rows={4}
                        placeholder="Tell me about your project, idea, or role opportunity..."
                        {...field}
                        disabled={isSubmitting}
                        className="w-full bg-transparent border-b border-border/50 focus:border-foreground text-foreground placeholder:text-muted-foreground/40 text-sm sm:text-base py-2.5 outline-none transition-colors font-sans resize-none rounded-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit CTA — Center Aligned */}
              <div className="pt-6 flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting || sent}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-3.5 rounded-full bg-foreground text-background font-bold text-sm hover:opacity-90 transition-all shadow-md cursor-pointer active:scale-95"
                >
                  <AnimatePresence mode="wait">
                    {sent ? (
                      <motion.span
                        key="sent"
                        className="flex items-center gap-2 text-emerald-600"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Message Sent!</span>
                      </motion.span>
                    ) : (
                      <motion.span
                        key="send"
                        className="flex items-center gap-2"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                      >
                        <span>Send Message</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>

            </form>
          </Form>
        </motion.div>

      </div>
    </section>
  );
}
