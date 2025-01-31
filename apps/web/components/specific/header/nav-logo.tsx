import Logo from '@/public/images/Logo.png';
import Image from 'next/image';
import Link from 'next/link';

const NavLogo = () => {
	return (
		<Link href="/" className="flex gap-2 items-center">
			<Image
				src={Logo}
				alt="Logo"
				width={46}
				height={46}
				className="object-center object-contain"
			/>
			<h1 className="text-2xl font-jost">Proximity</h1>
		</Link>
	);
};

export default NavLogo;
