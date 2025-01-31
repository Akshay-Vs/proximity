'use client';
import SearchBar from '@/components/shared/search-bar/search-bar';
import { useRouter } from 'next/navigation';

const ExploreSearch = () => {
	const router = useRouter();
	return <SearchBar icon="cheveron" onIconClick={() => router.back()} />;
};

export default ExploreSearch;
