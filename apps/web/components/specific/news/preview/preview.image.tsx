import Image from 'next/image';

const PreviewImage = () => {
	return (
		<div className="h-fit w-full absolute top-0 left-0">
			<Image
				src="https://ko77xaoqa4.ufs.sh/f/tCV5HvjhrFj7IdoJ5zuQoRFHJr4sv5UPGOuXKthkE83bW0i1"
				alt="news cover image"
				width={720}
				height={736}
				className="object-center object-cover top-0 left-0 h-96 w-full"
			/>
			<div className="absolute full bottom-0 inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
		</div>
	);
};

export default PreviewImage;
