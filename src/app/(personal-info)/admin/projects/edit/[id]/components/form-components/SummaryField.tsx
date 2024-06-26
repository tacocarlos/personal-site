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

const SummaryFieldName = 'summary' as const;
type FieldProps = ControllerRenderProps<
    FormSchemaType,
    typeof SummaryFieldName
>;

function SummaryFieldRender({
    form,
    field,
}: FormItemProps & { field: FieldProps }) {
    return (
        <FormItem>
            <FormLabel>Project Summary</FormLabel>
            <FormControl>
                <Input {...field} placeholder="Project Summary" />
            </FormControl>
            <FormMessage />
        </FormItem>
    );
}

export default function SummaryField(props: FormItemProps) {
    return (
        <FormField
            control={props.form.control}
            name={SummaryFieldName}
            render={({ field }) => (
                <SummaryFieldRender {...props} field={field} />
            )}
        />
    );
}
