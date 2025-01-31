const getSearchResults = async (query: string) => {
	if (query.length === 0) return [];
	return [
		{
			id: 1,
			label: 'Mars colonisation',
		},
		{
			id: 2,
			label: 'CRISPR Technology',
		},
		{
			id: 3,
			label: 'Quantum Computing',
		},
		{ id: 4, label: 'Nuclear Fusion' },
	];
};

export default getSearchResults;
