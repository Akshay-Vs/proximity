import TagButtonPrimary from './tag-button-primary';
import TagButtonEnhanced from './tag-button-enhanced';

const Tags = () => {
	return (
		<div className="w-full flex justify-center items-center gap-4 relative">
			<div className="absolute top-0 left-0 w-[7%] z-20 h-full bg-gradient-to-r from-[#ebeced] via-[#ebecedab] to-[#ebeced00]" />
			<div className="absolute top-0 right-0 w-[7%] z-20 h-full bg-gradient-to-r from-[#ebeced00] via-[#ebecedab] to-[#ebeced]" />

			<div className="flex items-center gap-4 w-full overflow-y-hidden overflow-x-scroll horizontal-scroll px-[5%]">
				<TagButtonEnhanced label="For You" />
				<TagButtonPrimary label="Technology" />
				<TagButtonPrimary label="Space" />
				<TagButtonPrimary label="Finance" />
			</div>
		</div>
	);
};

export default Tags;
