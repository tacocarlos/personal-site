import { Matrix } from '@matrix/matrix';

export function matrixToLatex(mat: Matrix) {
    let content = '\\begin{pmatrix}\n';
    const [width, height] = mat.size();
    for (let i = 0; i < height; i++) {
        const row = Array.from(mat.getRow(i)).map((entry) => entry.value);
        content += row.join(' & ') + '\\\\\n';
    }

    content += '\\end{pmatrix}';
    return content;
}
