import { Checkbox } from '@/components/ui/checkbox';
import { ControllerRenderProps } from 'react-hook-form';

export default function CheckboxField({
    field,
    id,
    label,
}: {
    field: ControllerRenderProps;
    id: string;
    label: string;
}) {
    return (
        <div className="flex w-fit items-center space-x-2 rounded-sm border-[2.5px] border-primary bg-white p-1 hover:bg-primary hover:text-white">
            <input
                type="checkbox"
                id={id}
                className="bg-white data-[state=checked]:bg-white data-[state=checked]:text-black"
                checked={field.value}
                onChange={field.onChange}
            />
            <label
                htmlFor={id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {label}
            </label>
        </div>
    );
}
