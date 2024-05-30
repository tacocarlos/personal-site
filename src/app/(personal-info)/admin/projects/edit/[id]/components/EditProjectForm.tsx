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
import DescriptionField from './form-components/DescriptionField';
import VisibleField from './form-components/VisibleField';
import FeaturedField from './form-components/FeaturedField';
import { updateProject } from '../_actions';
import { Project } from '@data/Project';
import TaglineField from './form-components/TaglineField';
import SourceLinkField from './form-components/sourceLink';
import ProjectLinkField from './form-components/ProjectLinkField';
import { useToast } from '@/components/ui/use-toast';

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

            tagline: project.tagline,
            summary: project.summary,
            description: project.description ?? '',

            visible: project.visible,
            featured: project.featured,

            projectLink: project.projectLink ?? undefined,
            sourceLink: project.projectLink ?? undefined,
        };
    }

    const { toast } = useToast();
    const form = useForm<FormSchemaType>({
        resolver: zodResolver(FormSchema),
        defaultValues: defaultValues,
    });

    const { selectedProject } = state;
    function onSubmit(values: FormSchemaType) {
        if (selectedProject === undefined) return;

        console.log('submitted at ' + new Date().toLocaleString());
        console.log(values);

        const updateData = {
            ...values,
            tags: values.tags.map((tagObj) => tagObj.tag),
            projectLink: values.projectLink ?? null,
            sourceLink: values.sourceLink ?? null,
        };

        updateProject(selectedProject.id, updateData).then(() => {
            const newProject: Project = {
                ...selectedProject,
                updatedAt: new Date(),
                ...updateData,
            };

            reducer({
                kind: 'update-project',
                params: {
                    selectedProject: newProject,
                },
            });

            toast({
                description: (
                    <>
                        <span>
                            Updated{' '}
                            <span className="text-[9pt]">
                                {selectedProject.id}
                            </span>
                        </span>
                    </>
                ),
            });
        });
    }

    if (selectedProject === undefined) return null;

    const fieldProps = {
        form: form,
        state: state,
        reducer: reducer,
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="text-[1rem] font-medium">
                    <span>
                        Created At:{' '}
                        {state.selectedProject?.createdAt.toLocaleString()}
                    </span>
                    <br />
                    <span>
                        Updated At:{' '}
                        {state.selectedProject?.updatedAt.toLocaleString()}
                    </span>
                </div>

                <div className="flex space-x-1">
                    <VisibleField {...fieldProps} />
                    <FeaturedField {...fieldProps} />
                </div>

                <NameField {...fieldProps} />
                <TaglineField {...fieldProps} />
                <TagField {...fieldProps} />
                <SummaryField {...fieldProps} />
                <DescriptionField {...fieldProps} />
                <SourceLinkField {...fieldProps} />
                <ProjectLinkField {...fieldProps} />
                <Button type="submit">Apply Changes</Button>
            </form>
        </Form>
    );
}
