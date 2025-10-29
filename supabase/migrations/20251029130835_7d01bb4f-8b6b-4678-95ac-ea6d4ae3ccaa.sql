-- Assign admin role to existing user
-- This will grant admin privileges to nhlakasena@gmail.com

INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role
FROM auth.users
WHERE email = 'nhlakasena@gmail.com'
ON CONFLICT (user_id, role) DO NOTHING;