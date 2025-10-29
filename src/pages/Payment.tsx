import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, CheckCircle } from "lucide-react";

const Payment = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetchBooking();
  }, [bookingId]);

  const fetchBooking = async () => {
    try {
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .eq("id", bookingId)
        .single();

      if (error) throw error;
      
      if (!data.admin_approved) {
        toast({
          title: "Booking Not Approved",
          description: "This booking has not been approved yet",
          variant: "destructive",
        });
        navigate("/bookings");
        return;
      }

      if (data.payment_status === "paid") {
        toast({
          title: "Already Paid",
          description: "This booking has already been paid",
        });
        navigate("/bookings");
        return;
      }

      setBooking(data);
    } catch (error) {
      console.error("Error fetching booking:", error);
      toast({
        title: "Error",
        description: "Failed to load booking details",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    setProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Update booking status
      const { error } = await supabase
        .from("bookings")
        .update({
          payment_status: "paid",
          status: "confirmed",
        })
        .eq("id", bookingId);

      if (error) throw error;

      toast({
        title: "Payment Successful",
        description: "Your booking is now confirmed!",
      });

      // Generate proof of payment
      navigate(`/payment-proof/${bookingId}`);
      
    } catch (error) {
      console.error("Payment error:", error);
      toast({
        title: "Payment Failed",
        description: "Please try again or contact support",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container py-8">
          <p>Loading payment details...</p>
        </div>
      </Layout>
    );
  }

  if (!booking) {
    return (
      <Layout>
        <div className="container py-8">
          <p>Booking not found</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8 max-w-2xl">
        <h1 className="font-montserrat text-3xl font-bold text-primary mb-8">
          Complete Your Payment
        </h1>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Booking Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Guest Name</span>
              <span className="font-semibold">{booking.guest_name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Check-in</span>
              <span className="font-semibold">
                {new Date(booking.check_in_date).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Check-out</span>
              <span className="font-semibold">
                {new Date(booking.check_out_date).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Number of Guests</span>
              <span className="font-semibold">{booking.guests}</span>
            </div>
            <div className="border-t pt-3 flex justify-between text-lg">
              <span className="font-bold">Total Amount</span>
              <span className="font-bold text-primary">R{booking.total_price}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-muted-foreground mb-4">
                This is a demo payment page. In production, integrate with a payment gateway like Stripe or PayFast.
              </p>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Card Number</label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full p-2 border rounded-lg"
                    disabled={processing}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">Expiry Date</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full p-2 border rounded-lg"
                      disabled={processing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">CVV</label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full p-2 border rounded-lg"
                      disabled={processing}
                    />
                  </div>
                </div>
              </div>
            </div>

            <Button
              onClick={handlePayment}
              disabled={processing}
              className="w-full"
              size="lg"
            >
              {processing ? (
                <>Processing...</>
              ) : (
                <>
                  <CreditCard className="mr-2 h-5 w-5" />
                  Pay R{booking.total_price}
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Payment;
