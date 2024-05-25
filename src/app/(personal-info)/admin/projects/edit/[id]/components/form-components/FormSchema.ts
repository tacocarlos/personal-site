import { z } from 'zod';
import { UseFormReturn } from 'react-hook-form';

const TagField = z.object({
    tag: z.string().min(1).max(10),
});

export const FormSchema = z.object({
    name: z.string().min(5).max(50),
    tags: z.array(TagField),
    summary: z.string().min(10).max(100),
    description: z.string().min(10).nullable(),
    visible: z.boolean(),
});

export type FormSchemaType = z.infer<typeof FormSchema>;
export type FormType = UseFormReturn<FormSchemaType, any, undefined>;
