import { Layout } from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const contactSchema = z.object({
  name: z.string()
    .trim()
    .min(1, { message: "Name is required" })
    .max(100, { message: "Name must be less than 100 characters" }),
  email: z.string()
    .trim()
    .email({ message: "Invalid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  phone: z.string()
    .trim()
    .max(20, { message: "Phone number must be less than 20 characters" })
    .optional()
    .or(z.literal("")),
  message: z.string()
    .trim()
    .min(1, { message: "Message is required" })
    .max(1000, { message: "Message must be less than 1000 characters" })
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: ""
    }
  });

  const handleSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      // Validate data is already sanitized by Zod schema
      // In a real application, this would send to a backend API or edge function
      console.log("Valid contact form data:", data);
      
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you soon."
      });
      
      form.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send message. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="container py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-montserrat text-4xl font-bold text-primary mb-6">
            Contact Us
          </h1>
          
          <p className="text-lg text-muted-foreground mb-12">
            Get in touch with us for bookings, inquiries, or to learn more about our eco-resort
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="space-y-6">
              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-montserrat font-semibold text-lg mb-2">Location</h3>
                    <p className="text-muted-foreground">
                      Zululami Road, Othobothini<br />
                      Jozini, 3969<br />
                      KwaZulu-Natal, South Africa
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-montserrat font-semibold text-lg mb-2">Phone</h3>
                    <p className="text-muted-foreground">
                      <a href="tel:+27796560543" className="hover:text-primary transition-colors">
                        +27 79 656 0543
                      </a>
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <MessageCircle className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-montserrat font-semibold text-lg mb-2">WhatsApp</h3>
                    <p className="text-muted-foreground">
                      <a href="https://wa.me/27832841272" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                        +27 83 284 1272
                      </a>
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-montserrat font-semibold text-lg mb-2">Email</h3>
                    <p className="text-muted-foreground">
                      <a href="mailto:zululamiecoresort@gmail.com" className="hover:text-primary transition-colors">
                        zululamiecoresort@gmail.com
                      </a>
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-6">
              <h2 className="font-montserrat text-2xl font-bold text-primary mb-6">Send us a Message</h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Name" {...field} />
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
                          <Input type="email" placeholder="Your Email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone (optional)</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="Your Phone" {...field} />
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
                            placeholder="Your Message" 
                            rows={6}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </Card>
          </div>

          <Card className="p-6 bg-muted">
            <h2 className="font-montserrat text-2xl font-bold text-primary mb-4">Visit Us</h2>
            <p className="text-foreground mb-4">
              We're located in the beautiful Jozini area of KwaZulu-Natal, surrounded by stunning natural landscapes 
              and rich Zulu cultural heritage. Our eco-resort is easily accessible and offers a peaceful retreat 
              from the hustle and bustle of city life.
            </p>
            <p className="text-muted-foreground">
              Contact us to arrange a visit or to learn more about our accommodation options and cultural experiences.
            </p>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
