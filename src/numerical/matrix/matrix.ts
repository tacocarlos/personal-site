// import { MathFunction } from "../polynomial/mathfunction";
import { MathFunction } from '@polynomial/mathfunction';
import { Vector } from '@vector/vector';
import { ReactNode } from 'react';

export type MatrixIteratorValueType = {
    index: [number, number];
    value: number;
};

export interface Matrix {
    validIndex(i: number, j: number): Boolean;
    get(i: number, j: number): number;
    set(i: number, j: number, x: number): void;
    size(): [number, number];
    apply(f: MathFunction): Matrix; // applies function to each element
    prod(m: Matrix): Matrix;
    prodVect(v: Vector): Vector;
    prodScalar(x: number): Matrix;

    clone(): Matrix;
    sizeClone(): Matrix;

    values(): Iterable<MatrixIteratorValueType>;
    getRow(rowIdx: number): Iterable<MatrixIteratorValueType>;

    resize(n: number, m: number): Matrix;
}

export abstract class BaseMatrix implements Matrix {
    abstract get(i: number, j: number): number;
    abstract set(i: number, j: number, x: number): void;
    abstract size(): [number, number];
    abstract clone(): Matrix;
    abstract sizeClone(): Matrix;
    abstract resize(n: number, m: number): BaseMatrix;

    validIndex(i: number, j: number): Boolean {
        const [width, height] = this.size();
        return i < width && j < height;
    }

    checkValid(i: number, j: number) {
        if (!this.validIndex(i, j)) throw new Error('Invalid Index');
    }

    apply(f: MathFunction): Matrix {
        const result = this.clone();
        return result;
    }

    prod(mat: Matrix): Matrix {
        const [n, m] = this.size();
        const [mOther, p] = mat.size();
        if (m !== mOther) {
            throw new Error('Matrix multiplication: size mismatch');
        }

        const C = this.sizeClone().resize(n, p);

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < m; j++) {
                let sum = 0;
                for (let k = 0; k < p; k++) {
                    sum += this.get(i, k) * mat.get(k, j);
                }
                C.set(i, j, sum);
            }
        }

        return C;
    }

    prodVect(v: Vector): Vector {
        const [width, height] = this.size();
        const result: Vector = v.sizeClone();

        for (let i = 0; i < height; i++) {
            let dot = 0;
            for (const entry of this.getRow(i)) {
                dot += v.get(entry.index[1]) * entry.value;
            }
            result.set(i, dot);
        }
        return result;
    }

    prodScalar(x: number): Matrix {
        const result = this.sizeClone();
        for (const {
            index: [i, j],
            value: value,
        } of this.values()) {
            result.set(i, j, value * x);
        }
        return result;
    }

    *values() {
        const [width, height] = this.size();
        for (let i: number = 0; i < height; i++) {
            for (let j: number = 0; j < width; j++) {
                yield {
                    index: [i, j] as [number, number],
                    value: this.get(i, j),
                };
            }
        }

        return;
    }

    *getRow(rowIdx: number) {
        const [width, height] = this.size();
        for (let j = 0; j < width; j++) {
            yield {
                index: [rowIdx, j] as [number, number],
                value: this.get(rowIdx, j),
            };
        }

        return;
    }

    fillRow(rowIdx: number, value: number) {
        for (const entry of this.getRow(rowIdx)) {
            const [i, j] = entry.index;
            this.set(i, j, value);
        }

        return this;
    }

    fill(value: number) {
        const [width, height] = this.size();
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                this.set(i, j, value);
            }
        }

        return this;
    }
}
