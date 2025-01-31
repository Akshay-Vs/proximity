import Header from '@/components/specific/header/nav-header';
import { PropsWithChildren } from 'react';

const layout = ({ children }: PropsWithChildren) => {
	return (
		<main className="w-full h-full flex flex-col gap-4 justify-center items-center">
			<Header />
			{children}
		</main>
	);
};

export default layout;
