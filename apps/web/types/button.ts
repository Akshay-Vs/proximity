import { ReactNode } from "react";

interface ButtonBase {
	label: string | ReactNode;
	isSelected?: boolean;
  isLoading?: boolean;
  isDisabled?: boolean;
	onClick?: () => void;
}

export type {
  ButtonBase
}