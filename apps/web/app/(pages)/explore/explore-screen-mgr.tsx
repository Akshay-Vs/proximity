'use client';

import { useSearchStore } from '@/stores/search-store';
import { PropsWithChildren, ReactNode } from 'react';

const ExploreScreenMgr = ({
	children,
	results,
}: PropsWithChildren & { results: ReactNode }) => {
	const { query } = useSearchStore();

	if (query) {
		return <>{results}</>;
	}
	return <>{children}</>;
};

export default ExploreScreenMgr;
