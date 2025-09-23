
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
import { Send, Github, Linkedin } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

// SVG for the X logo
function XLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      fill="currentColor"
      {...props}
    >
      <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
    </svg>
  );
}

// SVG for the Medium logo
function MediumLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="0"
      {...props}
    >
      <path d="M4.6,3.6h2.8l4,9.6l4-9.6h2.8v16.8h-2.8v-12L11.4,18L7.4,8.4v12H4.6V3.6z"/>
    </svg>
  );
}

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

export function ContactSection() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Something went wrong.');
      }

      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. I'll get back to you shortly.",
      });
      form.reset();
    } catch (error) {
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
    <section id="contact" className="w-full py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">Get In Touch</h2>
          <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl mt-4">
            I'm currently open to new opportunities and collaborations. Feel free to reach out!
          </p>
        </div>
        <div className="max-w-2xl mx-auto">
          <div className="relative group animated-gradient-border rounded-2xl">
            <Card className="p-6 bg-card rounded-xl shadow-lg">
              <CardContent className="p-0">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your Name" {...field} disabled={isSubmitting} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="your.email@example.com" {...field} disabled={isSubmitting} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell me how I can help you."
                              className="resize-none"
                              {...field}
                              disabled={isSubmitting}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                       {isSubmitting ? 'Sending...' : 'Send Message'}
                      <Send className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

           <div className="mt-12 text-center">
            <h3 className="text-2xl font-headline font-semibold mb-6">and connect with me on social media</h3>
            <div className="flex justify-center space-x-6">
              <Link href="https://www.linkedin.com/in/mrashis06/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-8 h-8 text-muted-foreground hover:text-primary transition-colors" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="https://github.com/mrashis06" target="_blank" rel="noopener noreferrer">
                <Github className="w-8 h-8 text-muted-foreground hover:text-primary transition-colors" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="https://x.com/mrashis0603" target="_blank" rel="noopener noreferrer">
                <XLogo className="w-7 h-7 text-muted-foreground hover:text-primary transition-colors" />
                <span className="sr-only">X</span>
              </Link>
              <Link href="https://medium.com/@ash-tech" target="_blank" rel="noopener noreferrer">
                <MediumLogo className="w-8 h-8 text-muted-foreground hover:text-primary transition-colors" />
                <span className="sr-only">Medium</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
