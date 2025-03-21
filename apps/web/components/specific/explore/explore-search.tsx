'use client';
import SearchBar from '@/components/shared/input/search-bar';
import { useSearchStore } from '@/stores/search-store';
import { useRouter } from 'nextjs-toploader/app';

const ExploreSearch = () => {
	const router = useRouter();
	const { query, setQuery } = useSearchStore();

	return (
		<div className='w-full lg:hidden'>
			<SearchBar
			icon="chevron"
			onIconClick={() => {
				if (query) setQuery('');
				else router.push('/');
			}}
		/>
		</div>
	);
};

export default ExploreSearch;
