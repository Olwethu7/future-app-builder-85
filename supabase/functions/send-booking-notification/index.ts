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

    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const { record } = await req.json();
    const booking = record;

    // Fetch room details
    const { data: room } = await supabaseClient
      .from("rooms")
      .select("name, room_type")
      .eq("id", booking.room_id)
      .single();

    const roomName = room?.name || "Room";
    const roomType = room?.room_type || "N/A";

    // Admin notification email
    const adminEmailSubject = `New Booking Request - ${roomName}`;
    const adminEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #1B4332 0%, #2D6A4F 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #fff; padding: 30px; border: 1px solid #e0e0e0; }
          .footer { background: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #666; border-radius: 0 0 10px 10px; }
          .booking-details { background: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0; }
          .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e0e0e0; }
          .detail-label { font-weight: bold; color: #1B4332; }
          .price { font-size: 24px; color: #E76F51; font-weight: bold; margin: 15px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔔 New Booking Alert</h1>
            <p>Zulu Lami Eco-Resort</p>
          </div>
          <div class="content">
            <h2>New Booking Request Received</h2>
            <p>A new booking has been submitted on your website:</p>
            
            <div class="booking-details">
              <h3 style="margin-top: 0; color: #1B4332;">Booking Information</h3>
              
              <div class="detail-row">
                <span class="detail-label">Booking Reference:</span>
                <span>${booking.id.substring(0, 8).toUpperCase()}</span>
              </div>
              
              <div class="detail-row">
                <span class="detail-label">Room Type:</span>
                <span>${roomType.charAt(0).toUpperCase() + roomType.slice(1)}</span>
              </div>
              
              <div class="detail-row">
                <span class="detail-label">Room Name:</span>
                <span>${roomName}</span>
              </div>
              
              <div class="detail-row">
                <span class="detail-label">Check-in Date:</span>
                <span>${new Date(booking.check_in_date).toLocaleDateString('en-ZA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              
              <div class="detail-row">
                <span class="detail-label">Check-out Date:</span>
                <span>${new Date(booking.check_out_date).toLocaleDateString('en-ZA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              
              <div class="detail-row">
                <span class="detail-label">Number of Guests:</span>
                <span>${booking.guests}</span>
              </div>
              
              <div class="price">
                Total Amount: R${Number(booking.total_price).toFixed(2)}
              </div>
            </div>

            <div class="booking-details">
              <h3 style="margin-top: 0; color: #1B4332;">Guest Information</h3>
              
              <div class="detail-row">
                <span class="detail-label">Name:</span>
                <span>${booking.guest_name}</span>
              </div>
              
              <div class="detail-row">
                <span class="detail-label">Email:</span>
                <span>${booking.guest_email}</span>
              </div>
              
              <div class="detail-row">
                <span class="detail-label">Phone:</span>
                <span>${booking.guest_phone}</span>
              </div>
              
              ${booking.special_requests ? `
              <div style="margin-top: 15px; padding: 10px; background: #fff3cd; border-radius: 5px;">
                <strong>Special Requests:</strong>
                <p style="margin: 5px 0 0 0;">${booking.special_requests}</p>
              </div>
              ` : ''}
            </div>

            <div style="background: #e8f5e9; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <p style="margin: 0;"><strong>✓ Status:</strong> Booking Pending Approval</p>
              <p style="margin: 5px 0 0 0; font-size: 12px; color: #666;">Payment instructions will be sent to the guest via email.</p>
            </div>

            <p style="margin-top: 30px; font-size: 12px; color: #666;">
              <strong>Next Steps:</strong><br>
              1. Review the booking details above<br>
              2. Contact the guest if needed using the provided contact information<br>
              3. Ensure the room is prepared for the check-in date
            </p>
          </div>
          <div class="footer">
            <p>Zulu Lami Eco-Resort Booking System</p>
            <p>KwaZulu-Natal, South Africa</p>
            <p style="margin-top: 10px; color: #999;">This is an automated notification. Do not reply to this email.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Guest confirmation email
    const guestEmailSubject = `Booking Confirmation - Zulu Lami Eco-Resort`;
    const guestEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #1B4332 0%, #2D6A4F 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #fff; padding: 30px; border: 1px solid #e0e0e0; }
          .footer { background: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #666; border-radius: 0 0 10px 10px; }
          .booking-details { background: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0; }
          .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e0e0e0; }
          .detail-label { font-weight: bold; color: #1B4332; }
          .price { font-size: 24px; color: #E76F51; font-weight: bold; margin: 15px 0; text-align: center; }
          .highlight { background: #e8f5e9; padding: 15px; border-radius: 5px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✓ Booking Confirmed!</h1>
            <p>Thank you for choosing Zulu Lami Eco-Resort</p>
          </div>
          <div class="content">
            <h2>Dear ${booking.guest_name},</h2>
            <p>Thank you for your booking! We're excited to welcome you to Zulu Lami Eco-Resort.</p>
            
            <div class="highlight">
              <p style="margin: 0; text-align: center;"><strong>📋 Your Booking Reference</strong></p>
              <p style="margin: 10px 0 0 0; text-align: center; font-size: 20px; font-weight: bold; color: #1B4332;">${booking.id.substring(0, 8).toUpperCase()}</p>
            </div>
            
            <div class="booking-details">
              <h3 style="margin-top: 0; color: #1B4332;">Your Booking Details</h3>
              
              <div class="detail-row">
                <span class="detail-label">Room Type:</span>
                <span>${roomType.charAt(0).toUpperCase() + roomType.slice(1)}</span>
              </div>
              
              <div class="detail-row">
                <span class="detail-label">Room Name:</span>
                <span>${roomName}</span>
              </div>
              
              <div class="detail-row">
                <span class="detail-label">Check-in:</span>
                <span>${new Date(booking.check_in_date).toLocaleDateString('en-ZA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              
              <div class="detail-row">
                <span class="detail-label">Check-out:</span>
                <span>${new Date(booking.check_out_date).toLocaleDateString('en-ZA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              
              <div class="detail-row">
                <span class="detail-label">Number of Guests:</span>
                <span>${booking.guests}</span>
              </div>
              
              <div class="price">
                Total: R${Number(booking.total_price).toFixed(2)}
              </div>
            </div>

            ${booking.special_requests ? `
            <div style="margin: 20px 0; padding: 15px; background: #fff3cd; border-radius: 5px;">
              <strong>Your Special Requests:</strong>
              <p style="margin: 5px 0 0 0;">${booking.special_requests}</p>
              <p style="margin: 10px 0 0 0; font-size: 12px; color: #666;">We've received your special requests and will do our best to accommodate them.</p>
            </div>
            ` : ''}

            <div style="background: #e3f2fd; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <p style="margin: 0;"><strong>💳 Payment Information</strong></p>
              <p style="margin: 10px 0 0 0;">Our team will contact you shortly with payment instructions and details.</p>
            </div>

            <div style="margin: 30px 0; padding: 20px; background: #f9f9f9; border-left: 4px solid #1B4332; border-radius: 5px;">
              <h3 style="margin-top: 0; color: #1B4332;">What's Next?</h3>
              <p style="margin: 5px 0;">✓ You'll receive payment details via email shortly</p>
              <p style="margin: 5px 0;">✓ Check-in time: 2:00 PM</p>
              <p style="margin: 5px 0;">✓ Check-out time: 10:00 AM</p>
              <p style="margin: 5px 0;">✓ Contact us anytime at <a href="mailto:developmentteam86@gmail.com">developmentteam86@gmail.com</a></p>
            </div>

            <p style="margin-top: 30px;">We look forward to hosting you at Zulu Lami Eco-Resort!</p>
            <p>Best regards,<br><strong>The Zulu Lami Team</strong></p>
          </div>
          <div class="footer">
            <p><strong>Zulu Lami Eco-Resort</strong></p>
            <p>KwaZulu-Natal, South Africa</p>
            <p>Email: developmentteam86@gmail.com</p>
            <p style="margin-top: 15px; color: #999;">Thank you for choosing sustainable tourism!</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send admin notification email
    const adminEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Zulu Lami Booking System <onboarding@resend.dev>",
        to: ["developmentteam86@gmail.com"],
        subject: adminEmailSubject,
        html: adminEmailHtml,
      }),
    });

    if (!adminEmailResponse.ok) {
      const errorData = await adminEmailResponse.json();
      console.error("Admin email error:", errorData);
      throw new Error(`Failed to send admin email: ${errorData.message || adminEmailResponse.statusText}`);
    }

    const adminEmailData = await adminEmailResponse.json();
    console.log(`Admin notification sent to developmentteam86@gmail.com`, adminEmailData);

    // Send guest confirmation email
    const guestEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Zulu Lami Eco-Resort <onboarding@resend.dev>",
        to: [booking.guest_email],
        subject: guestEmailSubject,
        html: guestEmailHtml,
      }),
    });

    if (!guestEmailResponse.ok) {
      const errorData = await guestEmailResponse.json();
      console.error("Guest email error:", errorData);
      // Don't throw error here, admin email is more critical
      console.warn(`Failed to send guest confirmation email to ${booking.guest_email}`);
    } else {
      const guestEmailData = await guestEmailResponse.json();
      console.log(`Guest confirmation sent to ${booking.guest_email}`, guestEmailData);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Booking notifications sent successfully",
        adminEmailId: adminEmailData?.id,
        guestEmailSent: guestEmailResponse.ok
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error in send-booking-notification function:", error);
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
