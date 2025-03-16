import HomeNewsGrid from '@/components/specific/home/home-news-grid/home-news-grid';
import ProviderHeader from '@/components/specific/provider/provider-header/provider-header';
import Tags from '@/components/specific/topics/topic-bar';

const ProviderPage = async ({
	params,
}: {
	params: Promise<{ providerId: string }>;
}) => {
	const providerId = (await params).providerId;
	return (
		<>
			<ProviderHeader id={providerId} />
			<Tags />
			<HomeNewsGrid />
		</>
	);
};

export default ProviderPage;
