import GetProviderById from '@/data/get-provider-by-id';
import { Button } from '@proximity/ui/shadcn/button';
import Image from 'next/image';

const ProviderHeader = async ({ id }: { id: string }) => {
	const provider = await GetProviderById(id);
	if (!provider) return null;
	return (
		<div className="flex items-center justify-between w-full padding">
			<div className="flex items-center gap-4">
				<div className="h-16 w-16 flex-0 rounded-full bg-[#d9d9d988] center opacity-80 p-4">
					<Image
						src={provider?.url}
						alt="provider avatar"
						height={48}
						width={48}
						className="full object-center object-contain aspect-square brightness-200 contrast-200 max-h-12 max-w-12"
					/>
				</div>
				<div>
					<h2 className="text-2xl">{provider.name}</h2>
					<p className="text-sm">{provider.followers} followers</p>
				</div>
			</div>

			<Button variant="tag">Follow</Button>
		</div>
	);
};

export default ProviderHeader;
