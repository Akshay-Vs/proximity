'use client';
import SearchBar from '@/components/shared/search-bar/search-bar';
import { useRouter } from 'next/navigation';

const ExploreRedirect = () => {
	const router = useRouter();
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
