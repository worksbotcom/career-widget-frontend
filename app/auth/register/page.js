import AuthLayout from "@/components/layout/AuthLayout";
import RegisterForm from "@/components/auth/RegistrationForm";

export default function RegisterPage() {

    return (

        <AuthLayout

            title="Create Company Account"

            subtitle="Register your company to start hiring."

        >

            <RegisterForm />

        </AuthLayout>

    );

}