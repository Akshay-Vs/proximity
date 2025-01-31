import Image from 'next/image';

interface NewsCoverImageProps {
	image: string;
	alt: string;
}

const NewsCoverImage = ({ image, alt }: NewsCoverImageProps) => {
	return (
		<Image
			src={image}
			alt={alt}
			width={640}
			height={480}
			className="object-cover object-center bg-slate-300 w-full h-56 rounded-2xl"
		/>
	);
};

export default NewsCoverImage;
