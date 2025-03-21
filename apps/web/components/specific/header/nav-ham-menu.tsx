const NavHamMenu = () => {
	return (
		<>
			<div className="lg:hidden flex flex-col gap-3 h-full">
				<div className="h-[3.5px] w-8 rounded-full bg-black" />
				<div className="h-[3.5px] w-8 rounded-full bg-black" />
			</div>

			<div className="h-10 w-10 bg-slate-800 rounded-full hidden lg:block"></div>
		</>
	);
};

export default NavHamMenu;
