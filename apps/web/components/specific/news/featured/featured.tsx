import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import FeaturedTitle from './featured-title';
import FeaturedImage from './featured-image';
import FeaturedDescription from './featured-description';

interface FeaturedProps {
	title: string;
	description: string;
	image: string | StaticImport;
}

const Featured = ({ title, description, image }: FeaturedProps) => {
	return (
		<article className="main-container flex-col">
			<FeaturedTitle title={title} />
			<div className="center gap-4">
				<FeaturedImage image={image} />
				<FeaturedDescription description={description} />
			</div>
		</article>
	);
};

export default Featured;
