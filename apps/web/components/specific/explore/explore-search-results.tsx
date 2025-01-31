'use client';
import TextCheveron from '@/components/shared/text-cheveron/text-cheveron';
import getSearchResults from '@/data/get-search-results';
import { useSearchStore } from '@/stores/search-store';
import { TSearchResult } from '@/types/search-result-type';
import { useEffect, useState } from 'react';

const ExploreSearchResults = () => {
	const { query } = useSearchStore();
	const [results, setResults] = useState<TSearchResult[]>([]);

	useEffect(() => {
		(async () => {
			const res = await getSearchResults(query);
			setResults(res);
		})();
	}, [query]);

	return (
		<div>
			{results.map((result) => (
				<TextCheveron
					key={result.id}
					href={`/explore/topics/${result.id}`}
					label={result.label}
				/>
			))}
		</div>
	);
};

export default ExploreSearchResults;
