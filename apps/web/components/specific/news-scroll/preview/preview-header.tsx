"use client"
import { Button } from '@proximity/ui/shadcn/button';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'nextjs-toploader/app';

const PreviewHeader = () => {
	const router = useRouter();

	const handleNavigation = () => {
		if (typeof window !== 'undefined' && window.history.length > 1) {
			return router.back();
		}
		router.push('/');
	}

	return (
		<div className="z-[100] bg-transparent w-full h-fit px-3 flex backdrop:invert items-center gap-2 top-2 fixed cursor-pointer">
			<Button
				variant="ghost"
				className="px-4 backdrop-blur-sm bg-background/70 rounded-full"
				onClick={handleNavigation}
			>
				<ArrowLeft />
				<p className="text-lg">Back</p>
			</Button>
		</div>
	);
};

export default PreviewHeader;
