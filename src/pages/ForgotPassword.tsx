import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ArrowLeft, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    const { error } = await supabase.auth.resetPasswordForEmail(values.email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to send reset email",
        variant: "destructive",
      });
    } else {
      setIsSubmitted(true);
      toast({
        title: "Email Sent",
        description: "Check your email for password reset instructions",
      });
    }
  };

  return (
    <Layout>
      <div className="container max-w-md py-16">
        <Link to="/login" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Login
        </Link>

        <Card>
          <CardHeader>
            <CardTitle className="font-montserrat">Reset Password</CardTitle>
            <CardDescription>
              {isSubmitted 
                ? "Check your email for reset instructions" 
                : "Enter your email to receive a password reset link"}
            </CardDescription>
          </CardHeader>
          
          {!isSubmitted ? (
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    {...form.register("email")}
                  />
                  {form.formState.errors.email && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.email.message}
                    </p>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Send Reset Link
                </Button>
              </CardFooter>
            </form>
          ) : (
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <p className="text-muted-foreground">
                  We've sent a password reset link to <strong>{form.getValues("email")}</strong>
                </p>
                <p className="text-sm text-muted-foreground">
                  If you don't see the email, check your spam folder or{" "}
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-primary hover:underline"
                  >
                    try another email
                  </button>
                </p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </Layout>
  );
};

export default ForgotPassword;


