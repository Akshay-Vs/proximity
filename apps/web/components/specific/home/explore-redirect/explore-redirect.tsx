'use client';
import SearchBar from '@/components/shared/search-bar/search-bar';
import { useSearchStore } from '@/stores/search-store';
import { useRouter } from 'nextjs-toploader/app';
import { useEffect } from 'react';

const ExploreRedirect = () => {
	const router = useRouter();
	const { setQuery } = useSearchStore();

	useEffect(() => {
		setQuery('');
	}, [setQuery]);

	return (
		<div className="spacing">
			<SearchBar
				readonly={true}
				onContainerClick={() => router.push('/explore')}
				onInputClick={(e) => {
					e?.preventDefault();
				}}
			/>
		</div>
	);
};

export default ExploreRedirect;
