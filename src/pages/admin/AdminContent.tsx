import { AdminSidebar } from "@/components/layout/AdminSidebar";


const AdminContent = () => {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <h1 className="font-montserrat text-3xl font-bold text-primary mb-4">
          Content Management
        </h1>
        <p className="text-muted-foreground">
          Upload photos and manage content
        </p>
      </main>
    </div>
  );
};

export default AdminContent;
