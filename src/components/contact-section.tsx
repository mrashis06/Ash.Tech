
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Send, Mail, Sparkles } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

/* ── animation variants ── */
const cardVariant = {
  hidden: { opacity: 0, y: 48, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.65, type: 'spring', bounce: 0.3 } },
};

const fieldVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const fieldItem = {
  hidden: { opacity: 0, x: -18 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, type: 'spring', bounce: 0.28 } },
};

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
    <section id="contact" className="w-full py-12 md:py-24 overflow-hidden">
      <div className="container px-4 md:px-6">

        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <motion.div
            className="inline-flex items-center gap-2 mb-3"
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, type: 'spring' }}
          >
            <Mail className="w-4 h-4 text-primary" />
            <motion.span
              className="text-sm uppercase text-primary font-medium"
              initial={{ letterSpacing: '0.1em', opacity: 0 }}
              whileInView={{ letterSpacing: '0.25em', opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              Say Hello
            </motion.span>
          </motion.div>

          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
            Get In Touch
          </h2>
          <motion.p
            className="max-w-[700px] mx-auto text-muted-foreground md:text-xl mt-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            I&apos;m currently open to new opportunities and collaborations. Feel free to reach out!
          </motion.p>
        </motion.div>

        {/* Form card */}
        <div className="max-w-2xl mx-auto">
          <motion.div
            variants={cardVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <div className="relative group animated-gradient-border rounded-2xl">
              <Card className="p-6 bg-card rounded-xl shadow-lg overflow-hidden">
                {/* Card shimmer */}
                <span className="exp-shimmer" />

                <CardContent className="p-0 relative z-10">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                      {/* Staggered fields */}
                      <motion.div
                        className="space-y-6"
                        variants={fieldVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-40px' }}
                      >
                        {/* Name */}
                        <motion.div variants={fieldItem}>
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="flex items-center gap-1.5">
                                  <Sparkles className="w-3 h-3 text-primary opacity-70" />
                                  Name
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Your Name"
                                    {...field}
                                    disabled={isSubmitting}
                                    className="contact-input transition-all duration-300 focus:shadow-[0_0_0_2px_hsl(var(--primary)/0.25)] focus:border-primary"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </motion.div>

                        {/* Email */}
                        <motion.div variants={fieldItem}>
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="flex items-center gap-1.5">
                                  <Sparkles className="w-3 h-3 text-primary opacity-70" />
                                  Email
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="your.email@example.com"
                                    {...field}
                                    disabled={isSubmitting}
                                    className="contact-input transition-all duration-300 focus:shadow-[0_0_0_2px_hsl(var(--primary)/0.25)] focus:border-primary"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </motion.div>

                        {/* Message */}
                        <motion.div variants={fieldItem}>
                          <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="flex items-center gap-1.5">
                                  <Sparkles className="w-3 h-3 text-primary opacity-70" />
                                  Message
                                </FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Tell me how I can help you."
                                    className="contact-input resize-none transition-all duration-300 focus:shadow-[0_0_0_2px_hsl(var(--primary)/0.25)] focus:border-primary"
                                    {...field}
                                    disabled={isSubmitting}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </motion.div>
                      </motion.div>

                      {/* Submit button */}
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, duration: 0.4 }}
                      >
                        <motion.div
                          whileHover={{ scale: 1.015 }}
                          whileTap={{ scale: 0.97 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 16 }}
                        >
                          <Button
                            type="submit"
                            className="w-full relative overflow-hidden group/btn"
                            disabled={isSubmitting || sent}
                          >
                            {/* Button shimmer */}
                            <span className="exp-shimmer opacity-40" />
                            <AnimatePresence mode="wait">
                              {sent ? (
                                <motion.span
                                  key="sent"
                                  className="flex items-center gap-2"
                                  initial={{ opacity: 0, y: 8 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -8 }}
                                  transition={{ duration: 0.25 }}
                                >
                                  ✓ Message Sent!
                                </motion.span>
                              ) : isSubmitting ? (
                                <motion.span
                                  key="sending"
                                  className="flex items-center gap-2"
                                  initial={{ opacity: 0, y: 8 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -8 }}
                                  transition={{ duration: 0.25 }}
                                >
                                  <span className="contact-spinner" />
                                  Sending…
                                </motion.span>
                              ) : (
                                <motion.span
                                  key="idle"
                                  className="flex items-center gap-2"
                                  initial={{ opacity: 0, y: 8 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -8 }}
                                  transition={{ duration: 0.25 }}
                                >
                                  Send Message
                                  <Send className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-0.5" />
                                </motion.span>
                              )}
                            </AnimatePresence>
                          </Button>
                        </motion.div>
                      </motion.div>

                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
