import { ControllerRenderProps } from 'react-hook-form';
import { FormItemProps } from './FormItemProps';
import { FormSchemaType } from './FormSchema';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import CheckboxField from './CheckboxField';

type FieldProps = ControllerRenderProps<FormSchemaType, 'visible'>;

function VisibleFieldRender({
    form,
    field,
}: FormItemProps & { field: FieldProps }) {
    return (
        <FormItem>
            <FormControl>
                <CheckboxField
                    field={field}
                    id="visible"
                    label="Make Project Visible"
                />
            </FormControl>
        </FormItem>
    );
}

export default function VisibleField(props: FormItemProps) {
    return (
        <FormField
            control={props.form.control}
            name="visible"
            render={({ field }) => (
                <VisibleFieldRender {...props} field={field} />
            )}
        />
    );
}
