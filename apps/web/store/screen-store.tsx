import HomeScreen from '@/screens/home-screen';
import { ReactElement, ReactNode } from 'react';
import { create } from 'zustand';

interface ScreenStore {
	screen: ReactNode | ReactElement;
	setScreen: (screen: ReactNode | ReactElement) => void;
}

export const useScreenStore = create<ScreenStore>((set) => ({
	screen: <HomeScreen />,
	setScreen: (screen: ReactNode | ReactElement) => set({ screen }),
}));
