import React from 'react';

// Strapi Rich Text Block Types
interface RichTextChild {
  text: string;
  type: 'text';
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
}

interface RichTextBlock {
  type: string;
  level?: number;
  format?: 'ordered' | 'unordered';
  children: (RichTextChild | RichTextBlock)[];
}

// Type guard functions
const isTextChild = (node: RichTextChild | RichTextBlock): node is RichTextChild => {
  return node.type === 'text' && 'text' in node;
};

const isBlock = (node: RichTextChild | RichTextBlock): node is RichTextBlock => {
  return node.type !== 'text' && 'children' in node;
};

interface RichTextRendererProps {
  blocks: RichTextBlock[] | any;
  className?: string;
  variant?: 'default' | 'compact' | 'summary';
  maxLength?: number;
}

export const RichTextRenderer: React.FC<RichTextRendererProps> = ({
  blocks,
  className = '',
  variant = 'default',
  maxLength = 200
}) => {
  console.log('RichTextRenderer - Input data:', {
    blocks,
    variant,
    isArray: Array.isArray(blocks),
    blocksLength: blocks?.length,
    firstBlock: blocks?.[0],
    firstBlockType: blocks?.[0]?.type,
    firstBlockChildren: blocks?.[0]?.children
  });

  if (!blocks || !Array.isArray(blocks)) {
    console.log('RichTextRenderer - No valid blocks, returning null');
    return null;
  }

  // For summary variant, extract plain text with length limit
  if (variant === 'summary') {
    const plainText = extractPlainText(blocks);
    const truncatedText = plainText.length > maxLength 
      ? plainText.substring(0, maxLength).replace(/\s+\S*$/, '') + '...'
      : plainText;
    
    return (
      <div className={className}>
        {truncatedText}
      </div>
    );
  }

  const renderTextChild = (child: RichTextChild, index: number): React.ReactNode => {
    let element: React.ReactNode = child.text;

    if (child.bold) {
      element = <strong key={`bold-${index}`}>{element}</strong>;
    }
    if (child.italic) {
      element = <em key={`italic-${index}`}>{element}</em>;
    }
    if (child.underline) {
      element = <u key={`underline-${index}`}>{element}</u>;
    }
    if (child.strikethrough) {
      element = <del key={`strike-${index}`}>{element}</del>;
    }
    if (child.code) {
      element = (
        <code 
          key={`code-${index}`}
          className="px-1 py-0.5 text-sm bg-slate-100 dark:bg-slate-800 rounded font-mono"
        >
          {element}
        </code>
      );
    }

    return element;
  };

  const renderBlock = (block: RichTextBlock, index: number): React.ReactNode => {
    const key = `block-${index}`;

    switch (block.type) {
      case 'paragraph':
        return (
          <p key={key} className="mb-4 last:mb-0">
            {block.children.map((child, childIndex) => 
              isTextChild(child)
                ? renderTextChild(child, childIndex)
                : renderBlock(child, childIndex)
            )}
          </p>
        );

      case 'heading':
        const HeadingTag = `h${block.level || 1}` as keyof JSX.IntrinsicElements;
        const headingClasses = {
          1: 'text-3xl font-bold mb-6',
          2: 'text-2xl font-bold mb-5',
          3: 'text-xl font-bold mb-4',
          4: 'text-lg font-bold mb-3',
          5: 'text-base font-bold mb-2',
          6: 'text-sm font-bold mb-2'
        };
        
        return (
          <HeadingTag 
            key={key} 
            className={`${headingClasses[block.level as keyof typeof headingClasses] || headingClasses[1]} text-slate-900 dark:text-slate-100`}
          >
            {block.children.map((child, childIndex) => 
              isTextChild(child)
                ? renderTextChild(child, childIndex)
                : renderBlock(child, childIndex)
            )}
          </HeadingTag>
        );

      case 'list':
        const ListTag = block.format === 'ordered' ? 'ol' : 'ul';
        const listClasses = block.format === 'ordered' 
          ? 'list-decimal list-inside mb-4 space-y-1'
          : 'list-disc list-inside mb-4 space-y-1';
        
        return (
          <ListTag key={key} className={listClasses}>
            {block.children.map((child, childIndex) => 
              isTextChild(child)
                ? renderTextChild(child, childIndex)
                : renderBlock(child, childIndex)
            )}
          </ListTag>
        );

      case 'list-item':
        return (
          <li key={key} className="text-slate-700 dark:text-slate-300">
            {block.children.map((child, childIndex) => 
              isTextChild(child)
                ? renderTextChild(child, childIndex)
                : renderBlock(child, childIndex)
            )}
          </li>
        );

      case 'quote':
        return (
          <blockquote key={key} className="border-l-4 border-primary-400 pl-4 py-2 mb-4 italic text-slate-600 dark:text-slate-400">
            {block.children.map((child, childIndex) => 
              isTextChild(child)
                ? renderTextChild(child, childIndex)
                : renderBlock(child, childIndex)
            )}
          </blockquote>
        );

      case 'code':
        return (
          <pre key={key} className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg mb-4 overflow-x-auto">
            <code className="text-sm font-mono text-slate-800 dark:text-slate-200">
              {block.children.map((child) => 
                isTextChild(child) ? child.text : ''
              ).join('')}
            </code>
          </pre>
        );

      default:
        // Fallback for unknown block types
        return (
          <div key={key} className="mb-2">
            {block.children.map((child, childIndex) => 
              isTextChild(child)
                ? renderTextChild(child, childIndex)
                : renderBlock(child, childIndex)
            )}
          </div>
        );
    }
  };

  const baseClasses = variant === 'compact' 
    ? 'text-sm leading-relaxed'
    : 'leading-relaxed';

  return (
    <div className={`prose dark:prose-invert max-w-none ${baseClasses} ${className}`}>
      {blocks.map((block, index) => renderBlock(block, index))}
    </div>
  );
};

// Helper function to extract plain text for summary variant
function extractPlainText(blocks: RichTextBlock[] | any): string {
  if (!blocks || !Array.isArray(blocks)) {
    return '';
  }

  function extractFromBlock(block: RichTextBlock | RichTextChild): string {
    if (isTextChild(block)) {
      return block.text || '';
    }

    if (isBlock(block) && Array.isArray(block.children)) {
      return block.children.map(extractFromBlock).join('');
    }

    return '';
  }

  return blocks.map(extractFromBlock).join(' ').trim();
}

export default RichTextRenderer;
