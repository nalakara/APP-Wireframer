import React, { useMemo } from 'react';
import { marked } from 'marked';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className }) => {
  const htmlContent = useMemo(() => {
    if (!content) return '';
    return marked.parse(content, { gfm: true, breaks: true }) as string;
  }, [content]);

  return (
    <div
      className={`markdown-content ${className || ''}`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

export default MarkdownRenderer;
