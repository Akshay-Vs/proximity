import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

interface TextCheveronProps {
	href: string;
	label: string;
}

const TextCheveron = ({ href, label }: TextCheveronProps) => {
	return (
		<Link href={href} className="flex justify-between items-center px-4 py-3 hover:bg-accent rounded-2xl transition-colors duration-300">
			<p className="text-lg">{label}</p>
			<ArrowUpRight />
		</Link>
	);
};

export default TextCheveron;
