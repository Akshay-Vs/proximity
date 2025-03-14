import { Button } from '@proximity/ui/shadcn/button';
import { cn } from '@proximity/ui/utils/cn';

import type { ButtonBase } from '@/types/button';


const TagButtonPrimary = ({ label, isSelected, isLoading, onClick }: ButtonBase) => {
	return (
		<Button variant="tag" onClick={onClick}className={cn("h-11 px-7", isLoading? "animate-pulse bg-primary opacity-80 text-white" :isSelected && "bg-primary text-white")}>
			{label}
		</Button>
	);
};

export default TagButtonPrimary;
