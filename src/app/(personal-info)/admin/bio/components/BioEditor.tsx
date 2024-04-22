import { Textarea } from '@/components/ui/textarea';
import { Dispatch, useState } from 'react';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { useIsMounted } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Action, BioActions, State } from '../_bioReducer';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { updateBio } from '../_actions';

export default function BioEditor({
    state,
    reducer,
}: {
    state: State;
    reducer: Dispatch<Action>;
}) {
    const currentBio = state.selectedBio;
    const [bio, setBio] = useState(currentBio?.content ?? '');
    const originalBio = state.selectedBio?.content;

    const differentContent = originalBio !== bio;
    const { toast } = useToast();
    const isMounted = useIsMounted();
    if (!isMounted || currentBio === undefined) {
        return null;
    }

    const handleChange = (content: string) => {
        setBio(content);
    };

    const applyChanges = () => {
        const newBio = {
            ...currentBio,
            content: bio,
        };

        updateBio(newBio).then(() => {
            reducer({
                kind: BioActions.UpdateBio,
                params: {
                    ...newBio,
                },
            });

            toast({
                description: `${currentBio.name} has been updated.`,
            });
        });
    };

    return (
        <Tabs
            defaultValue="source"
            className="w-full bg-slate-600 p-2 rounded-md">
            <TabsList className="flex md:w-1/4">
                <TabsTrigger value="source" className="md:w-1/3">
                    Edit Bio
                </TabsTrigger>
                <TabsTrigger value="preview" className="md:w-1/3">
                    Preview Bio
                </TabsTrigger>
                <Button
                    disabled={!differentContent}
                    className="md:w-1/3 bg-green-600 disabled:bg-slate-700 transition-colors duration-500 h-8"
                    onClick={applyChanges}>
                    Apply Changes
                </Button>
            </TabsList>
            <TabsContent value="source">
                <Textarea
                    onChange={(e) => {
                        handleChange(e.currentTarget.value);
                    }}
                    value={bio}
                    className="h-[100px] md:h-[500px]"
                />
            </TabsContent>
            <TabsContent value="preview">
                <MarkdownRenderer markdown={bio} className="bg-white p-2" />
            </TabsContent>
        </Tabs>
    );
}
