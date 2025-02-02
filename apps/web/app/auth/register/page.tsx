import SocialLogin from '@/components/specific/auth/social/social-login';
import ActiveMatrix from '@/components/shared/branding/credit/active-matrix';
import FormLogo from '@/components/shared/branding/form-logo/form-logo';
import RegisterForm from '@/components/specific/auth/register/register-form';

const RegisterPage = () => {
	return (
		<div className="screen spacing">
			<FormLogo />
			<RegisterForm />
			<SocialLogin />
			<ActiveMatrix />
		</div>
	);
};

export default RegisterPage;
