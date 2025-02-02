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
const loginSchema = z.object({
	email: z.string().email(),
	password: z
		.string()
		.min(8, { message: 'Password must contains atleast 8 characters' }),
});

const LoginForm = () => {
	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	function onSubmit(values: z.infer<typeof loginSchema>) {
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
				</form>
			</Form>
		</div>
	);
};

export default LoginForm;
