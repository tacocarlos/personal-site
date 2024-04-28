import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { PowerMethodStepResult } from '@matrix/algorithms/eigenvalue-power/eigenApproxPower';
import { useState } from 'react';
import IterationRow from './IterationRow';
import { Accordion } from '@/components/ui/accordion';
import { useToast } from '@/components/ui/use-toast';
import { Separator } from '@/components/ui/separator';

export default function IterationViewer({
    iterations,
}: {
    iterations: PowerMethodStepResult[];
}) {
    const [isOpen, setIsOpen] = useState(false);
    const { toast } = useToast();

    const handleOpen = () => {
        if (iterations.length === 0) {
            toast({
                title: 'No iteration steps found',
                description:
                    "Couldn't find any iteration steps. Have you already ran the power method?",
            });
            return;
        }

        setIsOpen((prev) => !prev);
    };

    return (
        <Collapsible
            open={isOpen}
            onOpenChange={handleOpen}
            className="rounded border-[1px] border-solid border-blue-600 p-1">
            <CollapsibleTrigger className=" flex w-full flex-col rounded border-[3px] border-primary hover:bg-slate-400">
                <p className="self-start text-3xl">
                    View Iteration Steps{' '}
                    {iterations.length === 0 ? ' [Empty]' : ''}
                </p>
                <Separator orientation="horizontal" className="w-full" />
            </CollapsibleTrigger>
            <CollapsibleContent>
                <Accordion type="multiple" className="w-full space-y-5">
                    {iterations.map((step) => (
                        <IterationRow key={step.iteration} iteration={step} />
                    ))}
                </Accordion>
            </CollapsibleContent>
        </Collapsible>
    );
}
