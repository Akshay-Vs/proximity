import { create } from 'zustand';

interface DisplayTopicStore {
	topic: string;
	setTopic: (topic: string) => void;
	loading: string;
	setLoading: (isLoading: string) => void;
}

const defaultTopic = 'latest';

export const useDisplayTopicStore = create<DisplayTopicStore>((set) => ({
	topic: defaultTopic,
	loading: '',
	setTopic: (topic) => set({ topic }),
	setLoading: (loading) => set({ loading }),
}));
