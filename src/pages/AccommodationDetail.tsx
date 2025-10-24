import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Layout } from "@/components/layout/Layout";
import { ImageGallery } from "@/components/accommodations/ImageGallery";
import { AccommodationInfo } from "@/components/accommodations/AccommodationInfo";
import { ReviewsSection } from "@/components/accommodations/ReviewsSection";
import { BookingWidget } from "@/components/accommodations/BookingWidget";
import { NearbyExperiences } from "@/components/accommodations/NearbyExperiences";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const AccommodationDetail = () => {
  const { id } = useParams();

  const { data: accommodation, isLoading, error } = useQuery({
    queryKey: ["accommodation", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("accommodations")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="container py-8 space-y-8">
          <Skeleton className="h-[500px] w-full rounded-lg" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <Skeleton className="h-64 w-full" />
              <Skeleton className="h-64 w-full" />
            </div>
            <Skeleton className="h-96 w-full" />
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !accommodation) {
    return (
      <Layout>
        <div className="container py-16">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {error ? "Failed to load accommodation details" : "Accommodation not found"}
            </AlertDescription>
          </Alert>
        </div>
      </Layout>
    );
  }

  // Default images if none provided
  const images = accommodation.images && accommodation.images.length > 0
    ? accommodation.images
    : [
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070",
        "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2070",
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2070",
        "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=2070",
      ];

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
              accommodationId={accommodation.id}
              pricePerNight={accommodation.price_per_night || 0}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AccommodationDetail;
