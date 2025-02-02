import Link from 'next/link';
import { FaGoogle } from 'react-icons/fa';
const OAuthGoogle = () => {
	return (
		<Link href="/api/auth/google" className="p-2">
			<FaGoogle className="text-xl" />
		</Link>
	);
};

export default OAuthGoogle;
