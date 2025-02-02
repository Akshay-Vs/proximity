import Link from 'next/link';
import { FaFacebook } from 'react-icons/fa';

const OAuthFacebook = () => {
	return (
		<Link href="/api/auth/google" className="p-2">
			<FaFacebook className="text-xl" />
		</Link>
	);
};

export default OAuthFacebook;
