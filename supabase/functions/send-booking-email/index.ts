import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const SENDGRID_API_KEY = Deno.env.get('SENDGRID_API_KEY');
const SENDGRID_API_URL = 'https://api.sendgrid.com/v3/mail/send';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface BookingEmailRequest {
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  roomName: string;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  totalPrice: number;
  specialRequests?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!SENDGRID_API_KEY) {
      throw new Error('SENDGRID_API_KEY is not configured');
    }

    const bookingData: BookingEmailRequest = await req.json();
    console.log('Received booking data:', bookingData);

    // Calculate number of nights
    const checkIn = new Date(bookingData.checkInDate);
    const checkOut = new Date(bookingData.checkOutDate);
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));

    // Format the admin email body
    const adminEmailBody = `
A new booking form was submitted:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GUEST INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Name: ${bookingData.guestName}
Email: ${bookingData.guestEmail}
Phone: ${bookingData.guestPhone}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BOOKING DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Room: ${bookingData.roomName}
Check-in: ${bookingData.checkInDate}
Check-out: ${bookingData.checkOutDate}
Number of Nights: ${nights}
Number of Guests: ${bookingData.guests}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PRICING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Total Amount: R${bookingData.totalPrice}

${bookingData.specialRequests ? `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SPECIAL REQUESTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${bookingData.specialRequests}` : ''}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This is an automated notification from Zulu Lami Eco-Resort booking system.
    `.trim();

    // Format the guest confirmation email
    const guestEmailBody = `
Dear ${bookingData.guestName},

Thank you for submitting your booking request to Zulu Lami Eco-Resort.

This is an automatic confirmation to let you know that we have successfully received your submission. Our team will now review the details you have provided and begin working on it.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
YOUR BOOKING DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Room: ${bookingData.roomName}
Check-in Date: ${bookingData.checkInDate}
Check-out Date: ${bookingData.checkOutDate}
Number of Nights: ${nights}
Number of Guests: ${bookingData.guests}
Total Amount: R${bookingData.totalPrice}

${bookingData.specialRequests ? `Special Requests: ${bookingData.specialRequests}` : ''}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

We will notify you once the process is complete or if we require any additional information from you.

We appreciate your patience.

Best regards,
The Zulu Lami Team
    `.trim();

    // Prepare SendGrid email payload for admin
    const adminEmailPayload = {
      personalizations: [
        {
          to: [{ email: 'developmentteam86@gmail.com' }],
          subject: `New Booking: ${bookingData.roomName} - ${bookingData.guestName}`,
        },
      ],
      from: {
        email: 'no-reply@webeasybooking.com',
        name: 'Zulu Lami Eco-Resort',
      },
      content: [
        {
          type: 'text/plain',
          value: adminEmailBody,
        },
      ],
    };

    // Prepare SendGrid email payload for guest
    const guestEmailPayload = {
      personalizations: [
        {
          to: [{ email: bookingData.guestEmail }],
          subject: 'Confirmation of Your Booking Request Submission',
        },
      ],
      from: {
        email: 'no-reply@webeasybooking.com',
        name: 'Zulu Lami Eco-Resort',
      },
      content: [
        {
          type: 'text/plain',
          value: guestEmailBody,
        },
      ],
    };

    console.log('Sending emails via SendGrid...');

    // Send admin email via SendGrid API
    const adminResponse = await fetch(SENDGRID_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(adminEmailPayload),
    });

    if (!adminResponse.ok) {
      const errorText = await adminResponse.text();
      console.error('SendGrid admin email error:', errorText);
      throw new Error(`SendGrid API error: ${adminResponse.status} - ${errorText}`);
    }

    console.log('✅ Admin email sent successfully to developmentteam86@gmail.com');

    // Send guest confirmation email
    const guestResponse = await fetch(SENDGRID_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(guestEmailPayload),
    });

    if (!guestResponse.ok) {
      const errorText = await guestResponse.text();
      console.error('SendGrid guest email error:', errorText);
      // Don't throw here, admin email was sent successfully
      console.log('⚠️ Guest email failed but admin email succeeded');
    } else {
      console.log(`✅ Guest confirmation email sent successfully to ${bookingData.guestEmail}`);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Booking email sent successfully!' 
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error('Error in send-booking-email function:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message,
        message: 'Failed to send booking email.' 
      }),
      {
        status: 500,
        headers: { 
          'Content-Type': 'application/json', 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);
