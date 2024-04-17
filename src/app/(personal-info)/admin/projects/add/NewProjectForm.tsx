"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { formSchema, FormSchemaType } from "./FormSchema";
import { NameField, Tagline } from "./FormItems";
import { Input } from "@/components/ui/input";


// import { z } from "zod";
// const formSchema = z.object({
//     projectName: z.string().min(5).max(50)
// })



// type FormSchemaType = z.infer<typeof formSchema>;

export default function NewProjectForm() {
    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            projectName: "",
            tagline: "",
        }
    })

    function onSubmit(values: FormSchemaType) {
        console.log(values);
        alert(JSON.stringify(values, ));
    }

    return <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <NameField form={form}/>
            <Tagline form={form}/>
            <Button type="submit">Submit</Button>
        </form>
    </Form>
}