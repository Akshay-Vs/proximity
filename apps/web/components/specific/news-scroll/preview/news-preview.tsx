'use client';
import { Separator } from '@proximity/ui/shadcn/separator';
import PreviewImage from './preview.image';
import PreviewArticle from './preview-article';
import PreviewFooter from './preview-footer';

interface PreviewProps {
	image: string;
	title: string;
	article: string;
	tags: string[];
	publishedAt: string;
	source: {
		name: string;
		image: string;
		url: string;
	}
	reads: string;
}

const NewsPreview = ({image, title, article, tags, publishedAt, source, reads}:PreviewProps) => {
	return (
		<div className="relative screen snap-start snap-always h-screen w-full overflow-hidden">
			<div className="full flex flex-col justify-between items-center h-full">
				<PreviewImage src={image} alt={title} />

				<div className="h-full w-screen bottom-32 flex justify-end flex-col gap-4 pb-20 px-4 z-20">
					<PreviewArticle article={article} tags={tags} title={title} />
					<Separator className="my-1 opacity-50" />
					<PreviewFooter publishedAt={publishedAt} source={source} reads={reads} />
				</div>
			</div>
		</div>
	);
};

export default NewsPreview;
