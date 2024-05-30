'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';

import {
    FormSchema,
    FormSchemaType,
} from '../edit/[id]/components/form-components/FormSchema';
import { useToast } from '@/components/ui/use-toast';
import { NameField } from './FormItems';
import VisibleField from '../edit/[id]/components/form-components/VisibleField';
import FeaturedField from '../edit/[id]/components/form-components/FeaturedField';
import DescriptionField from '../edit/[id]/components/form-components/DescriptionField';
import ProjectLinkField from '../edit/[id]/components/form-components/ProjectLinkField';
import SummaryField from '../edit/[id]/components/form-components/SummaryField';
import TagField from '../edit/[id]/components/form-components/TagField';
import TaglineField from '../edit/[id]/components/form-components/TaglineField';
import SourceLinkField from '../edit/[id]/components/form-components/sourceLink';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { AddNewProject, AddNewProjectFromForm } from './_actions';
import { sleep } from '@/lib/utils';

export default function NewProjectForm() {
    const router = useRouter();
    const { toast } = useToast();
    const form = useForm<FormSchemaType>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: '',
            tags: [],

            tagline: '',
            summary: '',
            description: '',

            visible: false,
            featured: false,

            projectLink: '',
            sourceLink: '',
        },
    });

    function onSubmit(values: FormSchemaType) {
        console.log(values);

        AddNewProjectFromForm(values).then((project) => {
            toast({
                description:
                    'Successfully added project. Redirecting in 3 seconds...',
            });
            sleep(3000).then(() => {
                router.push('/admin/projects');
            });
        });
    }

    const fieldProps = {
        form: form,
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Project Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Project Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <TaglineField {...fieldProps} />
                <TagField {...fieldProps} />
                <SummaryField {...fieldProps} />
                <DescriptionField {...fieldProps} />
                <SourceLinkField {...fieldProps} />
                <ProjectLinkField {...fieldProps} />
                <div className="flex space-x-1">
                    <VisibleField form={form} />
                    <FeaturedField form={form} />
                </div>
                <Button type="submit">Submit New Project</Button>
            </form>
        </Form>
    );
}
