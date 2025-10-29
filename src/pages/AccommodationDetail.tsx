import { useParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { ImageGallery } from "@/components/accommodations/ImageGallery";
import { AccommodationInfo } from "@/components/accommodations/AccommodationInfo";
import { ReviewsSection } from "@/components/accommodations/ReviewsSection";
import { BookingWidget } from "@/components/accommodations/BookingWidget";
import { NearbyExperiences } from "@/components/accommodations/NearbyExperiences";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const AccommodationDetail = () => {
  const { id } = useParams();

  const { data: room, isLoading } = useQuery({
    queryKey: ["room", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("rooms")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="container py-16 flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  const accommodation = room;

  if (!accommodation) {
    return (
      <Layout>
        <div className="container py-16">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Room not found
            </AlertDescription>
          </Alert>
        </div>
      </Layout>
    );
  }

  const images = accommodation.images || [];

  return (
    <Layout>
      <div className="container py-8 space-y-8">
        {/* Image Gallery */}
        <ImageGallery images={images} name={accommodation.name} />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <AccommodationInfo accommodation={accommodation} />
            <ReviewsSection />
            <NearbyExperiences />
          </div>

          {/* Booking Widget */}
          <div>
            <BookingWidget
              roomId={accommodation.id}
              pricePerNight={accommodation.price_per_night || 0}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AccommodationDetail;
