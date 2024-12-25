'use client';
import { SearchInput } from '@proximity/ui/react';
import { SearchIcon } from 'lucide-react';

const SearchBar = () => {
	return (
		<div className="main-container">
			<SearchInput
				placeholder="Search for a product"
				callback={(data) => console.log(data)}
				onContainerClick={() => console.log('search container clicked')}
				onContainerKeyDown={(e) => {
					if (e.key === 'Enter') {
						console.log('search container key down');
					}
				}}
			>
				<SearchIcon className="h-7 w-7 border-[#919091]" strokeWidth={2} />
			</SearchInput>
		</div>
	);
};

export default SearchBar;
