import { Separator } from '@proximity/ui/shadcn/separator';

import NavLogo from './nav-logo';
import NavHamMenu from './nav-ham-menu';
import ExploreRedirectDesktop from '../home/explore-redirect/explore-redirect-desktop';

const Header = () => {
	return (
		<nav className="w-full flex flex-col h-fit col px-4 pt-4 gap-4">
			<div className="flex flex-row justify-between items-center">
				<NavLogo />
				<ExploreRedirectDesktop />
				<NavHamMenu />
			</div>
			<Separator />
		</nav>
	);
};

export default Header;
