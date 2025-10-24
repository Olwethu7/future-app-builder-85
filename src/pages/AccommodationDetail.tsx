import { useParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";

const AccommodationDetail = () => {
  const { id } = useParams();

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="font-montserrat text-3xl font-bold text-primary mb-4">
          Accommodation Details
        </h1>
        <p className="text-muted-foreground">
          Viewing accommodation ID: {id}
        </p>
      </div>
    </Layout>
  );
};

export default AccommodationDetail;
