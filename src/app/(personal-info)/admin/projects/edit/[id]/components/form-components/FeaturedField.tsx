import { ControllerRenderProps } from 'react-hook-form';
import { FormItemProps } from './FormItemProps';
import { FormSchemaType } from './FormSchema';
import { FormControl, FormField, FormItem } from '@/components/ui/form';
import CheckboxField from './CheckboxField';

type FieldProps = ControllerRenderProps<FormSchemaType, 'featured'>;

function FeaturedFieldRender({
    form,
    field,
}: FormItemProps & { field: FieldProps }) {
    return (
        <FormItem>
            <FormControl>
                <CheckboxField
                    field={field}
                    id="featured"
                    label="Feature Project"
                />
            </FormControl>
        </FormItem>
    );
}

export default function FeaturedField(props: FormItemProps) {
    return (
        <FormField
            control={props.form.control}
            name="featured"
            render={({ field }) => (
                <FeaturedFieldRender {...props} field={field} />
            )}
        />
    );
}
