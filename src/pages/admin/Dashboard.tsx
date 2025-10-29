import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { DashboardStats } from "@/components/admin/DashboardStats";
import { RecentBookings } from "@/components/admin/RecentBookings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const { data: pendingCount } = useQuery({
    queryKey: ["pending-bookings-count"],
    queryFn: async () => {
      const { count } = await supabase
        .from("bookings")
        .select("*", { count: "exact", head: true })
        .eq("status", "pending");
      return count || 0;
    },
  });

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 p-8 space-y-8">
        <div>
          <h1 className="font-montserrat text-3xl font-bold text-primary mb-2">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            Overview of your resort operations
          </p>
        </div>

        <DashboardStats />

        {pendingCount && pendingCount > 0 && (
          <Card className="border-orange-200 bg-orange-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-900">
                <AlertCircle className="h-5 w-5" />
                Pending Approvals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-orange-800 mb-4">
                You have {pendingCount} booking{pendingCount !== 1 ? "s" : ""} waiting for approval
              </p>
              <Button onClick={() => navigate("/admin/booking-management")}>
                Review Bookings
              </Button>
            </CardContent>
          </Card>
        )}

        <div>
          <h2 className="font-montserrat text-2xl font-bold text-primary mb-4">
            Recent Bookings
          </h2>
          <RecentBookings />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
