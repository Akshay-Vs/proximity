const PreviewArticle = () => {
	return (
		<>
			<div className="flex gap-2 w-full">
				<span>#Space</span>
				<span>#ElonMusk</span>
			</div>
			<h1 className="text-[2rem] font-medium leading-tight tracking-normal">
				SpaceX letter criticizes FAA for “systemic challenges” in launch
				licensing
			</h1>

			<article className="text-[1.24rem]">
				{`SpaceX is challenging a $633,000 FAA fine for two 2023 launch
					violations, arguing the changes were minor and didn’t affect safety.
					The company claims the FAA was slow to approve updates and suggests
					the fines are politically motivated. CEO Elon Musk vowed to sue but
					hasn't yet.`}
			</article>
		</>
	);
};

export default PreviewArticle;
