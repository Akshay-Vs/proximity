'use client';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import NewsCard, { NewsCardProps } from '../../../shared/news-card/news-card';
import NewsCardSkeleton from '../../../shared/news-card/news-card-skeleton';
import { useDisplayTopicStore } from '@/stores/display-topic-store';
import { getNewsById } from '@/data/get-news-by-id';

const HomeNewsGrid = () => {
    const [news, setNews] = useState<NewsCardProps[] | 'loading'>([]);
    const [page, setPage] = useState(1);
    const { topic, setLoading } = useDisplayTopicStore();
    const [ref, inView] = useInView({
        threshold: 0,
    });

    useEffect(() => {
        // Reset when topic changes
        setNews('loading');
        setPage(1);
        setLoading(topic);
        
        (async () => {
            const res = await getNewsById(topic, 1);
            setNews(res);
            setLoading(false);
        })();
    }, [topic, setLoading]);

    useEffect(() => {
        if (inView && news !== 'loading') {
            (async () => {
                const nextPage = page + 1;
                const res = await getNewsById(topic, nextPage);
                
                if (res.length > 0) {
                    setNews((prev) => 
                        prev === 'loading' ? res : [...prev, ...res]
                    );
                    setPage(nextPage);
                }
            })();
        }
    }, [inView, topic, page, news]);

    return (
        <section className="gap-6 px-[5%] pb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-6 w-full h-full">
            {news === 'loading'
                ? Array.from({ length: 12 }).map((_, i) => <NewsCardSkeleton key={i} />)
                : news.map((news) => (
                    <NewsCard
                        key={news.slug}
                        slug={news.slug}
                        title={news.title}
                        image={news.image}
                        publishedAt={news.publishedAt}
                        source={news.source}
                        reads={news.reads}
                    />
                ))}
            <div ref={ref} className="h-1/2 w-10 bg-black" />
        </section>
    );
};

export default HomeNewsGrid;