import { create } from 'zustand';

interface SearchStore {
	query: string;
	result: string[];
	showTopicSuggestion: boolean;

	setQuery: (query: string) => void;
	setResult: (result: string[]) => void;
	setShowTopicSuggestion: (show: boolean) => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
	query: '',
	result: [],
	showTopicSuggestion: false,

	setQuery: (query) => set({ query }),
	setResult: (result) => set({ result }),
	setShowTopicSuggestion: (show) => set({ showTopicSuggestion: show }),
}));
