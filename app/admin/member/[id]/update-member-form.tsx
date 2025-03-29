'use client';

import { z } from 'zod';
import { updateMemberSchema } from '@/lib/validators';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ControllerRenderProps, useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from '@/components/ui/select';
import { USER_ROLES } from '@/lib/constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { updateMember } from '@/lib/actions/user.actions';


const UpdateMemberForm = ({member} : {
    member: z.infer<typeof updateMemberSchema>;
}) => {
    const router = useRouter();

    const {toast} = useToast();

    const form = useForm<z.infer<typeof updateMemberSchema>>({
        resolver: zodResolver(updateMemberSchema),
        defaultValues: member,
    });

    const onSubmit = async(values: z.infer<typeof updateMemberSchema>) => {
        try {

            // Update member
            const res = await updateMember({
                ...values,
                id: member.id,
            });

            if(!res) return toast({
                variant: 'destructive',
                description: 'An error occurred while updating member'
            });

            toast({
                description: res.message
            });

            form.reset();
            router.push('/admin/members');
            
            return;
        } catch (error) {
            toast({
                variant: 'destructive',
                description: (error as Error).message
            });
            
        }
    }

    return <Form {...form}>
    <form method='POST' onSubmit={form.handleSubmit(onSubmit)}>
        {/* NAME */}
        <div>
        <FormField
            control={form.control}
            name="name"
            render={({ field }: { field: ControllerRenderProps<z.infer<typeof updateMemberSchema>, 'name'> }) => (
              <FormItem className="w-full">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter product name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          </div>
        {/* EMAIL */}
        <div>
        <FormField
            control={form.control}
            name="email"
            render={({ field }: { field: ControllerRenderProps<z.infer<typeof updateMemberSchema>, 'email'> }) => (
              <FormItem className="w-full">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input disabled={true} placeholder="Enter member email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          </div>
        {/* ROLE */}
        <div>
          <FormField
            control={form.control}
            name='role'
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof updateMemberSchema>,
                'role'
              >;
            }) => (
              <FormItem className='w-full'>
                <FormLabel>Role</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select a role' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {USER_ROLES.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
          <div className='flex-between mt-4'>
            <Button type='submit' className='w-full' disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Submitting...' : 'Update Member'}
            </Button>
          </div>
    </form>
    </Form>;
};
 
export default UpdateMemberForm;