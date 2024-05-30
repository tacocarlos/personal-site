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

type FieldProps = ControllerRenderProps<FormSchemaType, 'sourceLink'>;

function SourceLinkRender({ field }: { field: FieldProps }) {
    return (
        <FormItem>
            <FormLabel>Project Source Code Link</FormLabel>
            <FormControl>
                <Input {...field} placeholder="Project Source Link" />
            </FormControl>
            <FormMessage />
        </FormItem>
    );
}

export default function SourceLinkField({ form }: FormItemProps) {
    return (
        <FormField
            control={form.control}
            name="sourceLink"
            render={({ field }) => <SourceLinkRender field={field} />}
        />
    );
}
