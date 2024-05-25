import { Dispatch } from 'react';
import { Action, State } from '../../projectActions';
import { formType } from '../EditProjectForm';
import {
    FormField,
    FormLabel,
    FormItem,
    FormControl,
    FormDescription,
    FormMessage,
} from '@/components/ui/form';
import { FormInput } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ControllerRenderProps } from 'react-hook-form';

type NameFieldProps = {
    form: formType;
    state: State;
    reducer: Dispatch<Action>;
};

type FieldProps = ControllerRenderProps<
    {
        name: string;
        tags: [string, ...string[]];
        summary: string;
        description: string | null;
        visible: boolean;
    },
    'name'
>;

function NameFieldRender({
    form,
    state,
    reducer,
    field,
}: NameFieldProps & { field: FieldProps }) {
    return (
        <FormItem>
            <FormLabel>Project Name</FormLabel>
            <FormControl>
                <Input placeholder={state.selectedProject?.name} {...field} />
            </FormControl>
            <FormMessage />
        </FormItem>
    );
}

export default function NameField(props: {
    form: formType;
    state: State;
    reducer: Dispatch<Action>;
}) {
    return (
        <FormField
            control={props.form.control}
            name="name"
            render={({ field }) => <NameFieldRender {...props} field={field} />}
        />
    );
}
