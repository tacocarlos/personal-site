import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { State, Action } from './projectActions';
import { Dispatch, useState } from 'react';
import MarkdownRenderer from '@/components/markdown/MarkdownRenderer';
import MarkdownEditor from '@/components/markdown/MarkdownEditor';

export default function ProjectEditor({
    state,
    reducer,
}: {
    state: State;
    reducer: Dispatch<Action>;
}) {
    const currentProject = state.selectedProject;
    const [name, setName] = useState(currentProject?.name ?? '');
    const [tags, setTags] = useState(currentProject?.tags ?? []);
    const [summary, setSummary] = useState(currentProject?.summary ?? '');
    const [visible, setVisible] = useState(currentProject?.visible ?? false);
    const [description, setDescription] = useState(
        currentProject?.description ?? ''
    );
    const [sourceLink, setSourceLink] = useState(
        currentProject?.sourceLink ?? ''
    );
    const [projectLink, setProjectLink] = useState(currentProject?.projectLink);

    const handleDescriptionChange = (newDesc: string) => {
        setDescription(newDesc);
    };

    return (
        <div>
            <MarkdownEditor
                content={description}
                handleContentChange={handleDescriptionChange}
            />
        </div>
    );
}
