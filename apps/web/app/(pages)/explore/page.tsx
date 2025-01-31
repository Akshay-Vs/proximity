import { Separator } from '@proximity/ui/shadcn/separator';

import ActiveMatrix from '@/components/shared/branding/credit/active-matrix';
import ExploreSearch from '@/components/specific/explore/explore-search';
import RecomendedProviders from '@/components/specific/explore/recomended-providers';
import RecomendedTopics from '@/components/specific/explore/recomended-topics';

const ExplorePage = () => {
	return (
		<div className="padding flex flex-col gap-6">
			<ExploreSearch />
			<RecomendedProviders />
			<Separator />
			<RecomendedTopics />

			<ActiveMatrix />
		</div>
	);
};

export default ExplorePage;
