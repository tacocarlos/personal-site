import { DifferentibleFunction, IntegralFunction } from "./mathfunction";

export class Polynomial implements DifferentibleFunction, IntegralFunction {
    // Stores coefficients in decreasing exponent so as to easily use Horner's method
    // coeffs = [a,     b,         ... c,   d]
    // =>        ax^n + bx^{n-1} + ... cx + d
    coeffs: number[];

    // ascending dictates if coeffs = [a+bx+cx^2+...] or coeffs = [ax^n + bx^{n-1} + ... cx + d]
    // defaults to second, provide false if second
    constructor(coeffs: number[], ascending : boolean = false) {
        if(!ascending)
            this.coeffs = coeffs;
        else
            this.coeffs = coeffs.reverse();
    }

    
    // grammer => [sng] coeff "x" ["^"pow] + term
    static fromString(polyStr: string) : Polynomial {
        // parse polyStr and map to coeffs array
        // for now, create 3x^2 + x - 5

        return new Polynomial([3, 1, -5]);
    }

    integrate(): IntegralFunction;
    integrate(a: number, b: number): number;
    integrate(a?: unknown, b?: unknown): number | IntegralFunction {
        throw new Error("Method not implemented.");
    }

    diff(): DifferentibleFunction;
    diff(x: number): number;

    diff(x?: unknown): number | DifferentibleFunction {
        throw new Error("Method not implemented.");
    }

    eval(x: number): number {
        let res: number = this.coeffs[0];
        for(let i = 1; i < this.coeffs.length; i++) {
            res = res * x + this.coeffs[i];
        }
        return res;
    }    

    toString() {
        let res = "";
        let power = 0;
        this.coeffs.reverse().forEach( coeff => {
            if(power == 0) {
                res = coeff.toString();
            } else {
                let sgn = coeff > 0 ? "+" : "-";
                if(sgn === "+" && power == this.coeffs.length - 1) sgn = "";
                const value = Math.abs(coeff);
                
                const exp = power > 1 ? `x^${power}` : `x`;
                res = value != 1 ? sgn + value + exp + res : sgn + exp + res;
            }

            power++;
        });        

        return res;
    }
}