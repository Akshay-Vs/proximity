import LoginForm from '@/components/specific/auth/login/login-form';
import Logo from '@/public/images/Logo.png';
import Image from 'next/image';
import SocialLogin from '@/components/specific/auth/social/social-login';
import ActiveMatrix from '@/components/shared/branding/credit/active-matrix';

const LoginPage = () => {
	return (
		<div className="screen spacing">
			<div className="mb-16 center flex-col">
				<Image
					src={Logo}
					alt="Logo"
					width={46}
					height={46}
					className="object-center object-contain"
				/>
				<h1 className="text-2xl font-jost">Proximity</h1>
			</div>
			<LoginForm />
			<SocialLogin />

			<ActiveMatrix />
		</div>
	);
};

export default LoginPage;
