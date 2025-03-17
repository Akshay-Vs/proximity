import Image from 'next/image';

interface PreviewImageProps {
	src: string;
	alt: string;
}

const PreviewImage = ({src, alt}: PreviewImageProps) => {
	return (
		<div className="h-fit w-full absolute top-0 left-0">
			<Image
				src={src}
				alt={alt}
				width={720}
				height={736}
				className="object-center object-cover top-0 left-0 h-96 w-full"
			/>
			<div className="absolute full bottom-0 inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
		</div>
	);
};

export default PreviewImage;
