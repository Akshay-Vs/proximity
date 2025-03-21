'use client';
import TextCheveron from '@/components/shared/text-cheveron/text-cheveron';
import getRecomendedTopics from '@/data/get-recomended-topics';
import { useSearchStore } from '@/stores/search-store';
import { useEffect, useState } from 'react';

const RecomendedTopicsDesktop = () => {
	const [topics, setTopics] = useState<{ id: number; label: string }[]>([]);
	const { showTopicSuggestion, setShowTopicSuggestion } =
		useSearchStore();

	useEffect(() => {
		(async () => {
			const topics = await getRecomendedTopics();
			setTopics(topics);
		})();
	}, []);

	if (!showTopicSuggestion) return null;

	return (
		<div
			className="h-fit absolute z-50 top-16 w-3/4 rounded-2xl bg-background border border-border p-4 hidden lg:block"
			onFocus={() => setShowTopicSuggestion(true)}
		>
			{topics.map((topic) => (
				<div key={topic.id} onClick={() => setShowTopicSuggestion(false)}>
					<TextCheveron href={`/topic?q=${topic.label}`} label={topic.label} />
				</div>
			))}
		</div>
	);
};

export default RecomendedTopicsDesktop;
