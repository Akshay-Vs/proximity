import { Button } from '@proximity/ui/shadcn/button';
import { Separator } from '@proximity/ui/shadcn/separator';

const Home = () => {
	return (
		<main className="w-full h-full flex flex-col justify-center items-center">
			<h1>Proximity</h1>
			<Button>Hello</Button>
			<Separator />
		</main>
	);
};

export default Home;
