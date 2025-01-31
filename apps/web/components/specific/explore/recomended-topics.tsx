import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const RecomendedTopics = () => {
	const topics = [
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
	return (
		<div>
			<h2 className="text-2xl">Jump back in to</h2>

			{topics.map((topic) => (
				<Link
					href={`/topic/${topic.id}`}
					key={topic.id}
					className="flex justify-between items-center px-4 py-3"
				>
					<p className="text-lg">{topic.label}</p>
					<ArrowUpRight />
				</Link>
			))}
		</div>
	);
};

export default RecomendedTopics;
