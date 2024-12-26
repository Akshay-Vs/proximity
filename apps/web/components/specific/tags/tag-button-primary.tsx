import { Button } from '@proximity/ui/shadcn/button';

interface TagButtonPrimaryProps {
	label: string;
}

const TagButtonPrimary = ({ label }: TagButtonPrimaryProps) => {
	return (
		<Button variant="tag" className="h-12 px-7">
			{label}
		</Button>
	);
};

export default TagButtonPrimary;
