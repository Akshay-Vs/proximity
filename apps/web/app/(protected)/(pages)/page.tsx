import Featured from '@/components/specific/home/featured-news/featured';
import HomeNewsGrid from '@/components/specific/home/home-news-grid/home-news-grid';
import Tags from '@/components/specific/home/topics/topic-bar';

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
				<HomeNewsGrid />
			</div>
		</>
	);
};

export default Home;
