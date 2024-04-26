import MarkdownRenderer from '@/components/MarkdownRenderer';
import { sigFig } from '@/lib/utils';
import {
    PNormValue,
    Vector,
    VectorDirectionType,
    VectorNorm,
    VectorNormType,
} from '@vector/vector';

import { InlineMath } from 'react-katex';

export class HashVector implements Vector {
    vectLen: number;
    vectDir: VectorDirectionType;
    defaultValue: number;

    data: Map<number, number>;
    constructor(
        vectLen: number,
        dir: VectorDirectionType,
        emptyEntryValue: number = 0
    ) {
        if (!Number.isInteger(vectLen)) {
            throw new Error('Vector Length is not an integer');
        }

        this.vectLen = vectLen;
        this.vectDir = dir;
        this.data = new Map();
        this.defaultValue = emptyEntryValue;
    }

    toArray(this: HashVector) {
        const values = new Array<number>(this.vectLen);
        for (let i = 0; i < this.vectLen; i++) {
            values[i] = this.get(i);
        }

        return values;
    }

    values(this: HashVector) {
        return this.data.values();
    }

    normalize(
        this: HashVector,
        normType: VectorNormType,
        pValue?: PNormValue
    ): HashVector {
        const normalized = this.divScalar(this.magnitude('euclidean'));
        console.log('Given vector: ');
        console.log(this);
        console.log('normalized: ');
        console.log(normalized);
        return normalized;
    }

    pMagnitude(this: HashVector, pValue?: PNormValue): number {
        if (pValue === 'maximum') {
            let max = 0;
            for (const x_i of this.values()) {
                const absX = Math.abs(x_i);
                max = absX > max ? absX : absX;
            }
            return max;
        }

        if (pValue === undefined || pValue < 1) {
            throw new Error(`Invalid p-value: ${pValue}`);
        }

        let sum = 0;
        for (const x_i of this.values()) {
            sum += Math.pow(Math.abs(x_i), pValue);
        }
        return Math.pow(sum, pValue);
    }

    magnitude(
        this: HashVector,
        normType: VectorNormType,
        pValue?: PNormValue
    ): number {
        let mag = 0;
        switch (normType) {
            case VectorNorm.ABSOLUTE:
                for (const value of this.values()) {
                    mag += Math.abs(value);
                }
                break;
            case VectorNorm.EUCLIDEAN:
                for (const value of this.values()) {
                    mag += value * value;
                }
                mag = Math.sqrt(mag);
                break;
            case VectorNorm.P:
                mag = this.pMagnitude(pValue);
        }

        // console.log(`Computed Magnitude: norm(${normType}) => ${mag}`);
        // console.log('Given vector: ');
        // console.log(this);
        return mag;
    }

    vectProd(v: Vector): Vector {
        const result = v.sizeClone();

        return result;
    }

    clone(this: HashVector): HashVector {
        const v = new HashVector(this.vectLen, this.vectDir, this.defaultValue);
        this.data.forEach((x, i) => {
            v.data.set(i, x);
        });

        return v;
    }

    divScalar(this: HashVector, x: number): HashVector {
        if (x === 0) {
            throw new Error('[divScalar] Attempted to divide vector by zero.');
        }

        const v = this.clone();
        v.data.forEach((value, index) => {
            v.data.set(index, value / x);
        });

        return v;
    }

    checkBounds(this: HashVector, i: number) {
        return i < this.vectLen;
    }

    orientation(this: HashVector) {
        return this.vectDir;
    }

    length(this: HashVector) {
        return this.vectLen;
    }

    get(this: HashVector, index: number) {
        if (this.checkBounds(index) === false) {
            throw new Error(
                `[get] Vector index is out of bounds. Size: ${this.vectLen} | Got: ${index}`
            );
        }

        return this.data.get(index) ?? this.defaultValue;
    }

    set(this: HashVector, index: number, value: number) {
        if (this.checkBounds(index) === false) {
            throw new Error(
                `[set] Vector index out of bounds. Size: ${this.vectLen} | Got: ${index}`
            );
        }

        this.data.set(index, value);
        return value;
    }

    static randVect(
        length: number,
        orientation: VectorDirectionType,
        lowerBound = -100,
        upperBound = 100
    ): HashVector {
        const v = new HashVector(length, orientation);

        const getRandomNumber = (min: number, max: number) => {
            return Math.random() * (max - min) + min;
        };

        for (let i = 0; i < length; i++) {
            v.set(i, getRandomNumber(lowerBound, upperBound));
        }

        return v;
    }

    sizeClone(this: HashVector): Vector {
        return new HashVector(this.vectLen, this.vectDir, this.defaultValue);
    }

    T(this: HashVector): Vector {
        return this;
    }

    scale(value: number): Vector {
        const result = this.sizeClone();
        for (let i = 0; i < result.length(); i++) {
            result.set(i, this.get(i) * value);
        }
        return result;
    }

    // Computes [this] - [other]
    sub(this: HashVector, other: Vector): Vector {
        if (
            this.length() !== other.length() &&
            this.orientation() !== other.orientation()
        ) {
            throw new Error('Vector size or orientation mismatch');
        }

        const result = this.sizeClone();
        for (let i = 0; i < this.vectLen; i++) {
            result.set(i, this.get(i) - other.get(i));
        }

        return result;
    }

    toComponent(this: HashVector) {
        return <MarkdownRenderer markdown={'$' + this.toLatex() + '$'} />;
        // const fromArray = this.toArray();
        // return (
        //     <div className="w-4 rounded bg-red-500 p-1">
        //         {fromArray.map((value, index) => {
        //             return (
        //                 <>
        //                     <div key={index}>{value}</div>
        //                     <br />
        //                 </>
        //             );
        //         })}
        //     </div>
        // );
    }

    toLatex(this: HashVector) {
        const fromArray = this.toArray();
        return (
            '\\begin{pmatrix}\n' +
            fromArray
                .map((value, index) => {
                    return `${sigFig(value)}\\\\`;
                })
                .join('') +
            '\\end{pmatrix}'
        );
    }
}
