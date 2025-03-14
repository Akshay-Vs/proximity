'use client';
import TagButtonPrimary from './tag-button-primary';
import TagButtonEnhanced from './tag-button-enhanced';
import { useCallback, useState } from 'react';

const tags = [
	{
		label: 'Technology',
		id: 'technology',
	},
	{
		label: 'Space',
		id: 'space',
	},
	{
		label: 'Finance',
		id: 'finance',
	},
];
const Tags = () => {
	const [selected, setSelected] = useState<string>();
	const [loading, setLoading] = useState<string>();

		const selectTag = useCallback((id: string) => {
			if (id === selected) 
				return;
			
			if (loading) {
					setLoading('');
			}

			setSelected(id);
			
			if (id !== 'for-you') return;

			setLoading(id);
			const timeoutId = setTimeout(() => {
					setLoading('');
			}, 3000);

			// Cleanup timeout on next call
			return () => clearTimeout(timeoutId);
	}, [loading, selected]);	
	
	return (
		<div className="w-full flex justify-center items-center gap-4 relative">
			<div className="absolute top-0 left-0 w-[7%] z-20 h-full bg-gradient-to-r from-[#ebeced] via-[#ebecedab] to-[#ebeced00]" />
			<div className="absolute top-0 right-0 w-[7%] z-20 h-full bg-gradient-to-r from-[#ebeced00] via-[#ebecedab] to-[#ebeced]" />

			<div className="flex items-center gap-4 w-full overflow-y-hidden overflow-x-scroll horizontal-scroll padding">
				<TagButtonEnhanced
					label="For You"
					onClick={() => selectTag('for-you')}
					isSelected={selected === 'for-you'}
					isLoading={loading === 'for-you'}
				/>

				{tags.map((tag) => (
					<TagButtonPrimary
						key={tag.label}
						label={tag.label}
						isSelected={selected === tag.id}
						onClick={() => {selectTag(tag.id)}}
						isLoading={loading === tag.id}
					/>
				))}
			</div>
		</div>
	);
};

export default Tags;
