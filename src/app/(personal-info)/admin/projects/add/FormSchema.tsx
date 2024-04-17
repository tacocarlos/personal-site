import { z } from "zod";

export const formSchema = z.object({ 
    projectName: z.string()
        .min(2, {message: "Project name must be at least 2 characters"})
        .max(50, {message: "Project name must be shorter than 50 characters"}),

    tagline: z.string()
        .min(10, )
        .max(200, {message: "Tagline must be shorter than 200 characters"}),
})

export type FormSchemaType = z.infer<typeof formSchema>