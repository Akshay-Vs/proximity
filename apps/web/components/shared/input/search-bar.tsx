'use client';
import { useSearchStore } from '@/stores/search-store';
import { SearchInput } from '@proximity/ui/react';
import { ChevronLeft, SearchIcon } from 'lucide-react';

interface SearchBarProps {
	onContainerClick?: (event?: React.MouseEvent<HTMLDivElement>) => void;
	onInputClick?: (event?: React.MouseEvent<HTMLInputElement>) => void;
	onIconClick?: (event?: React.MouseEvent<HTMLInputElement>) => void;
	onFocus?: (event?: React.FocusEvent<HTMLInputElement>) => void;
	onBlur?: (event?: React.FocusEvent<HTMLInputElement>) => void;
	icon?: 'search' | 'chevron';
	readonly?: boolean;
	className?: string;
	after?: React.ReactNode;
}

const SearchBar = ({
	onContainerClick,
	onInputClick,
	onIconClick,
	onFocus,
	onBlur,

	className,
	after,
	icon = 'search',
	readonly = false,
}: SearchBarProps) => {
	const { setQuery, query } = useSearchStore();
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value);
	};

	return (
		<SearchInput
			placeholder="Trending, Tech, Sports etc..."
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
			value={query}
			onChange={handleChange}
			readOnly={readonly}
			disabled={false}
			className={className}
			after={after}
			onFocus={onFocus}
			onBlur={onBlur}
		>
			<button
				className="h-7 w-7 p-0 m-0 border-[#919091] text-text"
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
