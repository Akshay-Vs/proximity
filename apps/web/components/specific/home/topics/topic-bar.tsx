'use client';
import { JSX, useCallback } from 'react';
import TopicButtonEnhanced from './topic-button-enhanced';
import TopicButtonPrimary from './topic-button-primary';
import { History } from 'lucide-react';
import { useDisplayTopicStore } from '@/stores/display-topic-store';

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
	const {topic, setTopic, loading, setLoading} = useDisplayTopicStore();

	const selectTag = useCallback(
		(id: string) => {
			if (id === topic) return;

			if (loading) {
				setLoading('');
			}

			setTopic(id);

			if (id !== 'for-you') return;

			setLoading(id);
			const timeoutId = setTimeout(() => {
				setLoading('');
			}, 3000);

			return () => clearTimeout(timeoutId);
		},
		[loading, topic, setTopic, setLoading]
	);

	const renderTopicButton = (tag: TopicTag) => {
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
	};

	return (
		<div className="w-full flex justify-center items-center gap-4 relative">
			<div className="absolute top-0 left-0 w-[7%] z-20 h-full bg-gradient-to-r from-[#ebeced] via-[#ebecedab] to-[#ebeced00]" />
			<div className="absolute top-0 right-0 w-[7%] z-20 h-full bg-gradient-to-r from-[#ebeced00] via-[#ebecedab] to-[#ebeced]" />

			<div className="flex items-center gap-4 w-full overflow-y-hidden overflow-x-scroll horizontal-scroll padding">
				{tags.map(renderTopicButton)}
			</div>
		</div>
	);
};

export default Tags;
