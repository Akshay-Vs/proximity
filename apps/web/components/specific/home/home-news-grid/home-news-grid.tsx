'use client';
import { useEffect, useState } from 'react';

import NewsCard, { NewsCardProps } from '../../../shared/news-card/news-card';
import NewsCardSkeleton from '../../../shared/news-card/news-card-skeleton';
import { useDisplayTopicStore } from '@/stores/display-topic-store';

const HomeNewsGrid = () => {
	const [news, setNews] = useState<NewsCardProps[] | 'loading'>([]);
	const {topic, setLoading} = useDisplayTopicStore();

	useEffect(() => {
		setNews('loading');
		setLoading(topic)

		// simulate loading delay
		const timeoutDelay = topic === 'for-you' ? 4000 : 500;
		setTimeout(() => {
			
			setNews([
				{
					image:
						'https://utfs.io/f/tCV5HvjhrFj7e9NgBZxqDOE9pI4s2uQrfZnahoL6R8vM03SV',
					title: 'Lockheed Martin challenges narrative on GPS vulnerability',
					publishedAt: '12 hours ago',
					source: 'CNN',
					views: '43k',
					slug: 'lockheed-martin-challenges-narrative-on-gps-vulnerability-124H8',
				},
				{
					image:
						'https://utfs.io/f/tCV5HvjhrFj78ppsNbrmDKZ6LVIqCe2WQuHiMNX41BYwsvEd',
					title: 'India eyes record year for space with 10 planned launches',
					publishedAt: '5 hours ago',
					source: 'Space News',
					views: '28k',
					slug: 'india-eyes-record-year-for-space-with-10-planned-launches-GJ878G',
				},
			]);
			setLoading(false)
		}, timeoutDelay);
	}, [setLoading, topic]);

	return (
		<section className="gap-6 px-[5%] pb-6 grid grid-cols-1 w-full h-full">
			{news === 'loading'
				? Array.from({ length: 5 }).map((_, i) => <NewsCardSkeleton key={i} />)
				: news.map((news) => (
						<NewsCard
							key={news.slug}
							slug={news.slug}
							title={news.title}
							image={news.image}
							publishedAt={news.publishedAt}
							source={news.source}
							views={news.views}
						/>
					))}
		</section>
	);
};

export default HomeNewsGrid;