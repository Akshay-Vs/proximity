import ExploreBar from '@/components/shared/input/explore-bar';
import SearchResultsGrid from '@/components/specific/news-grid/search-results-grid';
import { Suspense } from 'react';

const TopicPages = () => {
	return (
		<Suspense>
			<div className="padding flex flex-col gap-6 full">
				<ExploreBar />
				<SearchResultsGrid />
			</div>
		</Suspense>
	);
};

export default TopicPages;
