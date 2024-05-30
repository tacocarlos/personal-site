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
import { MarkdownEditorFormItem } from '@/components/markdown/MarkdownEditor';
import { ChangeEvent, useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

type FieldProp = ControllerRenderProps<FormSchemaType, 'description'>;

function DescriptionFieldRender({
    form,
    field,
}: FormItemProps & { field: FieldProp }) {
    return (
        <FormItem>
            <FormLabel>Project Description</FormLabel>
            <FormControl>
                <MarkdownEditorFormItem
                    field={field}
                    placeholder="Project Description"
                    tabClassName="bg-primary"
                />
            </FormControl>
            <FormMessage />
        </FormItem>
    );
}

export default function DescriptionField(props: FormItemProps) {
    return (
        <FormField
            control={props.form.control}
            name="description"
            render={({ field }) => (
                <DescriptionFieldRender {...props} field={field} />
            )}
        />
    );
}
