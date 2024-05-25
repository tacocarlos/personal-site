import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { UseFormReturn, useForm } from 'react-hook-form';
import { Action, State } from '../projectActions';
import { Dispatch } from 'react';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import NameField from './form-components/NameField';

const formSchema = z.object({
    name: z.string().min(10).max(50),
    tags: z
        .string()
        .min(1)
        .max(10)
        .array()
        .nonempty({ message: 'Need at least one tag!' }),
    summary: z.string().min(10).max(100),
    description: z.string().min(10).nullable(),
    visible: z.boolean(),
});

export type formSchemaType = z.infer<typeof formSchema>;
export type formType = UseFormReturn<formSchemaType, any, undefined>;

export default function EditProjectForm({
    state,
    reducer,
}: {
    state: State;
    reducer: Dispatch<Action>;
}) {
    const form = useForm<formSchemaType>({
        resolver: zodResolver(formSchema),
    });

    function onSubmit(values: formSchemaType) {
        console.log(values);
    }

    const { selectedProject } = state;

    if (selectedProject === undefined) return null;

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <NameField form={form} state={state} reducer={reducer} />
            </form>
        </Form>
    );
}
