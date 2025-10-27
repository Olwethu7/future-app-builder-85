import { Layout } from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { Music, Palette, BookOpen, Users2 } from "lucide-react";

const CulturalHeritage = () => {
  return (
    <Layout>
      <div className="container py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-montserrat text-4xl font-bold text-primary mb-6">
            Zulu Cultural Heritage
          </h1>
          
          <p className="text-lg text-muted-foreground mb-12">
            Experience the rich traditions and vibrant culture of the Zulu people
          </p>

          <div className="prose max-w-none mb-12">
            <p className="text-foreground mb-6">
              The Zulu people have a rich and proud heritage that spans centuries. At Zulu Lami Eco-Resort, we honor 
              and celebrate this cultural legacy by offering authentic experiences that preserve traditions while 
              creating meaningful connections between visitors and local communities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Music className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-montserrat font-semibold text-lg mb-2">Traditional Dance & Music</h3>
                  <p className="text-muted-foreground text-sm">
                    Experience the powerful rhythms and energetic movements of traditional Zulu dance. Our cultural 
                    performances feature authentic music, costumes, and storytelling passed down through generations.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Palette className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-montserrat font-semibold text-lg mb-2">Beadwork & Crafts</h3>
                  <p className="text-muted-foreground text-sm">
                    Learn about the intricate art of Zulu beadwork, where colors and patterns carry deep symbolic meaning. 
                    Participate in workshops led by master artisans and create your own traditional pieces.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-montserrat font-semibold text-lg mb-2">Oral Traditions & Stories</h3>
                  <p className="text-muted-foreground text-sm">
                    Gather around the fire to hear ancient stories, proverbs, and wisdom shared by community elders. 
                    These narratives preserve history and teach important life lessons through engaging storytelling.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Users2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-montserrat font-semibold text-lg mb-2">Community Connections</h3>
                  <p className="text-muted-foreground text-sm">
                    Visit local communities and experience daily life, traditional homesteads, and authentic Zulu 
                    hospitality. These interactions create meaningful cultural exchange and mutual understanding.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <div className="bg-muted p-8 rounded-lg mb-8">
            <h2 className="font-montserrat text-2xl font-bold text-primary mb-4">The Zulu Kingdom Legacy</h2>
            <p className="text-foreground mb-4">
              The Zulu Kingdom, established in the early 19th century under King Shaka, became one of the most 
              powerful states in southern Africa. Today, Zulu culture remains vibrant and influential, with over 
              12 million Zulu-speaking people maintaining their cultural identity and traditions.
            </p>
            <p className="text-foreground">
              KwaZulu-Natal, meaning "Place of the Zulu," is the heartland of Zulu culture and history. Our region 
              is home to important historical sites, cultural villages, and living traditions that continue to thrive 
              in the modern era.
            </p>
          </div>

          <div className="bg-primary/5 p-8 rounded-lg">
            <h2 className="font-montserrat text-2xl font-bold text-primary mb-4">Cultural Experiences</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Traditional Ceremonies</h3>
                <p className="text-muted-foreground">
                  Witness or participate in authentic Zulu ceremonies and rituals, learning about their spiritual 
                  significance and social importance in Zulu culture.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Zulu Cuisine</h3>
                <p className="text-muted-foreground">
                  Discover traditional Zulu cooking methods and flavors in our cultural cooking classes, preparing 
                  authentic dishes using time-honored techniques and local ingredients.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Language & Communication</h3>
                <p className="text-muted-foreground">
                  Learn basic isiZulu phrases and understand the nuances of Zulu communication, including the 
                  importance of respect, greetings, and social protocols.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CulturalHeritage;
