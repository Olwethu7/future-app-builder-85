import { useParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";

const Booking = () => {
  const { id } = useParams();

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="font-montserrat text-3xl font-bold text-primary mb-4">
          Complete Your Booking
        </h1>
        <p className="text-muted-foreground">
          Booking accommodation ID: {id}
        </p>
      </div>
    </Layout>
  );
};

export default Booking;
