import { AdminSidebar } from "@/components/layout/AdminSidebar";

const AdminBookings = () => {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <h1 className="font-montserrat text-3xl font-bold text-primary mb-4">
          Booking Management
        </h1>
        <p className="text-muted-foreground">
          View and manage all reservations
        </p>
      </main>
    </div>
  );
};

export default AdminBookings;
