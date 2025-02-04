import { Geist, Jost } from 'next/font/google';

import { myMetadata, myViewport } from '@/pwa';

import '@proximity/ui/styles.css';
import '@/styles/globals.scss';

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
			<body className={`${geistSans.variable} ${jost.variable} antialiased`}>
				{children}
			</body>
		</html>
	);
};

RootLayout.displayName = 'NextJSRootLayout';

export default RootLayout;
