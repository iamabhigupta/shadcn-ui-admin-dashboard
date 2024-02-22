import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader2, LockKeyhole } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Logo } from '@/components/icons/logo';
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
import { useLogout } from '@/hooks/use-logout';
import { usePermissions } from '@/hooks/use-permissions';
import { login, self } from '@/http/api';
import { useAuth } from '@/store/use-auth';
import { Credentials } from '@/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

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

const getUser = async () => {
  const { data } = await self();
  return data;
};

const LoginPage = () => {
  const [show, setShow] = useState(false);

  const { setUser } = useAuth();
  const { logoutMutate } = useLogout();
  const { isAllowed } = usePermissions();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
      remember: true,
    },
  });

  const { refetch } = useQuery({
    queryKey: ['self'],
    queryFn: getUser,
    enabled: false,
  });

  const { mutate, isPending, isError } = useMutation({
    mutationKey: ['login'],
    mutationFn: loginUser,
    onSuccess: async () => {
      const selfDataPromise = await refetch();
      if (!isAllowed(selfDataPromise.data)) {
        logoutMutate();
        return;
      }
      setUser(selfDataPromise.data);
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate({
      email: values.username,
      password: values.password,
    });
    console.log(values);
  }

  isError && toast.error('Something went wrong');

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
      <Card className="w-[320px]">
        <CardHeader className="border-b py-4">
          <div className="flex justify-center items-center gap-x-2">
            <LockKeyhole strokeWidth={2} size={18} />
            <span className="font-semibold">Sign in</span>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                      <div className="relative">
                        <Input
                          className="h-9 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-primary"
                          placeholder="Password"
                          type={show ? 'text' : 'password'}
                          {...field}
                        />
                        {show ? (
                          <Eye
                            onClick={() => setShow((state) => !state)}
                            className="absolute cursor-pointer h-4 w-4 top-2.5 right-3"
                            strokeWidth={1}
                          />
                        ) : (
                          <EyeOff
                            onClick={() => setShow((state) => !state)}
                            className="absolute cursor-pointer h-4 w-4 top-2.5 right-3"
                            strokeWidth={1}
                          />
                        )}
                      </div>
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
                <span className="text-sm font-medium text-primary">
                  Forgot Password
                </span>
              </div>
              <Button
                disabled={isPending}
                size="sm"
                type="submit"
                className="w-full"
              >
                {isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
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
