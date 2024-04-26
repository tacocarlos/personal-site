import { Vector } from '@/numerical/vector/vector';
import { MathFunction } from '../polynomial/mathfunction';
import { Matrix } from './matrix';
import MarkdownRenderer from '@/components/MarkdownRenderer';
export class HashMatrix implements Matrix {
    static randVect(): import('@/numerical/vector/vector').Vector | undefined {
        throw new Error('Method not implemented.');
    }
    entries: Map<number, Map<number, number>>;
    width: number;
    height: number;

    constructor(width: number, height: number) {
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

    validIndex(i: number, j: number): Boolean {
        return i < this.width && j < this.height;
    }

    private checkValid(i: number, j: number) {
        if (!this.validIndex(i, j)) throw new Error('Invalid Index');
    }

    get(i: number, j: number): number {
        this.checkValid(i, j);
        return this.entries.get(i)?.get(j) ?? 0;
    }

    set(i: number, j: number, x: number): void {
        this.checkValid(i, j);

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

    prod(m: Matrix): Matrix {
        return this;
    }

    prodScalar(this: HashMatrix, x: number): Matrix {
        return this;
    }

    prodVect(this: HashMatrix, v: Vector): Vector {
        const result: Vector = v.sizeClone();
        for (let i = 0; i < this.height; i++) {
            let dot = 0;
            for (let j = 0; j < this.width; j++) {
                const a = this.get(i, j);
                const b = v.get(j);
                console.log(`matix value: ${a} | (i,j) = (${i}, ${j})`);
                console.log(`vector value: ${b} | (j) = ${j}`);
                dot += this.get(i, j) * v.get(j);
            }
            console.log(`dot for row ${i}: ${dot}`);
            console.log('==========================================');
            result.set(i, dot);
        }

        return result;
    }

    mult(m: Matrix): Matrix {
        throw new Error('Method not implemented.');
    }

    toArray(this: HashMatrix): number[][] {
        const matrixArray: number[][] = new Array(this.height) as number[][];
        for (let i = 0; i < this.height; i++) {
            matrixArray[i] = new Array(this.width) as number[];
            matrixArray[i] = matrixArray[i].fill(0, this.width);
        }

        this.entries.forEach((row, i) => {
            row.forEach((x, j) => {
                matrixArray[i][j] = x;
            });
        });

        return matrixArray;
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

    toComponent(this: HashMatrix): React.ReactNode {
        const asArray = this.toArray();
        return (
            // <table className="flex flex-col space-x-2 space-y-2 rounded-lg bg-muted p-2 ">
            //     <tbody>
            //         {asArray.map((row, rowIdx) => (
            //             <tr key={rowIdx} className="flex space-x-3">
            //                 {row.map((x, colIdx) => (
            //                     <td key={colIdx}>{x}</td>
            //                 ))}
            //             </tr>
            //         ))}
            //     </tbody>
            // </table>
            <MarkdownRenderer markdown={'$' + this.toLatex() + '$'} />
        );
    }

    toLatex(this: HashMatrix): string {
        return (
            '\\begin{pmatrix}' +
            this.toArray()
                .map((row, index) => {
                    if (this.height === index + 1) {
                        // alert(`Final row: ${index}`);
                        return row.join(' & ');
                    } else {
                        return row.join(' & ') + '\\\\ \n';
                    }
                })
                .join('') +
            '\\end{pmatrix}'
        );
    }
}
