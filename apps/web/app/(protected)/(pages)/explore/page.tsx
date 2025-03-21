import { Separator } from '@proximity/ui/shadcn/separator';

import ActiveMatrix from '@/components/shared/branding/credit/active-matrix';
import ExploreSearch from '@/components/specific/explore/explore-search';
import RecomendedProviders from '@/components/specific/explore/recomended-providers';
import RecomendedTopics from '@/components/specific/explore/recomended-topics';
import ExploreScreenMgr from './explore-screen-mgr';
import ExploreSearchResults from '@/components/specific/explore/explore-search-results';

const ExplorePage = () => {
	return (
		<>
		<div className="padding flex flex-col gap-6 full">
			<ExploreSearch />
			<ExploreScreenMgr results={<ExploreSearchResults />}>
				<RecomendedProviders />
				<Separator />
				<RecomendedTopics />
			</ExploreScreenMgr>

		</div>
			<ActiveMatrix />
		</>
	);
};

export default ExplorePage;
