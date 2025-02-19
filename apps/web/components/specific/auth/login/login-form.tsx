'use client';
import Link from 'next/link';

import PasswordInput from '@/components/shared/input/password-input';
import StyledInput from '@/components/shared/input/styled-input';
import { Button } from '@proximity/ui/shadcn/button';
import UseLoginForm from '@/hooks/use-login-form';
import {
	Form,
	FormStatusMessage,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from '@proximity/ui/shadcn/form';

const LoginForm = () => {
	const { form, status, loading, initiateLogin } = UseLoginForm();

	return (
		<div className="w-full center flex flex-col">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(initiateLogin)}
					className="flex flex-col justify-center gap-4 full"
				>
					<FormStatusMessage status={status} />
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<StyledInput placeholder="Evelinviolet@mail.com" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<PasswordInput
										placeholder="********"
										className="placeholder:text-center"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						type="submit"
						loading={loading}
						className="h-14 px-7 rounded-full mt-4"
					>
						Login
					</Button>

					<div className="flex justify-between">
						<Link href="/auth/reset-password" className="text-end px-2 text-sm">
							Forgot password?
						</Link>
						<Link href="/auth/register" className="text-end px-2 text-sm">
							Create new account
						</Link>
					</div>
				</form>
			</Form>
		</div>
	);
};

export default LoginForm;
