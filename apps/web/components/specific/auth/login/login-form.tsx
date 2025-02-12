'use client';
import { z } from 'zod';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@proximity/ui/shadcn/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import StyledInput from '@/components/shared/input/styled-input';
import { Button } from '@proximity/ui/shadcn/button';
import PasswordInput from '@/components/shared/input/password-input';
import { useRouter } from 'nextjs-toploader/app';
import Link from 'next/link';
import { loginAction } from '@/actions/login-action';
import { loginSchema } from '@/schemas/login-schema';

const LoginForm = () => {
	const router = useRouter();
	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = async (values: z.infer<typeof loginSchema>) => {
		await loginAction(values);
		router.push('/');
	};

	return (
		<div className="w-full center flex flex-col">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col  justify-center gap-4 full"
				>
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

					<Button type="submit" className="h-14 px-7 rounded-full mt-4">
						Login
					</Button>

					<div className="flex justify-between">
						<Link href="/auth/reset-passowrd" className="text-end px-2 text-sm">
							forgot password?
						</Link>
						<Link href="/auth/register" className="text-end px-2 text-sm">
							create new account
						</Link>
					</div>
				</form>
			</Form>
		</div>
	);
};

export default LoginForm;
