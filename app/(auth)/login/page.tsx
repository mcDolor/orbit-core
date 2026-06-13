import AuthLayout from "@/components/auth/AuthLayout";
import AuthCard from "@/components/auth/AuthCard";
import FormPanel from "@/components/auth/login/form-panel";
import FormWrapper from "@/components/auth/login/form-wrapper";
import LoginForm from "@/components/auth/login/login-from";

export default function Page() {
  return (
    <AuthLayout>
      <FormPanel>
        <AuthCard>
          <FormWrapper heading="Welcome Back, Officer" description="Sign in to start managing your organization with ease.">
            <LoginForm />
          </FormWrapper>
        </AuthCard>
      </FormPanel>
    </AuthLayout>
  );
}