import { AccommodationCard } from "@/components/accommodations/AccommodationCard";
import { useAccommodations } from "@/hooks/useAccommodations";
import { Loader2 } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const FeaturedAccommodations = () => {
  const { data: accommodations, isLoading } = useAccommodations();

  if (isLoading) {
    return (
      <section className="py-16 bg-muted/30">
        <div className="container px-4 flex justify-center items-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </section>
    );
  }

  const featuredAccommodations = accommodations?.slice(0, 4) || [];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-primary mb-4">
            Featured Eco-Lodges
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our carefully selected sustainable accommodations that blend comfort with environmental responsibility
          </p>
        </div>

        {featuredAccommodations.length > 0 ? (
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {featuredAccommodations.map((accommodation) => (
                <CarouselItem key={accommodation.id} className="md:basis-1/2 lg:basis-1/3">
                  <AccommodationCard accommodation={accommodation} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        ) : (
          <div className="text-center text-muted-foreground py-12">
            No accommodations available at the moment.
          </div>
        )}
      </div>
    </section>
  );
};
