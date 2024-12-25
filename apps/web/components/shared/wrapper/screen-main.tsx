'use client';

import { useScreen } from '@/hooks/use-screen';

const ScreenMain = () => {
	const { screen } = useScreen();
	return <main>{screen}</main>;
};

export default ScreenMain;
