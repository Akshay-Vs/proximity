import Image from 'next/image';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

interface FeaturedImageProps {
	image: string | StaticImport;
}

const FeaturedImage = ({ image }: FeaturedImageProps) => {
	return (
		<Image
			src={image}
			alt="Featured Image"
			width={640}
			height={360}
			className="object-contain object-center w-40 h-fit h-max-32"
		/>
	);
};

export default FeaturedImage;
