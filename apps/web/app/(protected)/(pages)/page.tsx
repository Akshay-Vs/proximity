import Featured from '@/components/specific/news/featured/featured';
import NewsGrid from '@/components/specific/news/news-grid/news-grid';
import Tags from '@/components/specific/tags/tags';

import testArticle from '@/public/images/image 2.png';
import ExploreRedirect from '@/components/specific/home/explore-redirect/explore-redirect';

const Home = () => {
	return (
		<>
			<Featured
				title="Musk's $56bn deal rejected"
				description="Tesla chief executive Elon Musk's record-breaking $56bn (£47bn) pay award will not be reinstated, a judge has ruled"
				image={testArticle}
			/>

			<div className="w-full h-full flex flex-col justify-center items-center gap-6 pt-2">
				<ExploreRedirect />
				<Tags />
				<NewsGrid />
			</div>
		</>
	);
};

export default Home;
