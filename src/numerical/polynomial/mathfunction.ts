export interface MathFunction {
    eval(x: number) : number;
}

export interface DifferentibleFunction extends MathFunction {
    diff() : DifferentibleFunction;
    diff(x : number) : number;
}

export interface IntegralFunction extends MathFunction{
    integrate() : IntegralFunction;
    integrate(a : number, b : number) : number;
}