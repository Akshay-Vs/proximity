'use client';
import SearchBar from '@/components/shared/input/search-bar';
import { useSearchStore } from '@/stores/search-store';
import { Compass } from 'lucide-react';
import { useEffect } from 'react';
import RecomendedTopicsDesktop from '../../explore/recomended-topics-desktop';
import Link from 'next/link';
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@proximity/ui/shadcn/tooltip';

const ExploreRedirectDesktop = () => {
	const { setQuery, setShowTopicSuggestion, showTopicSuggestion } =
		useSearchStore();

	useEffect(() => {
		setQuery('');
	}, [setQuery]);

	return (
		<>
			{showTopicSuggestion && (
				<div
					className="h-screen w-screen fixed top-0 left-0 z-50"
					onClick={() => setShowTopicSuggestion(false)}
				/>
			)}
			<div className="padding w-2/5 flex-col gap-4 relative hidden lg:flex">
				<SearchBar
					readonly={false}
					onInputClick={(e) => {
						e?.preventDefault();
					}}
					onFocus={() => setShowTopicSuggestion(true)}
					after={
						<div className="h-full w-fit flex items-center">
							<Tooltip>
								<TooltipTrigger>
									<Link
										className="h-3/5 center w-fit pl-4 m-0 border-l-2 border-[#919091]"
										aria-label={'Explore'}
										href="/explore"
									>
										<Compass className=" text-text" strokeWidth={1.6} />
									</Link>
								</TooltipTrigger>
								<TooltipContent>Explore</TooltipContent>
							</Tooltip>
						</div>
					}
				/>

				<RecomendedTopicsDesktop />
			</div>
		</>
	);
};

export default ExploreRedirectDesktop;
