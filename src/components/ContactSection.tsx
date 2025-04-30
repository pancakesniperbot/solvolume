import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Phone, 
  Mail, 
  Send, 
  MessageSquare, 
  Check,
  Loader2,
  AlertCircle
} from "lucide-react";
import { CyberpunkBackground } from "./CyberpunkBackground";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Contact form schema
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters."
  }).max(50),
  email: z.string().email({
    message: "Please enter a valid email address."
  }),
  subject: z.string().min(1, {
    message: "Please select a subject."
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters."
  }).max(1000, {
    message: "Message cannot exceed 1000 characters."
  })
});

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Form definition using react-hook-form and zod validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  });
  
  // Form submission handler
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // This would be replaced with an actual API call in production
      console.log("Form submitted:", values);
      
      // Show success state
      setIsSuccess(true);
      form.reset();
      
      // Reset success state after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("There was an error submitting your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Cyberpunk background */}
      <CyberpunkBackground variant="dark" withGrid withNoise withGlitch />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-4">
            <div className="bg-[#03E1FF]/10 p-3 rounded-full">
              <MessageSquare className="h-8 w-8 text-[#03E1FF]" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Get in <span className="text-[#03E1FF]">Touch</span>
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Have questions about our Solana Volume Bot? Our team is here to help. Fill out the form below and we'll get back to you as soon as possible.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            {/* Contact Information Card */}
            <div className="bg-[#0c0c15] border border-[#1e2035] rounded-lg p-6">
              <h3 className="text-white text-xl font-bold mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-[#03E1FF]/10 p-2 rounded-lg mt-1">
                    <Mail className="h-5 w-5 text-[#03E1FF]" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Email Us</h4>
                    <p className="text-gray-400 mt-1">support@solanavolumebot.io</p>
                    <p className="text-xs text-gray-500 mt-1">We'll respond within 24 hours</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-[#03E1FF]/10 p-2 rounded-lg mt-1">
                    <Phone className="h-5 w-5 text-[#03E1FF]" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Call Us</h4>
                    <p className="text-gray-400 mt-1">+44 (0) 114 244 8891</p>
                    <p className="text-xs text-gray-500 mt-1">Mon-Fri, 9AM-5PM GMT</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 border-t border-[#1e2035] pt-6">
                <h4 className="text-white font-medium mb-3">Business Hours</h4>
                <ul className="space-y-2 text-gray-400">
                  <li className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span>9:00 AM - 5:00 PM GMT</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Saturday:</span>
                    <span>10:00 AM - 2:00 PM GMT</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sunday:</span>
                    <span>Closed</span>
                  </li>
                </ul>
                <p className="text-xs text-gray-500 mt-4">
                  Note: Our online support system is available 24/7
                </p>
              </div>
            </div>

            {/* Map Card */}
            <div className="bg-[#0c0c15] border border-[#1e2035] rounded-lg p-6 overflow-hidden">
              <h3 className="text-white text-xl font-bold mb-4">Our Location</h3>
              <p className="text-gray-400 mb-4">15 Birchgreen Close<br/>Maltby, Rotherham<br/>South Yorkshire, S66 8RP<br/>United Kingdom</p>
              
              {/* Interactive Map Placeholder with cyberpunk styling */}
              <div className="h-[180px] rounded-lg overflow-hidden relative border border-[#1e2035]">
                <div className="absolute inset-0 bg-[#0D0D15] z-10 opacity-40"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-[#9945FF]/20 via-transparent to-[#14F195]/20 z-20"></div>
                
                {/* Map Grid Overlay */}
                <div className="absolute inset-0 z-30">
                  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#2a2a3c" strokeWidth="1"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                    
                    {/* Map location pin */}
                    <circle cx="50%" cy="50%" r="6" fill="#14F195" />
                    <circle cx="50%" cy="50%" r="12" fill="transparent" stroke="#14F195" strokeWidth="2" opacity="0.6">
                      <animate attributeName="r" from="12" to="20" dur="1.5s" repeatCount="indefinite" />
                      <animate attributeName="opacity" from="0.6" to="0" dur="1.5s" repeatCount="indefinite" />
                    </circle>
                  </svg>
                </div>
                
                {/* Map Base Overlay */}
                <div className="absolute inset-0 z-0 bg-[url('/solana-map.svg')] bg-cover bg-center opacity-40"></div>
                
                {/* Clickable Area */}
                <a 
                  href="https://maps.google.com/?q=15+Birchgreen+Close,+Maltby,+Rotherham,+South+Yorkshire,+S66+8RP,+UK" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 z-40 flex items-center justify-center text-[#03E1FF] hover:text-white transition-colors"
                >
                  <div className="bg-[#0c0c15]/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-[#1e2035] text-sm">
                    Open in Google Maps
                  </div>
                </a>
              </div>
            </div>
          </motion.div>
          
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3 bg-[#0c0c15] border border-[#1e2035] rounded-lg p-6"
          >
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center py-10 text-center"
              >
                <div className="bg-[#14F195]/10 p-4 rounded-full mb-4">
                  <Check className="h-10 w-10 text-[#14F195]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-gray-400 max-w-md mb-6">
                  Thank you for reaching out to us. We've received your message and will get back to you as soon as possible.
                </p>
                <Button
                  onClick={() => setIsSuccess(false)}
                  className="bg-[#03E1FF] hover:bg-[#02D1EF] text-black"
                >
                  Send Another Message
                </Button>
              </motion.div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name Field */}
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Your name" 
                              {...field} 
                              className="bg-[#1e2035] border-[#1e2035] text-white placeholder:text-gray-500 focus:border-[#03E1FF]" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {/* Email Field */}
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Email</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Your email" 
                              type="email"
                              {...field} 
                              className="bg-[#1e2035] border-[#1e2035] text-white placeholder:text-gray-500 focus:border-[#03E1FF]" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  {/* Subject Field */}
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Subject</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-[#1e2035] border-[#1e2035] text-white focus:border-[#03E1FF]">
                              <SelectValue placeholder="Select a subject" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-[#1e2035] border-[#1e2035] text-white">
                            <SelectItem value="general">General Inquiry</SelectItem>
                            <SelectItem value="pricing">Pricing Information</SelectItem>
                            <SelectItem value="technical">Technical Support</SelectItem>
                            <SelectItem value="partnership">Partnership Opportunity</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Message Field */}
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Your message" 
                            {...field} 
                            rows={5}
                            className="bg-[#1e2035] border-[#1e2035] text-white placeholder:text-gray-500 focus:border-[#03E1FF] resize-none" 
                          />
                        </FormControl>
                        <FormDescription className="text-gray-500">
                          Please provide as much detail as possible so we can best assist you.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Error Message */}
                  {error && (
                    <div className="bg-red-900/20 border border-red-900 rounded-md p-3 flex items-center gap-2 text-sm">
                      <AlertCircle className="h-4 w-4 text-red-500" />
                      <span className="text-red-400">{error}</span>
                    </div>
                  )}
                  
                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-[#03E1FF] to-[#14F195] text-black hover:from-[#02D1EF] hover:to-[#05E286]"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Sending Message...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}