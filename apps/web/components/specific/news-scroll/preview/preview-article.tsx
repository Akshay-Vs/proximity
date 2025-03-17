import Link from "next/link";

interface PreviewArticleProps {
	title: string;
	article: string;
	tags: string[];
}

const PreviewArticle = ({ title, article, tags }: PreviewArticleProps) => {
	return (
		<>
			<div className="flex gap-2 w-full">
				{tags.map((tag) => (
					<Link href={`/tag/${tag}`} key={tag}>#{tag}</Link>
				))}			</div>
			<h1 className="text-[2rem] font-medium leading-tight tracking-normal">
				{title}
			</h1>

			<article className="text-[1.24rem]">{article}</article>
		</>
	);
};

export default PreviewArticle;
