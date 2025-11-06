-- One-time cleanup: Delete all user-related data
-- This allows fresh start for new user registrations

-- Delete in correct order due to potential dependencies
DELETE FROM bookings;
DELETE FROM saved_accommodations;
DELETE FROM reviews;
DELETE FROM user_roles;
DELETE FROM profiles;

-- Note: Auth users must be deleted manually from Supabase Dashboard
-- Go to: Authentication -> Users and delete all users