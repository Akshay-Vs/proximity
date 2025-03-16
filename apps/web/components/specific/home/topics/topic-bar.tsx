'use client';
import { JSX, useCallback, useMemo } from 'react';
import TopicButtonEnhanced from './topic-button-enhanced';
import TopicButtonPrimary from './topic-button-primary';
import { History } from 'lucide-react';
import { useDisplayTopicStore } from '@/stores/display-topic-store';
import GradientOverlays from './gradient-overlay';

interface TopicTag {
	label: string | JSX.Element;
	id: string;
	enhanced?: boolean;
}

const tags: TopicTag[] = [
	{
		label: 'For You',
		id: 'for-you',
		enhanced: true,
	},
	{
		label: (
			<span className="center gap-2">
				<History /> <p>Latest</p>
			</span>
		),
		id: 'latest',
	},
	{
		label: 'Technology',
		id: 'technology',
	},
	{
		label: 'Space',
		id: 'space',
	},
	{
		label: 'Finance',
		id: 'finance',
	},
];

const Tags = () => {
	const { topic, setTopic, loading } = useDisplayTopicStore();

	const selectTag = useCallback(
			(id: string) => {
					if (id === topic) return;
					setTopic(id);
			},
			[topic, setTopic]
	);

	const renderTopicButton = useCallback((tag: TopicTag) => {
			const ButtonComponent = tag.enhanced
					? TopicButtonEnhanced
					: TopicButtonPrimary;

			return (
					<ButtonComponent
							key={typeof tag.label === 'string' ? tag.label : tag.id}
							label={tag.label}
							onClick={() => selectTag(tag.id)}
							isSelected={topic === tag.id}
							isLoading={loading === tag.id}
					/>
			);
	}, [topic, loading, selectTag]);

	const topicButtons = useMemo(() => 
			tags.map(renderTopicButton),
			[renderTopicButton]
	);

	return (
			<div className="w-full flex justify-center items-center gap-4 relative">
					<GradientOverlays />
					<div className="flex items-center gap-4 w-full overflow-y-hidden overflow-x-scroll horizontal-scroll padding">
							{topicButtons}
					</div>
			</div>
	);
};

export default Tags;
