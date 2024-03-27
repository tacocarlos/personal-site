// import { MathFunction } from "../polynomial/mathfunction";

import { MathFunction } from "@/app/numerical/polynomial/mathfunction";

export interface Matrix {         
    validIndex(i :number, j: number) : Boolean;
    get(i : number, j: number) : number;
    set(i : number, j: number, x: number) : void;
    size() : [number, number];
    apply(f: MathFunction) : Matrix; // applies function to each element
    prod(m: Matrix) : Matrix;
    prod(x : number) : Matrix;

    mult(m: Matrix) : Matrix;
}