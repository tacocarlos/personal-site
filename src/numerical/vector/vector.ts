// Effectively a 1D Matrix

export const VectorDirection = {
    VERTICAL: true,
    HORIZONTAL: false,
} as const;
export type VectorDirectionType =
    (typeof VectorDirection)[keyof typeof VectorDirection];

export const VectorNorm = {
    ABSOLUTE: 'absolute',
    EUCLIDEAN: 'euclidean',
    P: 'p-norm',
} as const;
export type VectorNormType = (typeof VectorNorm)[keyof typeof VectorNorm];
export type PNormValue = number | 'maximum';

export interface Vector {
    orientation(): VectorDirectionType;
    length(): number;
    get(i: number): number;
    set(index: number, value: number): number;

    normalize(normType: VectorNormType, pValue?: PNormValue): Vector;
    magnitude(normType: VectorNormType, pValue?: PNormValue): number;

    sizeClone(): Vector;
    clone(): Vector;

    T(): Vector;

    sub(other: Vector): Vector;
    scale(value: number): Vector;
    toComponent(): React.ReactNode;

    toLatex(): string;

    //! Every implementing class should also implement this but not enforced
    // randVec(
    //     length: number,
    //     orientation: VectorDirectionType,
    //     lowerBound: number,
    //     upperBound: number
    // ): Vector;
}

// abstract class BaseVector implements Vector {
//     abstract orientation(): VectorDirectionType;
//     abstract length(): number;
//     abstract get(i: number): number;
//     abstract set(index: number, value: number): number;
//     abstract normalize(
//         normType: VectorNormType,
//         pValue?: PNormValue | undefined
//     ): Vector;
//     abstract magnitude(
//         normType: VectorNormType,
//         pValue?: PNormValue | undefined
//     ): number;
//     abstract sizeClone(): Vector;
//     abstract clone(): Vector;
//     abstract T(): Vector;

//     abstract sub(othe: Vector): Vector;
//     abstract scale(value: number): Vector;
//     abstract toComponent(): React.ReactNode;
//     abstract toLatex(): string;
// }
