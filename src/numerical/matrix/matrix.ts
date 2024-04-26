// import { MathFunction } from "../polynomial/mathfunction";
import { MathFunction } from '@polynomial/mathfunction';
import { Vector } from '@vector/vector';
import { ReactNode } from 'react';

export interface Matrix {
    validIndex(i: number, j: number): Boolean;
    get(i: number, j: number): number;
    set(i: number, j: number, x: number): void;
    size(): [number, number];
    apply(f: MathFunction): Matrix; // applies function to each element
    prod(m: Matrix): Matrix;
    prodVect(v: Vector): Vector;
    prodScalar(x: number): Matrix;
    mult(m: Matrix): Matrix;

    clone(): Matrix;
    sizeClone(): Matrix;

    toComponent(): ReactNode;
}
