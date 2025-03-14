interface ButtonBase {
	label: string;
	isSelected?: boolean;
  isLoading?: boolean;
  isDisabled?: boolean;
	onClick?: () => void;
}

export type {
  ButtonBase
}