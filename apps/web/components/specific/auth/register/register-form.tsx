'use client';
import Link from 'next/link';

import StyledInput from '@/components/shared/input/styled-input';
import { Button } from '@proximity/ui/shadcn/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	FormStatusMessage,
} from '@proximity/ui/shadcn/form';
import PasswordInput from '@/components/shared/input/password-input';
import { useRegisterForm } from '@/hooks/use-register-form';

const RegisterForm = () => {
	const { form, status, loading, initiateRegister } = useRegisterForm();
	return (
		<div className="w-full center flex flex-col">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(initiateRegister)}
					className="flex flex-col  justify-center gap-4 full"
				>
					<FormStatusMessage status={status} />
					<FormField
						control={form.control}
						name="fullname"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Full Name</FormLabel>
								<FormControl>
									<StyledInput placeholder="Evelin Violet" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
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
								<FormLabel>Pasword</FormLabel>
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
						className="h-14 px-7 rounded-full mt-4"
						loading={loading}
					>
						Register
					</Button>

					<Link href="/auth/login" className="text-end px-2 text-sm">
						Already have an account?
					</Link>
				</form>
			</Form>
		</div>
	);
};

export default RegisterForm;
