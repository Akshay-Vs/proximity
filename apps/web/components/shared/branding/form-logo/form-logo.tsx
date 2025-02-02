import Logo from '@/public/images/Logo.png';
import Image from 'next/image';

const FormLogo = () => {
	return (
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
	);
};

export default FormLogo;
