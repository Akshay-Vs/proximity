import { Button } from '@proximity/ui/shadcn/button';
import { Eye, Bookmark, Share2 } from 'lucide-react';
import Image from 'next/image';

const PreviewFooter = () => {
	return (
		<div className="flex justify-between items-center">
			<div className="flex items-center gap-4">
				<span className="center gap-2">
					<Eye className="w-4 h-4" />
					<p>1.2k</p>
				</span>

				<span className="center gap-2">
					<p>12 hours ago</p>
				</span>

				<span className="center gap-2 h-6">
					<Image
						src="https://ko77xaoqa4.ufs.sh/f/tCV5HvjhrFj7Al0k2KoQ2M0UGsxT3Li1eYlgDhHwnmPkprWI"
						alt="cnn"
						width={24}
						height={24}
						className="object-center object-contain h-6 w-6"
					/>
				</span>
			</div>

			<div className="flex gap-4 items-center">
				<Button variant="ghost" className="p-1">
					<Bookmark className="h-4 w-4" />
				</Button>
				<Button variant="ghost" className="p-1">
					<Share2 className="h-4 w-4" />
				</Button>
			</div>
		</div>
	);
};

export default PreviewFooter;
