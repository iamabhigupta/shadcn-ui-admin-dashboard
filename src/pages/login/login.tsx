import { zodResolver } from '@hookform/resolvers/zod';
import { LockKeyhole } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import Logo from '@/components/icons/logo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useMutation } from '@tanstack/react-query';
import { Credentials } from '@/types';
import { login } from '@/http/api';

const formSchema = z.object({
  username: z.string().email({ message: 'Please enter valid email address.' }),
  password: z.string().min(8, {
    message: 'Password must be 8 characters long',
  }),
  remember: z.boolean(),
});

const loginUser = async (credentials: Credentials) => {
  const { data } = await login(credentials);
  return data;
};

const LoginPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
      remember: true,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    mutate({
      email: values.username,
      password: values.password,
    });
    console.log(values);
  }

  const { mutate } = useMutation({
    mutationKey: ['login'],
    mutationFn: loginUser,
  });

  return (
    <div className="flex flex-col gap-y-8 justify-center items-center h-screen bg-orange-50/30">
      {/* <h1>Sign in</h1>
      <input type="email" placeholder="Username" />
      <input type="password" placeholder="Password" />
      <button>Log in</button>
      <label htmlFor="remember-me">Remember me</label>
      <input type="checkbox" id="remember-me" />
      <a href="#">Forgot password</a> */}
      <Logo />
      <Card className="w-[300px]">
        <CardHeader className="border-b py-4">
          <div className="flex justify-center items-center gap-x-2">
            <LockKeyhole strokeWidth={2} size={18} />
            <span className="font-semibold">Sign in</span>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Username</FormLabel> */}
                    <FormControl>
                      <Input
                        className="h-9 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-primary"
                        placeholder="Username"
                        {...field}
                      />
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
                    {/* <FormLabel>Password</FormLabel> */}
                    <FormControl>
                      <Input
                        className="h-9 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-primary"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-between">
                <FormField
                  control={form.control}
                  name="remember"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="rounded-sm"
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Remember me
                      </FormLabel>
                    </FormItem>
                  )}
                />
                <span className="text-sm font-medium text-orange-600">
                  Forgot Password
                </span>
              </div>
              <Button size="sm" type="submit" className="w-full">
                Login
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
