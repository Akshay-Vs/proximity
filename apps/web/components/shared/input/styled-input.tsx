import React, { PropsWithChildren } from 'react';
import { Input } from '@proximity/ui/shadcn/input';

const StyledInput = ({
	children,
	...props
}: PropsWithChildren & React.InputHTMLAttributes<HTMLInputElement>) => {
	return (
		<div className="flex gap-2 center w-full h-14 rounded-[30px] border-2 border-border text-text px-4 mt-2">
			<Input
				{...props}
				className="center leading-none h-9 w-full rounded-none border-none bg-transparent shadow-none md:text-3xl lg:text-xl focus:outline-none focus-visible:ring-0 placeholder:text-[#626262] placeholder:font-medium px-0 py-0 disabled:opacity-100 cursor-pointer disabled:cursor-pointer"
			/>
			{children}
		</div>
	);
};

export default StyledInput;
