import {
    FormField,
    FormLabel,
    FormItem,
    FormControl,
    FormDescription,
    FormMessage,
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';
import { ControllerRenderProps } from 'react-hook-form';
import { FormItemProps } from './FormItemProps';
import { FormSchemaType } from './FormSchema';

type FieldProps = ControllerRenderProps<FormSchemaType, 'name'>;

function NameFieldRender({
    form,
    field,
}: FormItemProps & { field: FieldProps }) {
    return (
        <FormItem>
            <FormLabel>Project Name</FormLabel>
            <FormControl>
                <Input placeholder={'Project Name'} {...field} />
            </FormControl>
            <FormMessage />
        </FormItem>
    );
}

export default function NameField(props: FormItemProps) {
    return (
        <FormField
            control={props.form.control}
            name="name"
            render={({ field }) => <NameFieldRender {...props} field={field} />}
        />
    );
}
