'use client';
import Link from 'next/link';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'nextjs-toploader/app';

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
import { registerSchema } from '@/schemas/register-schema';
import { useState, useTransition } from 'react';
import { RegisterResponse } from '@/types/kratos-types';
import { registerAction } from '@/actions/register-action';

const RegisterForm = () => {
	const router = useRouter();

	const [status, setStatus] = useState<RegisterResponse>();
	const [loading, startLoading] = useTransition();

	const form = useForm<z.infer<typeof registerSchema>>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			username: '',
			email: '',
			password: '',
		},
	});

	function onSubmit(values: z.infer<typeof registerSchema>) {
		startLoading(async () => {
			const registration = await registerAction(values);
			setStatus(registration);
			if (registration.type === 'success') return router.push('/');
		});
	}

	return (
		<div className="w-full center flex flex-col">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col  justify-center gap-4 full"
				>
					<FormStatusMessage status={status} />
					<FormField
						control={form.control}
						name="username"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Username</FormLabel>
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
