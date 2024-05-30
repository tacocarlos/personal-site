import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import MarkdownRenderer from './MarkdownRenderer';
import { ReactNode, useRef } from 'react';
import { ControllerRenderProps, FieldValues } from 'react-hook-form';
import { cn } from '@/lib/utils';

type MarkdownEditorPropsType = {
    content: string;
    handleContentChange: (newContent: string) => void;
    extraTabListButtons?: ReactNode;
};
export default function MarkdownEditor({
    content,
    handleContentChange,
    extraTabListButtons,
}: MarkdownEditorPropsType) {
    const tabTriggerSize = extraTabListButtons ? 'w-1/3' : 'w-1/2';
    return (
        <Tabs
            defaultValue="source"
            className="w-full rounded-md bg-slate-600 p-2">
            <TabsList className="flex justify-start md:w-1/2">
                <TabsTrigger value="source" className={tabTriggerSize}>
                    Edit
                </TabsTrigger>
                <TabsTrigger value="preview" className={tabTriggerSize}>
                    Preview
                </TabsTrigger>
                <span className="ml-1 flex space-x-3">
                    {extraTabListButtons ?? null}
                </span>
            </TabsList>
            <TabsContent value="source">
                <Textarea
                    onChange={(e) => {
                        handleContentChange(e.currentTarget.value);
                    }}
                    value={content}
                    className="h-[100px] md:h-[500px]"
                />
            </TabsContent>
            <TabsContent value="preview">
                <MarkdownRenderer markdown={content} className="bg-white p-2" />
            </TabsContent>
        </Tabs>
    );
}

type MarkdownEditorFormItemProps = {
    field: ControllerRenderProps;
    placeholder?: string;
    tabClassName?: string;
    textareaClassName?: string;
    markdownClassName?: string;
};

export function MarkdownEditorFormItem({
    field,
    placeholder,
    tabClassName,
    textareaClassName,
    markdownClassName,
}: MarkdownEditorFormItemProps) {
    const tabTriggerSize = 'w-1/2';
    return (
        <Tabs
            defaultValue="source"
            className={cn('w-full rounded-md bg-slate-600 p-2', tabClassName)}>
            <TabsList className="flex justify-start md:w-1/2">
                <TabsTrigger value="source" className={tabTriggerSize}>
                    Edit
                </TabsTrigger>
                <TabsTrigger value="preview" className={tabTriggerSize}>
                    Preview
                </TabsTrigger>
            </TabsList>
            <TabsContent value="source">
                <Textarea
                    {...field}
                    placeholder={placeholder}
                    className={cn('h-[100px] md:h-[500px]', textareaClassName)}
                />
            </TabsContent>
            <TabsContent value="preview">
                <MarkdownRenderer
                    markdown={field.value}
                    className={cn('bg-white p-2', markdownClassName)}
                />
            </TabsContent>
        </Tabs>
    );
}
