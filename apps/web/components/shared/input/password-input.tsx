'use client';
import React, { useState } from 'react';
import StyledInput from './styled-input';
import { Button } from '@proximity/ui/shadcn/button';
import { Eye, EyeOff } from 'lucide-react';

const PasswordInput = ({
	...props
}: Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>) => {
	const [showPassword, setShowPassword] = useState(false);

	const togglePassword = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setShowPassword((prev) => !prev);
	};

	return (
		<StyledInput type={showPassword ? 'text' : 'password'} {...props}>
			<Button variant="ghost" onClick={(e) => togglePassword(e)}>
				{showPassword ? <EyeOff /> : <Eye />}
			</Button>
		</StyledInput>
	);
};

export default PasswordInput;
