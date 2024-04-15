import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { createUser, getRestaurants } from '@/http/api';
import { CreateUser, Tenant, User } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

const formSchema = z.object({
  firstName: z
    .string({ required_error: 'First name is required' })
    .min(1, 'First name is required'),
  lastName: z
    .string({ required_error: 'Last name is required' })
    .min(1, 'Last name is required'),
  email: z
    .string({ required_error: 'Email is required' })
    .min(1, 'Email is required')
    .email('This is not a valid email.'),
  password: z
    .string({ required_error: 'Password is required' })
    .min(8, `Password must contain at least 8 characters`),
  role: z.string({ required_error: 'Role is required' }),
  tenantId: z.string({ required_error: 'Restaurant is required' }),
});

interface UserFormProps {
  currentEditingUser: User | null;
  setCurrentEditingUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserForm = ({
  currentEditingUser,
  setCurrentEditingUser,
}: UserFormProps) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      password: '',
      email: '',
    },
  });
  // form.setValue('firstName', `It's firstname`);
  const { data: restaurants } = useQuery({
    queryKey: ['restaurants'],
    queryFn: () => {
      // TODO: make this dynamic, like search for tenants in the input
      return getRestaurants(`perPage=100&currentPage=1`).then(
        (res) => res.data
      );
    },
  });

  const { mutate: userMutate } = useMutation({
    mutationKey: ['user'],
    mutationFn: async (data: CreateUser) =>
      createUser(data).then((res) => res.data),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      return;
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log({ ...values, tenantId: parseInt(values.tenantId) });
    await userMutate({ ...values, tenantId: parseInt(values.tenantId) });
    form.reset();
    form.resetField('role');
    form.resetField('tenantId');
    setOpen(false);
  };

  const onOpenChange = () => {
    form.reset();
    setOpen((prev: boolean) => !prev);
  };

  useEffect(() => {
    if (currentEditingUser) {
      setOpen(true);
      form.setValue('firstName', currentEditingUser.firstName);
      form.setValue('lastName', currentEditingUser.lastName);
      form.setValue('email', currentEditingUser.email);
      form.setValue('role', currentEditingUser.role);
      form.setValue('tenantId', String(currentEditingUser.tenant?.id));
    }
  }, [currentEditingUser, form]);

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        {/* <SheetTrigger asChild> */}
        <Button className="ml-auto" size="sm" onClick={() => setOpen(true)}>
          <Plus className="h-4 w-4 mr-2" /> Add user
        </Button>
        {/* </SheetTrigger> */}
        <SheetContent className="bg-gray-100 sm:max-w-2xl p-0 flex flex-col gap-0">
          <SheetHeader className="bg-white px-5 py-3">
            <SheetTitle>Create user</SheetTitle>
          </SheetHeader>
          <ScrollArea className="h-full">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5 p-5"
              >
                <Card>
                  <CardHeader className="border-b py-2">
                    <CardTitle className="text-base font-semibold">
                      Basic info
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-5">
                    <div className="grid grid-cols-2 gap-5">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              First name <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input {...field} autoComplete="off" />
                            </FormControl>
                            <FormMessage className="text-[13px]" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Last name <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage className="text-[13px]" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Email <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="email"
                                autoComplete="off"
                              />
                            </FormControl>
                            <FormMessage className="text-[13px]" />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="border-b py-2">
                    <CardTitle className="text-base font-semibold">
                      Security info
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-5">
                    <div className="grid grid-cols-2 gap-5">
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Password <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="password"
                                autoComplete="off"
                              />
                            </FormControl>
                            <FormMessage className="text-[13px]" />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="border-b py-2">
                    <CardTitle className="text-base font-semibold">
                      Roles
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-5">
                    <div className="grid grid-cols-2 gap-5">
                      <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Role <span className="text-red-500">*</span>
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select role" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="admin">Admin</SelectItem>
                                <SelectItem value="manager">Manager</SelectItem>
                                <SelectItem value="customer">
                                  Customer
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage className="text-[13px]" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="tenantId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Restaurant <span className="text-red-500">*</span>
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select role" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {restaurants?.data.map((item: Tenant) => (
                                  <SelectItem
                                    key={item.id}
                                    value={String(item.id)}
                                  >
                                    {item.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage className="text-[13px]" />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
                <div className="flex justify-end">
                  {/* <SheetClose asChild> */}
                  <Button
                    type="button"
                    variant="outline"
                    className="mr-3"
                    onClick={() => {
                      form.reset();
                      setOpen(false);
                    }}
                  >
                    Cancle
                  </Button>
                  {/* </SheetClose> */}
                  <Button type="submit">Save changes</Button>
                </div>
              </form>
            </Form>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default UserForm;
