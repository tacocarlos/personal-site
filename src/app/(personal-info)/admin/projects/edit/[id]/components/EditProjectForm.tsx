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
import { FormSchemaType, FormSchema } from './form-components/FormSchema';
import TagField from './form-components/TagField';
import SummaryField from './form-components/SummaryField';

export default function EditProjectForm({
    state,
    reducer,
}: {
    state: State;
    reducer: Dispatch<Action>;
}) {
    let defaultValues: FormSchemaType | undefined = undefined;
    if (state.selectedProject !== undefined) {
        const project = state.selectedProject;
        const tagObjArray = project.tags.map((tag) => {
            return {
                tag: tag,
            };
        });
        defaultValues = {
            name: project.name,
            tags: tagObjArray,
            summary: project.summary,
            description: project.description,
            visible: project.visible,
        };
    }

    const form = useForm<FormSchemaType>({
        resolver: zodResolver(FormSchema),
        defaultValues: defaultValues,
    });

    function onSubmit(values: FormSchemaType) {
        console.log(values);
    }

    const { selectedProject } = state;

    if (selectedProject === undefined) return null;

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <NameField form={form} state={state} reducer={reducer} />
                <TagField form={form} state={state} reducer={reducer} />
                <SummaryField form={form} state={state} reducer={reducer} />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}
