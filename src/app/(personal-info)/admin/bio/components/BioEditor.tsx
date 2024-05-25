import { Textarea } from '@/components/ui/textarea';
import { Dispatch, useState } from 'react';
import MarkdownRenderer from '@/components/markdown/MarkdownRenderer';
import { useIsMounted } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Action, BioActions, State } from '../_bioReducer';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { updateBio } from '../_actions';
import MarkdownEditor from '@/components/markdown/MarkdownEditor';

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
        <MarkdownEditor
            content={bio}
            handleContentChange={(newContent) => handleChange(newContent)}
            extraTabListButtons={
                <Button
                    disabled={!differentContent}
                    className="h-8 bg-green-600 transition-colors duration-500 disabled:bg-slate-700"
                    onClick={applyChanges}>
                    Apply Changes
                </Button>
            }
        />
    );
}
