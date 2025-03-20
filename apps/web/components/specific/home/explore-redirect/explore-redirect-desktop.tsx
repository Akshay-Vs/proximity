'use client';
import SearchBar from '@/components/shared/input/search-bar';
import { useSearchStore } from '@/stores/search-store';
import { Compass } from 'lucide-react';
import { useRouter } from 'nextjs-toploader/app';
import { useEffect } from 'react';

const ExploreRedirectDesktop = () => {
	const router = useRouter();
	const { setQuery } = useSearchStore();

	useEffect(() => {
		setQuery('');
	}, [setQuery]);

	return (
		<div className="padding w-2/5 flex gap-4">
			<SearchBar
				readonly={false}
				onInputClick={(e) => {
					e?.preventDefault();
				}}
				after={
					<div className='h-full w-fit flex items-center'>
						<button
						className="h-3/5 center w-fit pl-4 m-0 border-l-2 border-[#919091]"
						aria-label={'Explore'}
						onClick={() => router.push('/explore')}
					>
						<Compass className=" text-text" strokeWidth={1.6}/>
					</button>
					</div>
				}
			/>
		</div>
	);
};

export default ExploreRedirectDesktop;
