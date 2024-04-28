import { Matrix } from '@/numerical/matrix/matrix';
import { matrixToLatex } from './matrixUtil';
import MarkdownRenderer from '@/components/MarkdownRenderer';

// TODO: decide whether to render it as markdown or as latex; was having some issues with react-katex but forgot what they were

export default function ViewableMatrix({ matrix }: { matrix?: Matrix }) {
    if (matrix === undefined) return null;
    const latex = matrixToLatex(matrix);
    return <MarkdownRenderer markdown={`$${latex}$`} />;
}
