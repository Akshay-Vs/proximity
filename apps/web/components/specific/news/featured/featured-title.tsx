interface FeaturedTitleProps {
	title: string;
}

const FeaturedTitle = ({ title }: FeaturedTitleProps) => {
	return <h1 className="text-4xl font-jost">{title}</h1>;
};

export default FeaturedTitle;
