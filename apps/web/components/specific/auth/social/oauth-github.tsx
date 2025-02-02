import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';

const OAuthGithub = () => {
	return (
		<Link href="/api/auth/google" className="p-2">
			<FaGithub className="text-xl" />
		</Link>
	);
};

export default OAuthGithub;
