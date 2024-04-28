import ViewableMatrix from '@/components/numerical/matrix/ViewableMatrix';
import {
    Accordion,
    AccordionItem,
    AccordionContent,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { sigFig } from '@/lib/utils';
import {
    PowerEndResult,
    PowerMainResult,
    PowerMethodStepResult,
} from '@matrix/algorithms/eigenvalue-power/eigenApproxPower';

function MainIterationRowContent({
    iteration,
}: {
    iteration: PowerMainResult;
}) {
    return (
        <div className="flex flex-col space-x-2 rounded bg-muted p-6 lg:flex-row">
            <p className="text-2xl ">Iteration {iteration.iteration}</p>
            <br />
            <span>
                Original Matrix: <ViewableMatrix matrix={iteration.matrix} />{' '}
            </span>
            <br />
            <span>Original Vector: {iteration.original.toComponent()}</span>
            <div>
                <p>Next Vector: </p>
                {iteration.next.toComponent()}
            </div>
        </div>
    );
}

function MainIterationRow({ iteration }: { iteration: PowerMainResult }) {
    return (
        <AccordionItem value={`${iteration.iteration}`}>
            <AccordionTrigger className="flex w-full text-2xl">
                <p className="self-start">
                    Iteration {iteration.iteration} -- Error:{' '}
                    {sigFig(iteration.error)}
                </p>
            </AccordionTrigger>
            <AccordionContent>
                <MainIterationRowContent iteration={iteration} />
            </AccordionContent>
        </AccordionItem>
    );
}

function EndIterationRow({ iteration }: { iteration: PowerEndResult }) {
    return <div className="flex space-x-3 rounded bg-red-600 p-6"></div>;
}

export default function IterationRow({
    iteration,
}: {
    iteration: PowerMethodStepResult;
}) {
    if (iteration.kind === 'main-step') {
        return <MainIterationRow iteration={iteration} />;
    } else {
        return <EndIterationRow iteration={iteration} />;
    }
}
