import TextCheveron from '@/components/shared/text-cheveron/text-cheveron';
import getRecomendedTopics from '@/data/get-recomended-topics';

const RecomendedTopics = async () => {
	const topics = await getRecomendedTopics();
	return (
		<div>
			<h2 className="text-2xl">Jump back in to</h2>

			{topics.map((topic) => (
				<TextCheveron
					key={topic.id}
					href={`/topic?q=${topic.label}`}
					label={topic.label}
				/>
			))}
		</div>
	);
};

export default RecomendedTopics;
