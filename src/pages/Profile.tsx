import { Layout } from "@/components/layout/Layout";

const Profile = () => {
  return (
    <Layout>
      <div className="container py-8">
        <h1 className="font-montserrat text-3xl font-bold text-primary mb-4">
          My Profile
        </h1>
        <p className="text-muted-foreground">
          Manage your account and preferences
        </p>
      </div>
    </Layout>
  );
};

export default Profile;
