import getRecomendedProviders from '@/data/get-recomended-providers';
import Image from 'next/image';
import Link from 'next/link';

const RecomendedProviders = async () => {
	const providers = await getRecomendedProviders();

	return (
		<div className="grid grid-cols-5 gap-4">
			{providers.map((provider) => (
				<Link
					key={provider.id}
					href={`/provider/${provider.id}`}
					className="h-16 w-16 rounded-full bg-[#d9d9d988] center opacity-80 p-4"
				>
					<Image
						src={provider.url}
						alt="provider avatar"
						height={48}
						width={48}
						className="full object-center object-contain brightness-200 contrast-200 max-h-12 max-w-12"
					/>
				</Link>
			))}
		</div>
	);
};

export default RecomendedProviders;
