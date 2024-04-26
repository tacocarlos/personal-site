'use client';

import { Button } from '@/components/ui/button';
import { useIsMounted } from '@/lib/utils';
import {
    PowerEndResult,
    PowerMethod,
    PowerMethodStepResult,
} from '@/numerical/matrix/algorithms/eigenvalue-power/eigenApproxPower';
import { HashMatrix } from '@/numerical/matrix/hashmatrix';
import { HashVector } from '@/numerical/vector/hashvector';
import { Vector, VectorDirection } from '@/numerical/vector/vector';
import { useState, useEffect, ReactNode } from 'react';

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

const sigFig = (x: number, sigFigs?: number) => {
    return x.toPrecision(sigFigs ?? 5);
};

export default function EigenCalculator() {
    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);

    const [matrix, setMatrix] = useState(initMatrix());
    const [initialVector, setInitialVector] = useState(
        new HashVector(3, VectorDirection.VERTICAL)
    );

    initialVector.set(0, 1);
    initialVector.set(2, 2);

    const [eigenVector, setEigenVector] = useState<HashVector | undefined>();
    const [eigenValue, setEigenValue] = useState<number | undefined>();

    const [steps, setSteps] = useState<PowerMethodStepResult[]>([]);

    useEffect(() => {
        // setMatrix(initMatrix());
        // initialVector.set(0, 1);
        // initialVector.set(2, 2);
    }, [initialVector]);

    const isMounted = useIsMounted();

    const showIfMounted = (node: ReactNode, fallback?: ReactNode) => {
        return isMounted ? node : fallback ?? null;
    };

    return (
        <div className="m-5 space-x-3 rounded-t-xl bg-secondary p-5">
            <Button
                onClick={() => {
                    const steps = PowerMethod(matrix, initialVector);
                    const finalStep = steps.pop() as PowerEndResult;

                    setSteps(steps);
                    setEigenValue(finalStep.eigenValue);
                    setEigenVector(finalStep.eigenVector as HashVector);
                }}>
                Run Power Method
            </Button>
            <Button
                onClick={() => {
                    setSteps([]);
                    setEigenValue(undefined);
                    setEigenVector(undefined);
                }}>
                Reset
            </Button>
            <form
                onSubmit={() => {
                    console.log('Form submit');
                }}>
                <label>Matrix Height: </label>
                <input
                    className="rounded-xl bg-muted p-1"
                    type="number"
                    value={height}
                    onChange={(e) => {
                        setHeight(Number.parseInt(e.currentTarget.value));
                    }}
                />
            </form>
            {isMounted ? matrix.toComponent() : null}
            EigenValue: {eigenValue ?? 'not computed\n'}
            <br />
            Initial Vector:
            {showIfMounted(
                initialVector?.toComponent(),
                ' component not mounted'
            )}
            <br />
            EigenVector:
            {showIfMounted(eigenVector?.toComponent(), ' not computed')}
            <br />
            <div className="h-auto flex-col space-y-5 rounded-xl bg-blue-500 p-5">
                {steps.map((step) => {
                    let component = null;

                    if (step.kind === 'main-step') {
                        component = (
                            <>
                                <div
                                    className="flex space-x-3 rounded bg-muted p-6"
                                    key={step.iteration}>
                                    <div>
                                        <p className="text-xl">
                                            Iteration {step.iteration}
                                        </p>
                                    </div>
                                    <br />
                                    <div>
                                        <p>Matrix: </p>
                                        {step.matrix.toComponent()}
                                    </div>
                                    <div>
                                        <p>Original Vector: </p>
                                        {step.original.toComponent()}
                                    </div>
                                    <div>
                                        <p>Next Vector: </p>
                                        {step.next.toComponent()}
                                    </div>
                                    <div>
                                        <p>Error: {sigFig(step.error)}</p>
                                    </div>
                                </div>
                            </>
                        );
                    } else if (step.kind === 'end-step') {
                        component = (
                            <div
                                className="flex space-x-3 rounded bg-red-600 p-6"
                                key={step.iteration}>
                                <div>
                                    <p className="text-xl">
                                        Final Iteration: {step.iteration}
                                    </p>
                                </div>
                            </div>
                        );
                    }

                    return component;
                })}
            </div>
        </div>
    );
}
