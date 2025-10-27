import { Layout } from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { Mountain, Fish, Palmtree, Camera, Waves, TreePine } from "lucide-react";

const LocalArea = () => {
  return (
    <Layout>
      <div className="container py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-montserrat text-4xl font-bold text-primary mb-6">
            Explore KwaZulu-Natal
          </h1>
          
          <p className="text-lg text-muted-foreground mb-12">
            Discover the natural beauty and cultural richness of KwaZulu-Natal's attractions
          </p>

          <div className="prose max-w-none mb-12">
            <p className="text-foreground mb-6">
              KwaZulu-Natal is a province of extraordinary diversity, offering everything from pristine beaches and 
              dramatic mountain ranges to rich cultural heritage and abundant wildlife. Our eco-resort is perfectly 
              positioned to help you explore the best this magnificent region has to offer.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Fish className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-montserrat font-semibold text-lg mb-2">Jozini Dam</h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    One of South Africa's largest dams, offering spectacular views, excellent fishing, and wildlife 
                    viewing opportunities. Take a boat cruise or try your hand at tiger fishing.
                  </p>
                  <p className="text-xs text-muted-foreground">Distance: 15 km from resort</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <TreePine className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-montserrat font-semibold text-lg mb-2">Lebombo Mountains</h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    Ancient mountain range offering breathtaking hiking trails, panoramic views, and unique flora and 
                    fauna. Perfect for nature photographers and adventure seekers.
                  </p>
                  <p className="text-xs text-muted-foreground">Distance: 20 km from resort</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Mountain className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-montserrat font-semibold text-lg mb-2">Drakensberg Mountains</h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    UNESCO World Heritage Site featuring dramatic peaks, ancient San rock art, and world-class hiking. 
                    Experience some of South Africa's most stunning mountain scenery.
                  </p>
                  <p className="text-xs text-muted-foreground">Distance: 180 km from resort</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Camera className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-montserrat font-semibold text-lg mb-2">iSimangaliso Wetland Park</h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    South Africa's first UNESCO World Heritage Site, featuring diverse ecosystems including wetlands, 
                    beaches, and coral reefs. Exceptional wildlife viewing and bird watching.
                  </p>
                  <p className="text-xs text-muted-foreground">Distance: 90 km from resort</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Waves className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-montserrat font-semibold text-lg mb-2">Durban Beaches</h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    Golden beaches stretching along the Indian Ocean, offering swimming, surfing, and water sports. 
                    Experience the vibrant beachfront promenade and diverse culinary scene.
                  </p>
                  <p className="text-xs text-muted-foreground">Distance: 280 km from resort</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Palmtree className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-montserrat font-semibold text-lg mb-2">Hluhluwe-iMfolozi Park</h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    Africa's oldest game reserve, famous for successful white rhino conservation. Experience the Big 
                    Five and diverse wildlife in their natural habitat.
                  </p>
                  <p className="text-xs text-muted-foreground">Distance: 60 km from resort</p>
                </div>
              </div>
            </Card>
          </div>

          <div className="bg-muted p-8 rounded-lg mb-8">
            <h2 className="font-montserrat text-2xl font-bold text-primary mb-4">Cultural Sites</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Shakaland</h3>
                <p className="text-muted-foreground">
                  Authentic Zulu cultural village where you can experience traditional Zulu life, customs, and 
                  ceremonies. Learn about the legacy of King Shaka and Zulu history.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Battlefields Route</h3>
                <p className="text-muted-foreground">
                  Historic sites commemorating the Anglo-Zulu War and other significant conflicts. Guided tours 
                  provide deep insights into South African history.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Local Markets</h3>
                <p className="text-muted-foreground">
                  Vibrant markets featuring traditional crafts, artwork, and local produce. Support local artisans 
                  and find unique handmade souvenirs.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-primary/5 p-8 rounded-lg">
            <h2 className="font-montserrat text-2xl font-bold text-primary mb-4">Activities & Tours</h2>
            <p className="text-foreground mb-4">
              We can help arrange guided tours and activities to all major attractions in KwaZulu-Natal. Our local 
              knowledge and partnerships ensure you get the most authentic and enriching experiences.
            </p>
            <ul className="space-y-2 text-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Wildlife safaris and game drives</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Cultural village tours and traditional ceremonies</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Hiking and nature walks with experienced guides</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Water activities including fishing, boating, and diving</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Bird watching expeditions and photography tours</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LocalArea;
