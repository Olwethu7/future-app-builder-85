import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { bookingId } = await req.json();

    // Fetch booking details
    const { data: booking, error: bookingError } = await supabaseClient
      .from("bookings")
      .select("*")
      .eq("id", bookingId)
      .single();

    if (bookingError) throw bookingError;

    // Create payment link (for now, just return a placeholder)
    const paymentLink = `${req.headers.get("origin")}/payment/${bookingId}`;

    // Send email (placeholder - requires RESEND_API_KEY to be configured)
    console.log(`
      Sending approval email to: ${booking.guest_email}
      Booking ID: ${bookingId}
      Payment Link: ${paymentLink}
      Guest Name: ${booking.guest_name}
      Total: R${booking.total_price}
      Check-in: ${booking.check_in_date}
      Check-out: ${booking.check_out_date}
    `);

    // TODO: Implement actual email sending with Resend
    // const resendApiKey = Deno.env.get("RESEND_API_KEY");
    // if (resendApiKey) {
    //   const Resend = (await import("npm:resend@2.0.0")).Resend;
    //   const resend = new Resend(resendApiKey);
    //   await resend.emails.send({
    //     from: "Zulu Lami <bookings@zululami.co.za>",
    //     to: booking.guest_email,
    //     subject: "Booking Approved - Payment Required",
    //     html: `...email template...`
    //   });
    // }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Approval email sent",
        paymentLink 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
