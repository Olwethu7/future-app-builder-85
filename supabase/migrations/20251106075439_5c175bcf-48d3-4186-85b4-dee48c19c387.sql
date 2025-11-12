-- Security Enhancement: Make profile-avatars and review-photos buckets private

-- This prevents unauthorized access to potentially personal images

-- Update profile-avatars bucket to be private
UPDATE storage.buckets 
SET public = false 
WHERE id = 'profile-avatars';

-- Update review-photos bucket to be private
UPDATE storage.buckets 
SET public = false 
WHERE id = 'review-photos';

-- Create a public view for reviews that excludes user_id to prevent user tracking
-- This allows public access to review content without exposing user identities
CREATE OR REPLACE VIEW public.public_reviews AS
SELECT 
  id,
  accommodation_id,
  experience_id,
  rating,
  title,
  comment,
  cleanliness_rating,
  communication_rating,
  location_rating,
  value_rating,
  photos,
  verified_stay,
  helpful_count,
  host_response,
  host_response_date,
  created_at,
  updated_at,
  -- Replace user_id with a pseudonymous identifier
  encode(digest(user_id::text || 'zulu-lami-salt-2024', 'sha256'), 'hex') as guest_identifier
FROM public.reviews;

-- Grant SELECT access to the public view for all authenticated and anonymous users
GRANT SELECT ON public.public_reviews TO authenticated, anon;

-- Add helpful comment for future reference
COMMENT ON VIEW public.public_reviews IS 'Public view of reviews that excludes user_id to protect user privacy. Use this view for displaying reviews to unauthenticated users.';

-- Note: For column-level encryption of phone numbers in profiles table,
-- this requires pgsodium extension and additional setup.
-- Recommendation: Keep current RLS implementation as it provides adequate protection.
-- Column encryption can be added later if needed for compliance requirements.
