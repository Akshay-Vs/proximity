interface FeaturedDescriptionProps {
	description: string;
}

const FeaturedDescription = ({ description }: FeaturedDescriptionProps) => {
	return (
		<p className="text-base font-jost h-max-32 line-clamp-5">{description}</p>
	);
};

export default FeaturedDescription;
