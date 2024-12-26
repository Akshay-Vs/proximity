import Header from '@/components/specific/header/nav-header';
import Featured from '@/components/specific/news/featured/featured';
import SearchBar from '@/components/specific/search-bar/search-bar';
import Tags from '@/components/specific/tags/tags';

import testArticle from '@/public/images/image 2.png';

const Home = () => {
	return (
		<main className="w-full h-full flex flex-col gap-6 justify-center items-center">
			<div className="w-full h-full flex flex-col gap-6 justify-center items-center pb-2">
				<Header />
				<Featured
					title="Musk's $56bn deal rejected"
					description="Tesla chief executive Elon Musk's record-breaking $56bn (£47bn) pay award will not be reinstated, a judge has ruled"
					image={testArticle}
				/>
			</div>

			<SearchBar />
			<Tags />
		</main>
	);
};

export default Home;
