import { HashMatrix } from '@/numerical/matrix/hashmatrix';
import { Matrix } from '@/numerical/matrix/matrix';
import { FormEvent } from 'react';

export type MatrixFormResultType = {
    success: boolean;
    width: number;
    height: number;
    matrix: Matrix;
    error?: string;
};

export default function parseMatrixSubmit(
    e: FormEvent<HTMLFormElement>
): MatrixFormResultType {
    e.preventDefault();

    const result = {
        success: false,
        width: Number.NaN,
        height: Number.NaN,
        matrix: new HashMatrix(2, 2),
    };

    if (e.target === null) {
        return {
            ...result,
            error: 'Form submit lacks a target',
        };
    }

    const targets = e.target as any as any[];

    if (targets.length < 2) {
        return {
            ...result,
            error: 'Form submit lacks width and height',
        };
    }

    const heightSource = targets[0].value;
    const widthSource = targets[1].value;

    const width = Number.parseInt(widthSource);
    const height = Number.parseInt(heightSource);
    result.width = width;
    result.height = height;

    if (Number.isNaN(width) || Number.isNaN(height)) {
        return {
            ...result,
            error: 'Either width or height is invalid',
        };
    }

    const offset = 2;
    result.matrix.resize(width, height);
    let rowIdx = 0;
    let colIdx = 0;
    for (let i = offset; i < width * height + offset; i++) {
        const value = Number.parseFloat(targets[i].value);
        if (!Number.isNaN(value)) {
            result.matrix.set(rowIdx, colIdx, value);
        }

        const nextCol = colIdx + 1;
        rowIdx = nextCol === width ? rowIdx + 1 : rowIdx;
        colIdx = nextCol % width;
    }

    result.success = true;

    return result;
}
