'use client';
import React, { PropsWithChildren, useState } from 'react';
import { Input } from '../../shadcn/input';
import { cn } from '@/src/utils/cn';

interface SearchInput
	extends PropsWithChildren,
		React.InputHTMLAttributes<HTMLInputElement> {
	onContainerClick?: () => void;
	onContainerKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;

	onInputClick?: () => void;
	onInputKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;

	after?: React.ReactNode;
}

const SearchInput = ({
	onContainerClick,
	onContainerKeyDown,
	onInputClick,
	onInputKeyDown,
	children,
	className,
	after,
	...rest
}: SearchInput) => {
	const [search, setSearch] = useState('');

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	return (
		<div
			className="flex gap-2 center w-full h-14 rounded-[30px] border-2 border-border text-text px-4"
			onClick={onContainerClick}
			onKeyDown={onContainerKeyDown}
		>
			{children}

			<Input
				onChange={handleChange}
				value={search}
				onKeyDown={onInputKeyDown}
				onClick={onInputClick}
				className={cn("center leading-none h-9 w-full rounded-none border-none bg-transparent shadow-none md:text-3xl lg:text-xl focus:outline-none focus-visible:ring-0 placeholder:text-[#626262] placeholder:font-medium px-0 py-0 disabled:opacity-100 cursor-pointer disabled:cursor-pointer", className)}
				{...rest}
			/>
			{after}
		</div>
	);
};

export default SearchInput;
