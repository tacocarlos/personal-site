import { Vector } from '@vector/vector';
import { Matrix } from '@matrix/matrix';

export function approximateEigenvalue(matrix: Matrix, vector: Vector) {
    return matrix.prodVect(vector).magnitude('euclidean');
}

function computeError(matrix: Matrix, vector: Vector) {
    const eigenVector = matrix.prodVect(vector);
    const eigenValueEstimate = eigenVector.magnitude('euclidean');

    const errVector = eigenVector.sub(eigenVector.scale(eigenValueEstimate));
    return errVector.magnitude('euclidean');
}

export type PowerMethodStepResult = PowerMainResult | PowerEndResult;

export type PowerMainResult = {
    kind: 'main-step';
    iteration: number;
    original: Vector;
    next: Vector;
    matrix: Matrix;
    error: number;
};

export type PowerEndResult = {
    kind: 'end-step';
    iteration: number;
    eigenVector: Vector;
    eigenValue: number;
    epsilon: number;
};

export function PowerMain(
    m: Matrix,
    vector: Vector,
    iteration: number
): PowerMainResult {
    const nextVector = m.prodVect(vector).normalize('euclidean');
    return {
        kind: 'main-step',
        iteration: iteration,
        matrix: m,
        original: vector,
        next: nextVector,
        error: computeError(m, nextVector),
    };
}

export function PowerEnd(
    m: Matrix,
    v: Vector,
    iteration: number
): PowerEndResult {
    const { next: eigenVector, error: error } = PowerMain(m, v, iteration);
    return {
        kind: 'end-step',
        iteration: iteration,
        epsilon: error,
        eigenVector: eigenVector,
        eigenValue: approximateEigenvalue(m, eigenVector),
    };
}

const DEFAULT_MAX_STEPS = 20;
const DEFAULT_THRESHOLD = 0.005;
const DEFAULT_STEP_CHOICE = true;

type OptionsType = {
    maxSteps?: number;
    threshold?: number;
    includeAllSteps?: boolean;
};

export function PowerMethod(
    m: Matrix,
    initialVector: Vector,
    options?: OptionsType
): PowerMethodStepResult[] {
    if (options === undefined) {
        options = {};
    }
    options.includeAllSteps = options.includeAllSteps ?? DEFAULT_STEP_CHOICE;
    options.threshold = options.threshold ?? DEFAULT_THRESHOLD;
    options.maxSteps = options.maxSteps ?? DEFAULT_MAX_STEPS;

    let steps: PowerMethodStepResult[] = [];
    let error = options.threshold + 1;
    let iter = 1;
    let vector = initialVector;

    while (iter < options.maxSteps && error >= options.threshold) {
        const step = PowerMain(m, vector, iter);
        if (options.includeAllSteps === true) {
            steps.push(step);
        }

        vector = step.next;
        error = step.error;
        iter++;
    }

    steps.push(PowerEnd(m, vector, iter));
    console.log(steps[steps.length - 1]);
    return steps;
}
