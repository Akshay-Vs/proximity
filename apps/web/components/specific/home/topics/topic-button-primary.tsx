import { Button } from '@proximity/ui/shadcn/button';
import { cn } from '@proximity/ui/utils/cn';

import type { ButtonBase } from '@/types/button';


const TopicButtonPrimary = ({ label, isSelected,  isLoading, onClick }: ButtonBase) => {
	return (
		<Button variant="tag" onClick={onClick}className={cn("h-11 px-7", isLoading? "animate-pulse bg-primary opacity-80 hover:cursor-pointer text-white" :isSelected && "bg-primary text-white")}>
			{label}
		</Button>
	);
};

export default TopicButtonPrimary;
