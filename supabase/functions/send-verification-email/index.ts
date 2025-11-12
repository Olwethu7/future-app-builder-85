import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
    
  }

  try {
    const { email, fullName, verificationToken } = await req.json();
    
    const clientId = Deno.env.get("NOTIFICATIONAPI_CLIENT_ID");
    const clientSecret = Deno.env.get("NOTIFICATIONAPI_CLIENT_SECRET");
    
    if (!clientId || !clientSecret) {
      throw new Error("NotificationAPI credentials not configured");
    }
    
    const authHeader = 'Basic ' + btoa(`${clientId}:${clientSecret}`);
    
    // Generate verification link
    const siteUrl = "https://dhcgzqdzytepfutpqtwg.supabase.co";
    const verificationLink = `${siteUrl}/auth/v1/verify?token=${verificationToken}&type=signup`;
    
    console.log('Sending verification email to:', email);
    console.log('Verification link:', verificationLink);
    
    const response = await fetch('https://api.notificationapi.com/sender/notifications', {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        notificationId: 'email_verification',
        user: {
          id: email,
          email: email
        },
        mergeTags: {
          fullName: fullName,
          verificationLink: verificationLink,
          email: email
        }
      })
    });
    
    const responseText = await response.text();
    console.log('NotificationAPI response:', response.status, responseText);
    
    if (!response.ok) {
      throw new Error(`NotificationAPI error: ${response.status} - ${responseText}`);
    }
    
    return new Response(
      JSON.stringify({ success: true, message: "Verification email sent" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Error sending verification email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
