import { Layout } from "@/components/layout/Layout";

const Login = () => {
  return (
    <Layout>
      <div className="container max-w-md py-16">
        <h1 className="font-montserrat text-3xl font-bold text-primary mb-4 text-center">
          Welcome Back
        </h1>
        <p className="text-muted-foreground text-center mb-8">
          Sign in to your account
        </p>
      </div>
    </Layout>
  );
};

export default Login;
