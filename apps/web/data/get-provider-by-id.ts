const GetProviderById = async (id: string) => {
	const providers = [
		{
			id: 'tCV5HvjhrFj7UtCdECs74lthix7YbsZFHMvC53fkpBW1r2IO',
			url: 'https://ko77xaoqa4.ufs.sh/f/tCV5HvjhrFj7UtCdECs74lthix7YbsZFHMvC53fkpBW1r2IO',
			name: 'CNN',
			followers: '120k',
		},
		{
			id: 'tCV5HvjhrFj779JC3c16RzKMGWPaoxlbmCA4V0N8Z3wUHTed',
			url: 'https://ko77xaoqa4.ufs.sh/f/tCV5HvjhrFj779JC3c16RzKMGWPaoxlbmCA4V0N8Z3wUHTed',
			name: 'CNET',
			followers: '120k',
		},
		{
			id: 'tCV5HvjhrFj7ckBobqnNkxa7TBAh20FSOVg4Lldpt3eMjDKb',
			url: 'https://ko77xaoqa4.ufs.sh/f/tCV5HvjhrFj7ckBobqnNkxa7TBAh20FSOVg4Lldpt3eMjDKb',
			name: 'Meduim',
			followers: '120k',
		},
		{
			id: 'tCV5HvjhrFj7KMYiLGVPmdVsui3vJ1g7MYaA2LcfGqE5nlUo',
			url: 'https://ko77xaoqa4.ufs.sh/f/tCV5HvjhrFj7KMYiLGVPmdVsui3vJ1g7MYaA2LcfGqE5nlUo',
			name: 'NY Times',
			followers: '120k',
		},
		{
			id: 'tCV5HvjhrFj77j4bVgY16RzKMGWPaoxlbmCA4V0N8Z3wUHTe',
			url: 'https://ko77xaoqa4.ufs.sh/f/tCV5HvjhrFj77j4bVgY16RzKMGWPaoxlbmCA4V0N8Z3wUHTe',
			name: 'Dev.to',
			followers: '120k',
		},
		{
			id: 'tCV5HvjhrFj7wYuhu4pRbcKf5Bzj6EXs14xoHqm3JwTk8aiV',
			url: 'https://ko77xaoqa4.ufs.sh/f/tCV5HvjhrFj7wYuhu4pRbcKf5Bzj6EXs14xoHqm3JwTk8aiV',
			name: 'VOX',
			followers: '120k',
		},
		{
			id: 'tCV5HvjhrFj7OuuQmIs8U2XFd7vn9YBVWsxoaP4j3iD1byMr',
			url: 'https://ko77xaoqa4.ufs.sh/f/tCV5HvjhrFj7OuuQmIs8U2XFd7vn9YBVWsxoaP4j3iD1byMr',
			name: 'CNBC',
			followers: '120k',
		},
		{
			id: 'tCV5HvjhrFj70QUibYDrVW7IbkMm6Gnhdewja5PRCzAL3fDg',
			url: 'https://ko77xaoqa4.ufs.sh/f/tCV5HvjhrFj70QUibYDrVW7IbkMm6Gnhdewja5PRCzAL3fDg',
			name: 'CBC',
			followers: '120k',
		},
		{
			id: 'tCV5HvjhrFj7Al0k2KoQ2M0UGsxT3Li1eYlgDhHwnmPkprWI',
			url: 'https://ko77xaoqa4.ufs.sh/f/tCV5HvjhrFj7Al0k2KoQ2M0UGsxT3Li1eYlgDhHwnmPkprWI',
			name: 'CNN',
			followers: '120k',
		},
		{
			id: 'tCV5HvjhrFj7zmZOBBqwEZrYT1mnJ6XDvHc3A9yKM4tegq0S',
			url: 'https://ko77xaoqa4.ufs.sh/f/tCV5HvjhrFj7zmZOBBqwEZrYT1mnJ6XDvHc3A9yKM4tegq0S',
			name: 'FOX',
			followers: '120k',
		},
	];
	return providers.find((provider) => provider.id === id);
};

export default GetProviderById;
