import { useScreenStore } from '@/store/screen-store';
import { Screen } from '@/types/screen';

export const useScreen = () => {
	const { screen, setScreen } = useScreenStore();

	const setScreenWithCallback = <T>(screen: Screen, callback?: () => T) => {
		setScreen(screen);
		callback?.();
	};

	const setScreenWithCallbackAsync = <T>(screen: Screen, callback?: () => Promise<T>) => {
		setScreen(screen);
		callback?.();
	};

	return { screen, setScreen, setScreenWithCallback, setScreenWithCallbackAsync };
};
