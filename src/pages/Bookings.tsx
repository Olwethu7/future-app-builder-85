import { Layout } from "@/components/layout/Layout";

const Bookings = () => {
  return (
    <Layout>
      <div className="container py-8">
        <h1 className="font-montserrat text-3xl font-bold text-primary mb-4">
          My Bookings
        </h1>
        <p className="text-muted-foreground">
          View and manage your reservations
        </p>
      </div>
    </Layout>
  );
};

export default Bookings;
