-- Add quantity field to rooms table

ALTER TABLE rooms ADD COLUMN IF NOT EXISTS quantity integer NOT NULL DEFAULT 1;

-- Insert accommodation types with room data
INSERT INTO accommodations (id, name, type, description, price_per_night, capacity, available, amenities, images, location, sustainability_rating)
VALUES 
  ('11111111-1111-1111-1111-111111111111'::uuid, 'Single Room', 'Single', 'Cozy eco-friendly single room perfect for solo travelers seeking comfort and sustainability', 750, 1, true, 
   ARRAY['Wi-Fi', 'Fireplace', 'Eco-Friendly Toiletries', 'Hiking Trails Access'],
   ARRAY['https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070', 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=2071'],
   'Zulu Lami Eco-Resort, KwaZulu-Natal', 4.8),
  ('22222222-2222-2222-2222-222222222222'::uuid, 'Double Room', 'Double', 'Spacious double room with stunning views, perfect for couples or friends sharing', 1200, 2, true,
   ARRAY['Wi-Fi', 'Swimming Pool', 'Restaurant', 'Spa', 'Wildlife Tours'],
   ARRAY['https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=2074', 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2070'],
   'Zulu Lami Eco-Resort, KwaZulu-Natal', 4.9),
  ('33333333-3333-3333-3333-333333333333'::uuid, 'Family Room', 'Family', 'Generous family suite designed for comfort, featuring multiple beds and family-friendly amenities', 2400, 4, true,
   ARRAY['Wi-Fi', 'Swimming Pool', 'Restaurant', 'Spa', 'Hiking Trails', 'Wildlife Tours', 'Cultural Activities'],
   ARRAY['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070', 'https://images.unsplash.com/photo-1615460549969-36fa19521a4f?q=80&w=2074'],
   'Zulu Lami Eco-Resort, KwaZulu-Natal', 5.0),
  ('44444444-4444-4444-4444-444444444444'::uuid, 'Event Hall', 'Event Space', 'Spacious event hall perfect for weddings, conferences, and special occasions with eco-friendly facilities', 2000, 100, true,
   ARRAY['Wi-Fi', 'Restaurant', 'Solar Power', 'Audio/Visual Equipment', 'Outdoor Space', 'Catering Available'],
   ARRAY['https://images.unsplash.com/photo-1519167758481-83f29da8c2e1?q=80&w=2096', 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070'],
   'Zulu Lami Eco-Resort, KwaZulu-Natal', 4.7)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  price_per_night = EXCLUDED.price_per_night,
  capacity = EXCLUDED.capacity,
  amenities = EXCLUDED.amenities,
  images = EXCLUDED.images;

-- Insert room inventory with quantities
INSERT INTO rooms (id, accommodation_id, name, room_type, description, price_per_night, capacity, quantity, available, amenities, images)
VALUES 
  ('a1111111-1111-1111-1111-111111111111'::uuid, '11111111-1111-1111-1111-111111111111'::uuid, 'Single Room', 'Single', 'Cozy eco-friendly single room', 750, 1, 5, true,
   ARRAY['Wi-Fi', 'Fireplace', 'Eco-Friendly Toiletries', 'Hiking Trails Access'],
   ARRAY['https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070', 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=2071']),
  ('b2222222-2222-2222-2222-222222222222'::uuid, '22222222-2222-2222-2222-222222222222'::uuid, 'Double Room', 'Double', 'Spacious double room with stunning views', 1200, 2, 8, true,
   ARRAY['Wi-Fi', 'Swimming Pool', 'Restaurant', 'Spa', 'Wildlife Tours'],
   ARRAY['https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=2074', 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2070']),
  ('c3333333-3333-3333-3333-333333333333'::uuid, '33333333-3333-3333-3333-333333333333'::uuid, 'Family Room', 'Family', 'Generous family suite with multiple beds', 2400, 4, 10, true,
   ARRAY['Wi-Fi', 'Swimming Pool', 'Restaurant', 'Spa', 'Hiking Trails', 'Wildlife Tours', 'Cultural Activities'],
   ARRAY['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070', 'https://images.unsplash.com/photo-1615460549969-36fa19521a4f?q=80&w=2074']),
  ('d4444444-4444-4444-4444-444444444444'::uuid, '44444444-4444-4444-4444-444444444444'::uuid, 'Event Hall', 'Event Space', 'Spacious event hall for special occasions', 2000, 100, 2, true,
   ARRAY['Wi-Fi', 'Restaurant', 'Solar Power', 'Audio/Visual Equipment', 'Outdoor Space', 'Catering Available'],
   ARRAY['https://images.unsplash.com/photo-1519167758481-83f29da8c2e1?q=80&w=2096', 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070'])
ON CONFLICT (id) DO UPDATE SET
  quantity = EXCLUDED.quantity,
  price_per_night = EXCLUDED.price_per_night,
  capacity = EXCLUDED.capacity;

-- Function to check room availability for date range
CREATE OR REPLACE FUNCTION check_room_availability(
  p_room_id uuid,
  p_check_in date,
  p_check_out date
)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  total_quantity integer;
  booked_quantity integer;
BEGIN
  -- Get total quantity for this room
  SELECT quantity INTO total_quantity
  FROM rooms
  WHERE id = p_room_id;
  
  -- Count how many are booked for overlapping dates
  SELECT COALESCE(COUNT(*), 0) INTO booked_quantity
  FROM bookings
  WHERE room_id = p_room_id
    AND status IN ('pending', 'confirmed')
    AND (
      (check_in_date <= p_check_in AND check_out_date > p_check_in)
      OR (check_in_date < p_check_out AND check_out_date >= p_check_out)
      OR (check_in_date >= p_check_in AND check_out_date <= p_check_out)
    );
  
  RETURN total_quantity - booked_quantity;
END;
$$;

-- Enable realtime for rooms table
ALTER TABLE rooms REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE rooms;
