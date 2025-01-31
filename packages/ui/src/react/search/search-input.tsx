'use client';
import { PropsWithChildren, useState } from 'react';
import { Input } from '../../shadcn/input';

interface SearchInput extends PropsWithChildren {
	placeholder: string;
	onContainerClick?: () => void;
	onContainerKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;

	onInputClick?: () => void;
	onInputKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;

	callback?: <T>(searchResult: T) => void;

	disable: boolean;
	readOnly: boolean;
}

const SearchInput = ({
	placeholder,
	onContainerClick,
	onContainerKeyDown,
	onInputClick,
	onInputKeyDown,
	disable,
	readOnly,
	children,
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
				placeholder={placeholder}
				onKeyDown={onInputKeyDown}
				onClick={onInputClick}
				disabled={disable}
				readOnly={readOnly}
				className="center leading-none h-9 w-full rounded-none border-none bg-transparent shadow-none md:text-3xl focus:outline-none focus-visible:ring-0 placeholder:text-[#626262] placeholder:font-medium px-0 py-0 disabled:opacity-100 cursor-pointer disabled:cursor-pointer"
			/>
		</div>
	);
};

export default SearchInput;
