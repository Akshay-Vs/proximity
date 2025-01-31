'use client';
import SearchBar from '@/components/shared/search-bar/search-bar';
import { useSearchStore } from '@/stores/search-store';
import { useRouter } from 'next/navigation';

const ExploreSearch = () => {
	const router = useRouter();
	const { query, setQuery } = useSearchStore();

	return (
		<SearchBar
			icon="chevron"
			onIconClick={() => {
				if (query) setQuery('');
				else router.push('/');
			}}
		/>
	);
};

export default ExploreSearch;
