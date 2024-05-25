import { ControllerRenderProps, useFieldArray } from 'react-hook-form';
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
import { Button } from '@/components/ui/button';

const TagFieldName = 'tags' as const;
type FieldProps = ControllerRenderProps<FormSchemaType, typeof TagFieldName>;

function TagFieldRender({
    form,
    state,
    reducer,
    field,
}: FormItemProps & { field: FieldProps }) {
    const control = form.control;
    const { selectedProject } = state;

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'tags',
    });

    const fieldCount = fields.length;

    if (selectedProject === undefined) return null;
    return (
        <FormItem>
            <FormLabel>Project Tags</FormLabel>
            <FormControl>
                <div className="flex flex-col space-y-4">
                    {fieldCount === 0 ? (
                        <span className="text-sm text-muted-foreground">
                            No Tags
                        </span>
                    ) : null}
                    <ul className="space-y-1">
                        {fields.map((field, index) => {
                            return (
                                <Input
                                    key={field.id}
                                    {...form.register(`tags.${index}.tag`)}
                                />
                            );
                        })}
                    </ul>
                    <div className="space-x-5">
                        <Button
                            type="button"
                            onClick={() => {
                                append({ tag: '' });
                            }}>
                            Append
                        </Button>
                        <Button
                            type="button"
                            onClick={() => {
                                remove(fields.length - 1);
                            }}>
                            Remove Last
                        </Button>
                    </div>
                </div>
            </FormControl>

            <FormMessage />
        </FormItem>
    );
}

export default function TagField(props: FormItemProps) {
    return (
        <FormField
            control={props.form.control}
            name={TagFieldName}
            render={({ field }) => <TagFieldRender {...props} field={field} />}
        />
    );
}
