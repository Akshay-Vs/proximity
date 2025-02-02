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
const registerSchema = z.object({
	username: z.string().min(1, { message: 'Username is required' }),
	email: z.string().email(),
	password: z
		.string()
		.min(8, { message: 'Password must contains atleast 8 characters' }),
});

const RegisterForm = () => {
	const router = useRouter();
	const form = useForm<z.infer<typeof registerSchema>>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			username: '',
			email: '',
			password: '',
		},
	});

	function onSubmit(values: z.infer<typeof registerSchema>) {
		//TODO add register logic here

		router.push('/');
		console.log(values);
	}

	return (
		<div className="w-full center flex flex-col">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col  justify-center gap-4 full"
				>
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

					<Button type="submit" className="h-14 px-7 rounded-full mt-4">
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
