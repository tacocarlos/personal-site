import { UseFormReturn } from "react-hook-form";
import { FormSchemaType } from "./FormSchema";
import { FormItem, FormLabel, FormControl, FormDescription, FormMessage, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";


type FormType = UseFormReturn<FormSchemaType>;

type ItemProps = {
    form: FormType;
}


type GenericShortTextFieldProps = ItemProps & {
    fieldName: any; // TODO: fix this type error; need to find out how to reference the field name type 
    label: string;
    inputPlaceholder?: string;
    fieldDescription?: string;
};

function GenericShortTextField({form, fieldName, label, inputPlaceholder, fieldDescription}: GenericShortTextFieldProps) {
    inputPlaceholder = inputPlaceholder ?? "";
    return <FormField control={form.control} name={fieldName}
    render={({field}) => 
        <FormItem>
            <FormLabel className="text-xl">{label}</FormLabel>
            <FormControl>
                <Input placeholder={inputPlaceholder} {...field}/>
            </FormControl>
            <FormDescription>
                {fieldDescription}
            </FormDescription>
            <FormMessage/>
        </FormItem>
    }
    />
}

export function NameField({form} : ItemProps) {
    return <GenericShortTextField form={form} fieldName="projectName" label="Project Name" fieldDescription="Enter a project name."/>
}

export function Tagline({form} : ItemProps) {
    return <FormField control={form.control} name="tagline"
    render={({field}) => {
        return <FormItem>
            <FormLabel className="text-xl">Project Tagline</FormLabel>
            <FormControl>
                <Input placeholder="" {...field}/>
            </FormControl>
            <FormDescription>
                This is the project tagline.
            </FormDescription>
            <FormMessage/>
        </FormItem>
    }}
    />
}