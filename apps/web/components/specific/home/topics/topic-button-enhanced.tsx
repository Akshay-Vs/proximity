import { ButtonBase } from '@/types/button';
import { Button } from '@proximity/ui/shadcn/button';
import { cn } from '@proximity/ui/utils/cn';

import "@/styles/_button.scss";

const TopicButtonEnhanced = ({ label, isSelected, isLoading, isDisabled, onClick }: ButtonBase) => {
	return (
		<Button
			variant="tag"
			className={cn("h-11 px-7 center button__enhanced", isLoading ? "button__enhanced--loading": isSelected ? "button__enhanced--selected" : "button__enhanced--idle")}
			disabled={isDisabled}
			onClick={onClick}
		>
			<div className="z-10 center gap-2">
				<svg
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 16 16"
					className="scale-125"
				>
					<path
						d="M16 8.016A8.522 8.522 0 008.016 16h-.032A8.521 8.521 0 000 8.016v-.032A8.521 8.521 0 007.984 0h.032A8.522 8.522 0 0016 7.984v.032z"
						fill="url(#prefix__paint0_radial_980_20147)"
					/>
					<defs>
						<radialGradient
							id="prefix__paint0_radial_980_20147"
							cx="0"
							cy="0"
							r="1"
							gradientUnits="userSpaceOnUse"
							gradientTransform="matrix(16.1326 5.4553 -43.70045 129.2322 1.588 6.503)"
						>
							<stop offset=".067" stopColor="#ce52ff" />
							<stop offset=".343" stopColor="#ce52ff" />
							<stop offset=".672" stopColor="#ce52ff" />
						</radialGradient>
					</defs>
				</svg>

				{label}
			</div>
		</Button>
	);
};

export default TopicButtonEnhanced;
