import { ControllerRenderProps } from 'react-hook-form';
import { FormItemProps } from './FormItemProps';
import { FormSchemaType } from './FormSchema';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

type FieldProps = ControllerRenderProps<FormSchemaType, 'tagline'>;

function TaglineRender({ field }: { field: FieldProps }) {
    return (
        <FormItem>
            <FormLabel>Project Tagline</FormLabel>
            <FormControl>
                <Input placeholder="Project Tagline" {...field} />
            </FormControl>
        </FormItem>
    );
}

export default function TaglineField({ form }: FormItemProps) {
    return (
        <FormField
            control={form.control}
            name="tagline"
            render={({ field }) => <TaglineRender field={field} />}
        />
    );
}
