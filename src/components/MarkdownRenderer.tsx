'use client';
import Markdown from 'react-markdown';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeMathjax from 'rehype-mathjax';
import { cn } from '@/lib/ssrUtils';

export default function MarkdownRenderer({
    markdown,
    className,
}: {
    markdown: string;
    className?: string;
}) {
    return (
        <Markdown
            className={cn('prose text-black', className ?? '')}
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeRaw, rehypeMathjax]}
            components={{
                code(props) {
                    const { children, className, node, ...rest } = props;
                    const match = /language-(\w+)/.exec(className || '');
                    return match ? (
                        <SyntaxHighlighter
                            PreTag="div"
                            language={match[1]}
                            style={vscDarkPlus}>
                            {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                    ) : (
                        <code {...rest} className={className}>
                            {children}
                        </code>
                    );
                },
            }}>
            {markdown}
        </Markdown>
    );
}
