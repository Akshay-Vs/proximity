interface NewsSourceInfoProps {
	source: string;
	publishedAt: string;
}

const NewsSourceInfo = ({ source, publishedAt }: NewsSourceInfoProps) => {
	return (
		<p className="text-sm font-jost font-medium center gap-4">
			<span>{source}</span>
			<span>{publishedAt}</span>
		</p>
	);
};

export default NewsSourceInfo;
