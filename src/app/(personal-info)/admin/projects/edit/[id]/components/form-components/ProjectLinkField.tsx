import { ControllerRenderProps } from 'react-hook-form';
import { FormItemProps } from './FormItemProps';
import { FormSchemaType } from './FormSchema';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

type FieldProps = ControllerRenderProps<FormSchemaType, 'projectLink'>;

function ProjectLinkRender({ field }: { field: FieldProps }) {
    return (
        <FormItem>
            <FormLabel>Project Link</FormLabel>
            <FormControl>
                <Input type="url" placeholder="Project Link" {...field} />
            </FormControl>
            <FormMessage />
        </FormItem>
    );
}

export default function ProjectLinkField({ form }: FormItemProps) {
    return (
        <FormField
            control={form.control}
            name="projectLink"
            render={({ field }) => <ProjectLinkRender field={field} />}
        />
    );
}
