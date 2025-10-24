import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface SearchFilters {
  location?: string;
  checkIn?: Date;
  checkOut?: Date;
  guests?: number;
  minPrice?: number;
  maxPrice?: number;
  amenities?: string[];
  sustainabilityRating?: number;
}

export const useAccommodations = (filters?: SearchFilters) => {
  return useQuery({
    queryKey: ["accommodations", filters],
    queryFn: async () => {
      let query = supabase
        .from("accommodations")
        .select("*")
        .eq("available", true);

      // Apply filters
      if (filters?.minPrice) {
        query = query.gte("price_per_night", filters.minPrice);
      }
      if (filters?.maxPrice) {
        query = query.lte("price_per_night", filters.maxPrice);
      }
      if (filters?.guests) {
        query = query.gte("capacity", filters.guests);
      }

      const { data, error } = await query.order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });
};

export const useAccommodation = (id: string) => {
  return useQuery({
    queryKey: ["accommodation", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("accommodations")
        .select(`
          *,
          rooms (*)
        `)
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });
};

export const useAccommodationReviews = (accommodationId: string) => {
  return useQuery({
    queryKey: ["reviews", "accommodation", accommodationId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("accommodation_id", accommodationId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!accommodationId,
  });
};
