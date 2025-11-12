-- Fix: Remove SECURITY DEFINER from public_reviews view

-- Views should use SECURITY INVOKER (default) to enforce RLS of the querying user

DROP VIEW IF EXISTS public.public_reviews;

CREATE OR REPLACE VIEW public.public_reviews
WITH (security_invoker = true)
AS
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
  -- Replace user_id with a pseudonymous identifier to protect privacy
  encode(digest(user_id::text || 'zulu-lami-salt-2024', 'sha256'), 'hex') as guest_identifier
FROM public.reviews;

-- Grant SELECT access to the view
GRANT SELECT ON public.public_reviews TO authenticated, anon;

-- Add helpful comment
COMMENT ON VIEW public.public_reviews IS 'Public view of reviews that excludes user_id to protect user privacy. Uses security_invoker to enforce RLS of querying user.';
