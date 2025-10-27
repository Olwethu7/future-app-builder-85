import { Layout } from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
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
                      <a href="mailto:ncadmin@estatesales.co.za" className="hover:text-primary transition-colors">
                        ncadmin@estatesales.co.za
                      </a>
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-6">
              <h2 className="font-montserrat text-2xl font-bold text-primary mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input placeholder="Your Name" required />
                </div>
                <div>
                  <Input type="email" placeholder="Your Email" required />
                </div>
                <div>
                  <Input type="tel" placeholder="Your Phone (optional)" />
                </div>
                <div>
                  <Textarea 
                    placeholder="Your Message" 
                    rows={6}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
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
