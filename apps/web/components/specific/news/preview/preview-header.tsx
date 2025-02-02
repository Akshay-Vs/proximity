import { Button } from '@proximity/ui/shadcn/button';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'nextjs-toploader/app';

const PreviewHeader = () => {
	const router = useRouter();

	return (
		<div className="z-10 bg-transparent w-full h-fit px-3 flex items-center gap-2 top-2">
			<Button
				variant="ghost"
				className="px-1 backdrop-blur-sm"
				onClick={() => router.back()}
			>
				<ArrowLeft />
				<p className="text-lg">Back</p>
			</Button>
		</div>
	);
};

export default PreviewHeader;
