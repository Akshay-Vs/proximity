import { Separator } from '@proximity/ui/shadcn/separator';

import Link from 'next/link';
import NewsTitle from './news-title';
import NewsCoverImage from './news-cover-image';
import NewsSourceInfo from './news-source-info';
import NewsViewsCount from './news-view-count';

export interface NewsCardProps {
	slug: string;
	title: string;
	image: string;
	publishedAt: string;
	source: string;
	views: string;
}

const NewsCard = ({
	slug,
	title,
	image,
	publishedAt,
	source,
	views,
}: NewsCardProps) => {
	return (
		<Link href={`/story/${slug}`} className="h-fit w-full">
			<article className="relative w-full h-fit col-center gap-3">
				<NewsCoverImage image={image} alt={title} />
				<NewsTitle title={title} />

				<div className="flex justify-between items-center w-full h-4">
					<NewsSourceInfo publishedAt={publishedAt} source={source} />
					<NewsViewsCount views={views} />
				</div>

				<Separator className={'mx-4'} />
			</article>
		</Link>
	);
};

export default NewsCard;
