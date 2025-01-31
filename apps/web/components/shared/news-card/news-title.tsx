interface NewsTitleProps {
	title: string;
}

const NewsTitle = ({ title }: NewsTitleProps) => {
	return (
		<div className="w-full h-16">
			<h2 className="text-2xl font-jost w-full line-clamp-2">{title}</h2>
		</div>
	);
};

export default NewsTitle;
