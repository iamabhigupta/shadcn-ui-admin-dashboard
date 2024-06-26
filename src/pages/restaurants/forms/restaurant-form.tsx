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
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { createTenant } from '@/http/api';
import { CreateTenant } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

const formSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .min(1, 'Name is required'),
  address: z
    .string({ required_error: 'Addresss is required' })
    .min(1, 'Addresss is required'),
});

const RestaurantForm = () => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      address: '',
    },
  });

  const { mutate: userMutate } = useMutation({
    mutationKey: ['restaurant'],
    mutationFn: async (data: CreateTenant) =>
      createTenant(data).then((res) => res.data),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['restaurants'] });
      return;
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log({ ...values });
    await userMutate({ ...values });
    form.reset();
    // form.resetField('address');
    // form.resetField('name');
    setOpen(false);
  };

  const onOpenChange = () => {
    form.reset();
    setOpen((prev) => !prev);
  };

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        {/* <SheetTrigger asChild> */}
        <Button className="ml-auto" size="sm" onClick={() => setOpen(true)}>
          <Plus className="h-4 w-4 mr-2" /> Add restaurant
        </Button>
        {/* </SheetTrigger> */}
        <SheetContent className="bg-gray-100 sm:max-w-2xl p-0 flex flex-col gap-0">
          <SheetHeader className="bg-white px-5 py-3">
            <SheetTitle>Create restaurant</SheetTitle>
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
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Name <span className="text-red-500">*</span>
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
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Address <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
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

export default RestaurantForm;
