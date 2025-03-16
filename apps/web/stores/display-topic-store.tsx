import { create } from 'zustand';

interface DisplayTopicStore {
	topic: string;
	setTopic: (topic: string) => void;
	isLoading: boolean;
	setIsLoading: (isLoading: boolean) => void;
}

export const useDisplayTopicStore = create<DisplayTopicStore>((set) => ({
	topic: '',
	isLoading: false,
	setTopic: (topic) => set({ topic }),
	setIsLoading: (isLoading) => set({ isLoading }),
}));
