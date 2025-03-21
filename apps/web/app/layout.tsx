import { Geist, Jost } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';

import { TooltipProvider } from '@proximity/ui/shadcn/tooltip';

import { myMetadata, myViewport } from '@/pwa';

import '@proximity/ui/styles.css';
import '@/styles/globals.scss';
import '@/styles/tailwind.css';
import '@/styles/properties.css';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const jost = Jost({
	variable: '--font-jost-mono',
	subsets: ['latin'],
});

export const metadata = myMetadata;
export const viewport = myViewport;

const RootLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${jost.variable} antialiased`}
			>
				<div className="absolute top-0 left-0 w-full h-2">
					<NextTopLoader color="#484848" shadow="none" showSpinner={false} />
				</div>
				<TooltipProvider>
					{children}
				</TooltipProvider>
			</body>
		</html>
	);
};

RootLayout.displayName = 'NextJSRootLayout';

export default RootLayout;
