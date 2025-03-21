import { PropsWithChildren } from 'react';
import Image from 'next/image';

const layout = ({ children }: PropsWithChildren) => {
	return (
		<div className="flex gap-6 full center">
			{children}
			<Image
				src="/images/mockup.png"
				alt="mockup"
				width={2000}
				height={1106}
				className="hidden xl:flex h-screen w-[60dvw] object-center object-cover"
			/>
		</div>
	);
};

export default layout;
