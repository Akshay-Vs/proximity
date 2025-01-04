import { Eye } from 'lucide-react';

interface NewsViewsCountProps {
	views: string;
}

const NewsViewsCount = ({ views }: NewsViewsCountProps) => {
	return (
		<p className="text-sm font-jost font-medium center gap-2">
			<Eye className="h-4 w-4 text-slate-900" />
			{views}
		</p>
	);
};

export default NewsViewsCount;
