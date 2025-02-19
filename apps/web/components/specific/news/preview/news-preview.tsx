'use client';
import { Separator } from '@proximity/ui/shadcn/separator';
import PreviewHeader from './preview-header';
import PreviewImage from './preview.image';
import PreviewArticle from './preview-article';
import PreviewFooter from './preview-footer';

const NewsPreview = () => {
	return (
		<div className="full flex flex-col justify-between items-center">
			<PreviewHeader />
			<PreviewImage />

			<div className="h-full w-screen bottom-32 flex justify-end flex-col gap-4 pb-20 px-4 z-20">
				<PreviewArticle />
				<Separator className="my-1 opacity-50" />
				<PreviewFooter />
			</div>
		</div>
	);
};

export default NewsPreview;
