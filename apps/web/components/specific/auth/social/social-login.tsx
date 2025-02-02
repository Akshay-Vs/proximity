import OAuthGoogle from './oauth-google';
import OAuthFacebook from './oauth-facebook';
import OAuthGithub from './oauth-github';

const SocialLogin = () => {
	return (
		<div className="flex flex-col gap-4 mt-6">
			<p className="text-sm text-center">Or continue with</p>
			<div className="flex gap-4">
				<OAuthGoogle />
				<OAuthFacebook />
				<OAuthGithub />
			</div>
		</div>
	);
};

export default SocialLogin;
