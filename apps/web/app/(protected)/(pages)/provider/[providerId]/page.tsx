import NewsGrid from '@/components/specific/news/news-grid/news-grid';
import ProviderHeader from '@/components/specific/provider/provider-header/provider-header';
import Tags from '@/components/specific/tags/tags';

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
			<NewsGrid />
		</>
	);
};

export default ProviderPage;
