'use client';
import { SearchInput } from '@proximity/ui/react';
import { ChevronLeft, SearchIcon } from 'lucide-react';

interface SearchBarProps {
	onContainerClick?: (event?: React.MouseEvent<HTMLDivElement>) => void;
	onInputClick?: (event?: React.MouseEvent<HTMLInputElement>) => void;
	onIconClick?: (event?: React.MouseEvent<HTMLInputElement>) => void;
	icon?: 'search' | 'cheveron';
	readonly?: boolean;
}

const SearchBar = ({
	onContainerClick,
	onInputClick,
	onIconClick,
	icon = 'search',
	readonly = false,
}: SearchBarProps) => {
	return (
		<SearchInput
			placeholder="Trending, Tech, Sports etc..."
			callback={(data) => {/* handle search */}}
			aria-label="Search content"
			onContainerClick={() => onContainerClick?.()}
			onContainerKeyDown={(e) => {
				if (e.key === 'Enter') {
					onContainerClick?.();
				}
			}}
			onInputClick={() => onInputClick?.()}
			onInputKeyDown={(e) => {
				if (e.key === 'Enter') {
					onInputClick?.();
				}
			}}
			readOnly={readonly}
			disable={false}
		>
			<button
				className="h-7 w-7 p-0 m-0 border-[#919091]"
				onClick={() => onIconClick?.()}
				aria-label={icon === 'search' ? 'Search' : 'Go back'}
			>
				{icon === 'search' ? (
					<SearchIcon strokeWidth={2} />
				) : (
					<ChevronLeft strokeWidth={2} />
				)}
			</button>
		</SearchInput>
	);
};

export default SearchBar;
