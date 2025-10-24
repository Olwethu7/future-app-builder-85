import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

export const useSavedAccommodations = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["saved-accommodations", user?.id],
    queryFn: async () => {
      if (!user) return [];

      const { data, error } = await supabase
        .from("saved_accommodations")
        .select(`
          *,
          accommodations (*)
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });
};

export const useToggleSaveAccommodation = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      accommodationId, 
      isSaved 
    }: { 
      accommodationId: string; 
      isSaved: boolean;
    }) => {
      if (!user) throw new Error("Not authenticated");

      if (isSaved) {
        // Remove from saved
        const { error } = await supabase
          .from("saved_accommodations")
          .delete()
          .eq("user_id", user.id)
          .eq("accommodation_id", accommodationId);

        if (error) throw error;
      } else {
        // Add to saved
        const { error } = await supabase
          .from("saved_accommodations")
          .insert({
            user_id: user.id,
            accommodation_id: accommodationId,
          });

        if (error) throw error;
      }

      return !isSaved;
    },
    onSuccess: (newSavedState) => {
      queryClient.invalidateQueries({ 
        queryKey: ["saved-accommodations", user?.id] 
      });
      toast({
        title: newSavedState ? "Saved" : "Removed",
        description: newSavedState 
          ? "Added to your saved accommodations" 
          : "Removed from saved accommodations",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update saved status",
        variant: "destructive",
      });
    },
  });
};
