import ResultsGrid from '@/components/specific/topic/results-grid';
import TopicSearch from '@/components/specific/topic/topic-search';
import { Suspense } from 'react';

const TopicPages = () => {
	return (
		<Suspense>
			<div className="padding flex flex-col gap-6 full">
				<TopicSearch />
				<ResultsGrid />
			</div>
		</Suspense>
	);
};

export default TopicPages;
