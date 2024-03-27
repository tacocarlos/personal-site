import { MathFunction } from "../polynomial/mathfunction";
import { Matrix } from "./matrix";

// export class HashMatrix implements Matrix {
//     entries : Map<[number, number], number>;
//     width : number;
//     height : number;

//     constructor(width : number, height : number) {
//         this.entries = new Map();
//         this.width = width;
//         this.height = height;
//     }

//     validIndex(i: number, j: number): Boolean {
//         return (i < this.width && j < this.height);
//     }

//     private checkValid(i : number, j : number) {
//         if(!this.validIndex(i, j)) throw new Error("Invalid Index");
//     }

//     get(i: number, j: number): number {
//         this.checkValid(i, j);
//         return this.entries.get([i, j]) ?? 0;
//     }

//     set(i: number, j: number, x: number): void {
//         this.checkValid(i, j);
//         this.entries.set([i, j], x);
//     }

//     size(): [number, number] {
//         return [this.width, this.height];
//     }
//     apply(f: MathFunction): Matrix {
//         const mat = new HashMatrix(this.width, this.height);
//         for(let i = 0; i < this.width; i++) {
//             for(let j = 0; j < this.height; j++) {
//                 const value = f.eval(this.get(i, j));
//                 mat.set(i, j, value );
//             }
//         }

//         return mat;
//     }
//     prod(m: Matrix): Matrix {

//     }

//     prod(x: number): Matrix {

//     }

//     mult(m: Matrix): Matrix {
//         throw new Error("Method not implemented.");
//     }

//     toComponent() {
//         return (
//           <div>
//             <p>1, 0, 0</p>
//             <p>0, 1, 0</p>
//             <p>0, 0, 1</p>
//           </div>
//         );
//     }
// }