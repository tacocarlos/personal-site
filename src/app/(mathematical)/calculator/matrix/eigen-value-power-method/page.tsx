'use client';

import EditableMatrix from '@/components/numerical/matrix/EditableMatrix';
import parseMatrixSubmit, {
    MatrixFormResultType,
} from '@/components/numerical/matrix/EditableMatrixComponents/parseMatrixSubmit';
import ViewableMatrix from '@/components/numerical/matrix/ViewableMatrix';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useIsMounted } from '@/lib/utils';
import {
    PowerEndResult,
    PowerMethod,
    PowerMethodStepResult,
} from '@/numerical/matrix/algorithms/eigenvalue-power/eigenApproxPower';
import { HashMatrix } from '@/numerical/matrix/hashmatrix';
import { Matrix } from '@/numerical/matrix/matrix';
import { HashVector } from '@/numerical/vector/hashvector';
import { Vector, VectorDirection } from '@/numerical/vector/vector';
import { useState, useEffect, ReactNode } from 'react';
import IterationRow from './IterationRow';
import { Accordion } from '@/components/ui/accordion';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import IterationViewer from './IterationViewer';

function initMatrix() {
    const mat = new HashMatrix(3, 3);

    mat.set(0, 0, 1);
    mat.set(0, 1, -5);
    mat.set(0, 2, 8);

    mat.set(1, 0, 1);
    mat.set(1, 1, -2);
    mat.set(1, 2, 1);

    mat.set(2, 0, 2);
    mat.set(2, 1, -1);
    mat.set(2, 2, -5);

    return mat;
}

export default function EigenCalculator() {
    const [matrix, setMatrix] = useState<Matrix>(new HashMatrix(2, 2));
    const [initialVector, setInitialVector] = useState(
        HashVector.ones(3, VectorDirection.VERTICAL)
    );

    const [eigenValue, setEigenValue] = useState<number | undefined>();
    const [steps, setSteps] = useState<PowerMethodStepResult[]>([]);
    const { toast } = useToast();

    const isMounted = useIsMounted();
    const showIfMounted = (node: ReactNode, fallback?: ReactNode) => {
        return isMounted ? node : fallback ?? null;
    };

    const handleMatrixSubmit = (formData: MatrixFormResultType) => {
        if (formData.success) {
            toast({
                description: 'Set Matrix',
            });

            setMatrix(formData.matrix);
            setInitialVector(HashVector.ones(formData.height));
            setSteps([]);
            setEigenValue(undefined);
        } else {
            alert(formData.error);
        }
    };

    return (
        <div className="m-5 space-x-3 rounded-t-xl bg-secondary p-5">
            <Button
                onClick={() => {
                    toast({ description: 'Running power method...' });
                    try {
                        const steps = PowerMethod(matrix, initialVector);
                        const finalStep = steps[
                            steps.length - 1
                        ] as PowerEndResult;
                        console.log(finalStep);
                        setSteps(steps);
                        setEigenValue(finalStep.eigenValue);
                        toast({ description: 'Done!' });
                    } catch (e: any) {
                        console.log(e);
                        toast({
                            title: 'Error',
                            description:
                                'Ran into an error while running the power method: ' +
                                (e instanceof Error
                                    ? e.message
                                    : '[unknown error]'),
                        });
                    }

                    steps.length;
                }}>
                Run Power Method
            </Button>
            <Button
                onClick={() => {
                    setSteps([]);
                    setEigenValue(undefined);
                }}>
                Reset
            </Button>
            <EditableMatrix handleSubmit={handleMatrixSubmit} />
            <span className="flex items-center space-x-5">
                <p>Selected Matrix: </p>
                {showIfMounted(<ViewableMatrix matrix={matrix} />)}
            </span>
            Approximated EigenValue: {eigenValue ?? 'not computed\n'}
            <br />
            <IterationViewer iterations={steps} />
            <br />
            <embed
                src="https://www.sciencedirect.com/topics/mathematics/power-method"
                className=" h-96 w-full"
            />
        </div>
    );
}
