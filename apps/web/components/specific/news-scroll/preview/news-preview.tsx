'use client';
import { Separator } from '@proximity/ui/shadcn/separator';
import PreviewImage from './preview.image';
import PreviewArticle from './preview-article';
import PreviewFooter from './preview-footer';
import { cn } from '@proximity/ui/utils/cn';

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
	index: number;
}

const NewsPreview = ({image, title, article, tags, publishedAt, source, reads, index}:PreviewProps) => {
	return (
		<div className={cn("relative screen snap-start snap-always h-screen w-full center overflow-hidden md:max-h-[96vh]", index===0 && "pt-6")}>
			<div className="flex flex-col justify-between items-center h-full w-full md:max-w-[32rem] md:max-h-[94vh] md:rounded-2xl  border-gray-300 border overflow-hidden relative">
				<PreviewImage src={image} alt={title} />

				<div className="h-full w-full bottom-32 flex justify-end flex-col gap-4 pb-20 px-4 z-20">
					<PreviewArticle article={article} tags={tags} title={title} />
					<Separator className="my-1 opacity-50" />
					<PreviewFooter publishedAt={publishedAt} source={source} reads={reads} />
				</div>
			</div>
		</div>
	);
};

export default NewsPreview;