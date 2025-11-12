-- Create rooms for each accommodation type

-- Get accommodation IDs and create rooms

-- Create rooms for Single Room accommodation
INSERT INTO public.rooms (accommodation_id, name, room_type, description, price_per_night, capacity, quantity, available, amenities, images)
SELECT 
  id,
  'Single Room',
  'single',
  'Cozy eco-friendly room for solo travelers with sustainable features',
  750,
  1,
  5,
  true,
  ARRAY['Wi-Fi', 'En-suite Bathroom', 'Solar Power', 'Garden View', 'Eco-friendly Amenities'],
  ARRAY['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop']
FROM public.accommodations
WHERE name = 'Single Room'
ON CONFLICT DO NOTHING;

-- Create rooms for Double Room accommodation
INSERT INTO public.rooms (accommodation_id, name, room_type, description, price_per_night, capacity, quantity, available, amenities, images)
SELECT 
  id,
  'Double Room',
  'double',
  'Spacious room for couples with sustainable features and private balcony',
  1200,
  2,
  8,
  true,
  ARRAY['Wi-Fi', 'En-suite Bathroom', 'King Bed', 'Solar Power', 'Private Balcony', 'Organic Linens'],
  ARRAY['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop']
FROM public.accommodations
WHERE name = 'Double Room'
ON CONFLICT DO NOTHING;

-- Create rooms for Family Room accommodation
INSERT INTO public.rooms (accommodation_id, name, room_type, description, price_per_night, capacity, quantity, available, amenities, images)
SELECT 
  id,
  'Family Room',
  'family',
  'Spacious family accommodation with multiple beds and living area',
  2400,
  4,
  3,
  true,
  ARRAY['Wi-Fi', 'En-suite Bathroom', '2 Bedrooms', 'Living Area', 'Kitchenette', 'Garden Access'],
  ARRAY['https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&h=600&fit=crop']
FROM public.accommodations
WHERE name = 'Family Room'
ON CONFLICT DO NOTHING;

-- Create rooms for Event Space
INSERT INTO public.rooms (accommodation_id, name, room_type, description, price_per_night, capacity, quantity, available, amenities, images)
SELECT 
  id,
  'Event Space',
  'event',
  'Perfect for weddings, conferences, and special events with modern facilities',
  2000,
  50,
  2,
  true,
  ARRAY['Wi-Fi', 'Sound System', 'Projector', 'Catering Kitchen', 'Outdoor Area', 'Parking'],
  ARRAY['https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=600&fit=crop']
FROM public.accommodations
WHERE name = 'Event Space'
ON CONFLICT DO NOTHING;
