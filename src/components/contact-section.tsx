'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { ArrowUpRight, CheckCircle2, Loader2, Sparkles, RefreshCw } from "lucide-react";
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

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      // Ensure hidden iframe exists for silent background submission
      let iframe = document.getElementById('hidden_iframe') as HTMLIFrameElement;
      if (!iframe) {
        iframe = document.createElement('iframe');
        iframe.id = 'hidden_iframe';
        iframe.name = 'hidden_iframe';
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
      }

      // Silent FormSubmit post target
      const formEl = document.createElement('form');
      formEl.action = 'https://formsubmit.co/sdjod.in@gmail.com';
      formEl.method = 'POST';
      formEl.target = 'hidden_iframe';

      const fields: Record<string, string> = {
        name: values.name,
        email: values.email,
        message: values.message,
        _subject: `New Portfolio Message from ${values.name}`,
        _captcha: 'false',
        _template: 'table',
      };

      Object.entries(fields).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value;
        formEl.appendChild(input);
      });

      document.body.appendChild(formEl);
      formEl.submit();
      
      setSent(true);
      form.reset();
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
    <section id="contact" className="w-full py-24 md:py-36 bg-background border-t border-border/30 relative">

      <div className="container px-4 md:px-6 max-w-3xl mx-auto relative z-10">
        
        {/* Section Header */}
        <motion.div
          className="text-center mb-14 md:mb-20"
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <span className="text-xs font-mono font-semibold tracking-widest text-primary uppercase mb-3 block">
            Get In Touch
          </span>
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl font-headline text-foreground">
            Let&apos;s Work Together
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto mt-3 font-sans leading-relaxed">
            Have a project in mind, an engineering role opportunity, or just want to say hello? Drop a message below.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {sent ? (
            /* ══ Great Success Confirmation Card ══ */
            <motion.div
              key="success-card"
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: -16 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full p-8 sm:p-12 rounded-3xl bg-[#070709] border border-emerald-500/30 text-center space-y-6 shadow-2xl relative overflow-hidden"
            >
              {/* Top Pulse Icon */}
              <div className="relative inline-flex items-center justify-center p-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-20" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-extrabold font-headline tracking-tight text-white">
                  Message Delivered! 🎉
                </h3>
                <p className="text-zinc-400 text-sm sm:text-base max-w-md mx-auto font-sans leading-relaxed">
                  Thank you for reaching out! Your message has been sent directly to my inbox. I will review it and reply back shortly.
                </p>
              </div>

              {/* Send Another Message Button */}
              <div className="pt-4 flex justify-center">
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 text-xs sm:text-sm font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4 text-primary" />
                  <span>Send Another Message</span>
                </button>
              </div>
            </motion.div>
          ) : (
            /* ══ Minimal Classic Hairline Form ══ */
            <motion.div
              key="contact-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
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

                  {/* Submit CTA with Real Animation & Spinner */}
                  <div className="pt-6 flex justify-center">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-10 py-3.5 rounded-full bg-foreground text-background font-extrabold text-sm shadow-lg hover:shadow-xl transition-all cursor-pointer disabled:opacity-75"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-background" />
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </>
                      )}
                    </motion.button>
                  </div>

                </form>
              </Form>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
