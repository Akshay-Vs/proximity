import { Separator } from '@proximity/ui/shadcn/separator';

const NewsCardSkeleton = () => {
	return (
		<div className="h-fit w-full">
			<article className="relative w-full h-fit col-center gap-3">
				{/* Cover Image */}
				<div className="w-full h-56 bg-slate-300 animate-pulse rounded-2xl" />

				{/* Title */}
				<div className="w-full h-16">
					<div className="w-full h-fit flex flex-col gap-3">
						<div className="bg-slate-300 w-full h-6 animate-pulse" />
						<div className="bg-slate-300 w-2/3 h-6 animate-pulse" />
					</div>
				</div>

				{/* Source Info */}
				<div className="flex justify-between items-center w-full h-4">
					{/* Source */}
					<div className="flex gap-4 h-full w-full">
						<div className="bg-slate-300 w-16 h-4 animate-pulse" />
						<div className="bg-slate-300 w-14 h-4 animate-pulse" />
					</div>

					{/* Views */}
					<div className="bg-slate-300 w-16 h-4 animate-pulse" />
				</div>

				<Separator className={'bg-slate-300 animate-pulse'} />
			</article>
		</div>
	);
};

export default NewsCardSkeleton;
