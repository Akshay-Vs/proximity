import { create } from 'zustand';

interface SearchStore {
	query: string;
	result: string[];

	setQuery: (query: string) => void;
	setResult: (result: string[]) => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
	query: '',
	result: [],

	setQuery: (query) => set({ query }),
	setResult: (result) => set({ result }),
}));
