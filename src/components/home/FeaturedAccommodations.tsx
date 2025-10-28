import { AccommodationCard } from "@/components/accommodations/AccommodationCard";
import { roomTypes } from "@/data/roomTypesData";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const FeaturedAccommodations = () => {
  // Use room types data instead of fetching from database
  const accommodations = roomTypes.filter(room => room.id !== "event-hall");

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

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {accommodations?.map((accommodation) => (
              <CarouselItem key={accommodation.id} className="md:basis-1/2 lg:basis-1/3">
                <AccommodationCard accommodation={accommodation} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};
