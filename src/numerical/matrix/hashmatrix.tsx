import { Vector } from '@/numerical/vector/vector';
import { MathFunction } from '../polynomial/mathfunction';
import { BaseMatrix, Matrix, MatrixIteratorValueType } from './matrix';
import MarkdownRenderer from '@/components/MarkdownRenderer';
// export class HashMatrix implements Matrix {
export class HashMatrix extends BaseMatrix {
    static randVect(): import('@/numerical/vector/vector').Vector | undefined {
        throw new Error('Method not implemented.');
    }
    entries: Map<number, Map<number, number>>;
    width: number;
    height: number;

    constructor(width: number, height: number) {
        super();
        this.entries = new Map();
        this.width = width;
        this.height = height;
    }

    sizeClone(this: HashMatrix) {
        return new HashMatrix(this.width, this.height);
    }

    clone(this: HashMatrix) {
        const copy = this.sizeClone();
        this.entries.forEach((row, i) => {
            row.forEach((x, j) => {
                copy.set(i, j, x);
            });
        });
        return copy;
    }

    get(i: number, j: number): number {
        this.checkValid(i, j);
        return this.entries.get(i)?.get(j) ?? 0;
    }

    set(i: number, j: number, x: number): void {
        this.checkValid(i, j);

        //! If value is default, don't need to insert
        if (x === 0) {
            return;
        }

        let row = this.entries.get(i);
        if (row === undefined) {
            row = new Map();
            this.entries.set(i, row);
        }

        row.set(j, x);
    }

    size(): [number, number] {
        return [this.width, this.height];
    }

    getWidth(): number {
        return this.width;
    }

    apply(f: MathFunction): Matrix {
        const mat = new HashMatrix(this.width, this.height);
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                const value = f.eval(this.get(i, j));
                mat.set(i, j, value);
            }
        }
        return mat;
    }

    // resizes the current matrix (direcly modifies `this`)
    resize(this: HashMatrix, n: number, m: number): HashMatrix {
        const migrateMatrix = (mat: HashMatrix) => {
            this.width = mat.width;
            this.height = mat.height;
            this.entries = mat.entries;
        };

        const newMatrix = new HashMatrix(n, m);
        const generator = this.values();
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < m; j++) {
                const x = generator.next();
                if (x.done === true) {
                    migrateMatrix(newMatrix);
                    return this;
                }

                //! If value is zero, then don't need to store it; when attempted to be read,
                //! it get(i, j) will return zero anyway
                if (x.value.value !== 0) {
                    newMatrix.set(i, j, x.value.value);
                }
            }
        }

        migrateMatrix(newMatrix);
        return this;
    }

    static randMatrix(): HashMatrix {
        const randInt = (lower = 2, upper = 10) => {
            return Math.random() * (upper - lower) + lower;
        };

        const width = randInt();
        const height = randInt();

        const mat = new HashMatrix(width, height);

        const numNonZero = randInt(0, width * height);
        for (let i = 0; i < numNonZero; i++) {
            const value = Math.random() * 100;

            const i = randInt(0, width);
            const j = randInt(0, height);

            mat.set(i, j, value);
        }

        return mat;
    }
}
