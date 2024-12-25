import { useScreenStore } from '@/store/screen-store';
import { Screen } from '@/types/screen';

export const useScreen = () => {
	const { screen, setScreen } = useScreenStore();

	const setScreenWithCallback = <T>(screen: Screen, callback?: () => T) => {
		setScreen(screen);
		callback?.();
	};

	const setScreenWithCallbackAsync = async <T>(screen: Screen, callback?: () => Promise<T>) => {
		setScreen(screen);
		await callback?.();
	};

	return { screen, setScreen, setScreenWithCallback, setScreenWithCallbackAsync };
};
