import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useRoomAvailability = (
  roomId: string,
  checkIn?: Date,
  checkOut?: Date
) => {
  return useQuery({
    queryKey: ["room-availability", roomId, checkIn, checkOut],
    queryFn: async () => {
      if (!checkIn || !checkOut) {
        // Return total quantity if no dates selected
        const { data } = await supabase
          .from("rooms")
          .select("quantity")
          .eq("id", roomId)
          .single();
        
        return data?.quantity || 0;
      }

      const { data, error } = await supabase.rpc("check_room_availability", {
        p_room_id: roomId,
        p_check_in: checkIn.toISOString().split("T")[0],
        p_check_out: checkOut.toISOString().split("T")[0],
      });

      if (error) throw error;
      return data;
    },
    enabled: !!roomId,
  });
};
