import { Button } from '@proximity/ui/shadcn/button';
import { Eye, Bookmark, Share2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface PreviewFooterProps {
	reads: string;
	publishedAt: string;
	source: {
		name: string;
		image: string;
		url: string;
	}
}

const PreviewFooter = ({ reads, publishedAt, source }: PreviewFooterProps) => {
	return (
		<div className="flex justify-between items-center">
			<div className="flex items-center gap-4">
				<span className="center gap-2">
					<Eye className="w-4 h-4" />
					<p>{reads}</p>
				</span>

				<span className="center gap-2">
					<p>{publishedAt}</p>
				</span>

				<Link href={source.url} className="center gap-2 h-6">
					<Image
						src={source.image}
						alt={source.name}
						width={24}
						height={24}
						className="object-center object-contain h-6 w-6"
					/>
				</Link>
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
