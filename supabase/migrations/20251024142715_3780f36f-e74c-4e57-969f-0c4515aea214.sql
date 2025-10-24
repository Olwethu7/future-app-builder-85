-- Create rooms table for room inventory management
CREATE TABLE public.rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  accommodation_id UUID REFERENCES public.accommodations(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  room_type TEXT NOT NULL,
  capacity INTEGER NOT NULL,
  price_per_night NUMERIC NOT NULL,
  description TEXT,
  amenities TEXT[],
  images TEXT[],
  available BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS on rooms
ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;

-- RLS Policies for rooms
CREATE POLICY "Anyone can view available rooms"
  ON public.rooms
  FOR SELECT
  USING (available = true OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage rooms"
  ON public.rooms
  FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Create reviews table
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  accommodation_id UUID REFERENCES public.accommodations(id) ON DELETE CASCADE,
  experience_id UUID REFERENCES public.experiences(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  cleanliness_rating INTEGER CHECK (cleanliness_rating >= 1 AND cleanliness_rating <= 5),
  location_rating INTEGER CHECK (location_rating >= 1 AND location_rating <= 5),
  value_rating INTEGER CHECK (value_rating >= 1 AND value_rating <= 5),
  communication_rating INTEGER CHECK (communication_rating >= 1 AND communication_rating <= 5),
  title TEXT,
  comment TEXT NOT NULL,
  photos TEXT[],
  helpful_count INTEGER DEFAULT 0,
  verified_stay BOOLEAN DEFAULT false,
  host_response TEXT,
  host_response_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT review_target CHECK (
    (accommodation_id IS NOT NULL AND experience_id IS NULL) OR
    (accommodation_id IS NULL AND experience_id IS NOT NULL)
  )
);

-- Enable RLS on reviews
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- RLS Policies for reviews
CREATE POLICY "Anyone can view reviews"
  ON public.reviews
  FOR SELECT
  USING (true);

CREATE POLICY "Users can create reviews for their bookings"
  ON public.reviews
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reviews"
  ON public.reviews
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own reviews"
  ON public.reviews
  FOR DELETE
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all reviews"
  ON public.reviews
  FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Create saved accommodations table
CREATE TABLE public.saved_accommodations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  accommodation_id UUID REFERENCES public.accommodations(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, accommodation_id)
);

-- Enable RLS on saved accommodations
ALTER TABLE public.saved_accommodations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for saved accommodations
CREATE POLICY "Users can view their saved accommodations"
  ON public.saved_accommodations
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can save accommodations"
  ON public.saved_accommodations
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove saved accommodations"
  ON public.saved_accommodations
  FOR DELETE
  USING (auth.uid() = user_id);

-- Add room_id to bookings table
ALTER TABLE public.bookings 
ADD COLUMN room_id UUID REFERENCES public.rooms(id) ON DELETE SET NULL;

-- Create indexes for performance
CREATE INDEX idx_rooms_accommodation_id ON public.rooms(accommodation_id);
CREATE INDEX idx_rooms_available ON public.rooms(available);
CREATE INDEX idx_reviews_accommodation_id ON public.reviews(accommodation_id);
CREATE INDEX idx_reviews_experience_id ON public.reviews(experience_id);
CREATE INDEX idx_reviews_user_id ON public.reviews(user_id);
CREATE INDEX idx_reviews_rating ON public.reviews(rating);
CREATE INDEX idx_bookings_user_id ON public.bookings(user_id);
CREATE INDEX idx_bookings_dates ON public.bookings(check_in_date, check_out_date);
CREATE INDEX idx_bookings_status ON public.bookings(status);
CREATE INDEX idx_accommodations_available ON public.accommodations(available);
CREATE INDEX idx_experiences_category ON public.experiences(category);
CREATE INDEX idx_experiences_available ON public.experiences(available);

-- Trigger for rooms updated_at
CREATE TRIGGER set_rooms_updated_at
  BEFORE UPDATE ON public.rooms
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Trigger for reviews updated_at
CREATE TRIGGER set_reviews_updated_at
  BEFORE UPDATE ON public.reviews
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Create storage buckets for media
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('accommodation-photos', 'accommodation-photos', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp']),
  ('experience-photos', 'experience-photos', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp']),
  ('profile-avatars', 'profile-avatars', true, 2097152, ARRAY['image/jpeg', 'image/png', 'image/webp']),
  ('review-photos', 'review-photos', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp'])
ON CONFLICT (id) DO NOTHING;

-- Storage RLS policies for accommodation photos
CREATE POLICY "Anyone can view accommodation photos"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'accommodation-photos');

CREATE POLICY "Admins can upload accommodation photos"
  ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'accommodation-photos' AND
    public.has_role(auth.uid(), 'admin')
  );

CREATE POLICY "Admins can update accommodation photos"
  ON storage.objects
  FOR UPDATE
  USING (
    bucket_id = 'accommodation-photos' AND
    public.has_role(auth.uid(), 'admin')
  );

CREATE POLICY "Admins can delete accommodation photos"
  ON storage.objects
  FOR DELETE
  USING (
    bucket_id = 'accommodation-photos' AND
    public.has_role(auth.uid(), 'admin')
  );

-- Storage RLS policies for experience photos
CREATE POLICY "Anyone can view experience photos"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'experience-photos');

CREATE POLICY "Admins can upload experience photos"
  ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'experience-photos' AND
    public.has_role(auth.uid(), 'admin')
  );

CREATE POLICY "Admins can update experience photos"
  ON storage.objects
  FOR UPDATE
  USING (
    bucket_id = 'experience-photos' AND
    public.has_role(auth.uid(), 'admin')
  );

CREATE POLICY "Admins can delete experience photos"
  ON storage.objects
  FOR DELETE
  USING (
    bucket_id = 'experience-photos' AND
    public.has_role(auth.uid(), 'admin')
  );

-- Storage RLS policies for profile avatars
CREATE POLICY "Anyone can view profile avatars"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'profile-avatars');

CREATE POLICY "Users can upload their own avatar"
  ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'profile-avatars' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can update their own avatar"
  ON storage.objects
  FOR UPDATE
  USING (
    bucket_id = 'profile-avatars' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete their own avatar"
  ON storage.objects
  FOR DELETE
  USING (
    bucket_id = 'profile-avatars' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Storage RLS policies for review photos
CREATE POLICY "Anyone can view review photos"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'review-photos');

CREATE POLICY "Users can upload review photos"
  ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'review-photos' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete their review photos"
  ON storage.objects
  FOR DELETE
  USING (
    bucket_id = 'review-photos' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Enable realtime for key tables
ALTER TABLE public.bookings REPLICA IDENTITY FULL;
ALTER TABLE public.reviews REPLICA IDENTITY FULL;
ALTER TABLE public.accommodations REPLICA IDENTITY FULL;

-- Add tables to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.bookings;
ALTER PUBLICATION supabase_realtime ADD TABLE public.reviews;
ALTER PUBLICATION supabase_realtime ADD TABLE public.accommodations;