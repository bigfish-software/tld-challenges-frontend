import React from 'react';
import { 
  StrapiRichTextBlocks, 
  StrapiRichTextNode, 
  TextNode,
  isStrapiRichTextBlocks,
  isTextNode,
  isParagraphNode,
  isHeadingNode,
  isListNode,
  isListItemNode,
  isQuoteNode,
  isCodeNode,
  isLinkNode
} from '@/types/richText';
import { extractTextFromBlocks } from '@/utils/richText';

interface RichTextRendererProps {
  blocks: StrapiRichTextBlocks | unknown;
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
  // Validate input using type guard
  if (!isStrapiRichTextBlocks(blocks)) {
    return null;
  }

  // For summary variant, extract plain text with length limit
  if (variant === 'summary') {
    const plainText = extractTextFromBlocks(blocks);
    const truncatedText = plainText.length > maxLength 
      ? plainText.substring(0, maxLength).replace(/\s+\S*$/, '') + '...'
      : plainText;
    
    return (
      <div className={className}>
        {truncatedText}
      </div>
    );
  }

  const renderTextChild = (child: TextNode, index: number): React.ReactNode => {
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
          className="px-1 py-0.5 text-sm bg-surface rounded font-mono"
        >
          {element}
        </code>
      );
    }

    return element;
  };

  const renderBlock = (block: StrapiRichTextNode, index: number): React.ReactNode => {
    const key = `block-${index}`;

    switch (block.type) {
      case 'paragraph':
        if (isParagraphNode(block)) {
          return (
            <p key={key} className="mb-4 last:mb-0 text-secondary">
              {block.children.map((child, childIndex) => 
                renderInlineElement(child, childIndex)
              )}
            </p>
          );
        }
        break;

      case 'heading':
        if (isHeadingNode(block)) {
          const HeadingTag = `h${block.level}` as keyof JSX.IntrinsicElements;
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
              className={`${headingClasses[block.level] || headingClasses[1]} text-primary`}
            >
              {block.children.map((child, childIndex) => 
                renderInlineElement(child, childIndex)
              )}
            </HeadingTag>
          );
        }
        break;

      case 'list':
        if (isListNode(block)) {
          const ListTag = block.format === 'ordered' ? 'ol' : 'ul';
          const listClasses = block.format === 'ordered' 
            ? 'list-decimal list-inside mb-4 space-y-1'
            : 'list-disc list-inside mb-4 space-y-1';
          
          return (
            <ListTag key={key} className={listClasses}>
              {block.children.map((item, itemIndex) => {
                if (isListItemNode(item)) {
                  return (
                    <li key={`item-${itemIndex}`} className="text-secondary">
                      {item.children.map((child, childIndex) => 
                        renderInlineElement(child, childIndex)
                      )}
                    </li>
                  );
                }
                return null;
              })}
            </ListTag>
          );
        }
        break;

      case 'quote':
        if (isQuoteNode(block)) {
          return (
            <blockquote key={key} className="border-l-4 border-primary-color pl-4 py-2 mb-4 italic text-secondary">
              {block.children.map((child, childIndex) => 
                renderInlineElement(child, childIndex)
              )}
            </blockquote>
          );
        }
        break;

      case 'code':
        if (isCodeNode(block)) {
          return (
            <pre key={key} className="bg-surface border-default rounded-lg p-4 mb-4 overflow-x-auto">
              <code className="text-sm font-mono text-secondary">
                {block.children.map((child, childIndex) => 
                  renderInlineElement(child, childIndex)
                )}
              </code>
            </pre>
          );
        }
        break;

      default:
        return null;
    }
    
    return null;
  };

  // Helper function to render inline elements (text nodes and links)
  const renderInlineElement = (element: StrapiRichTextNode, index: number): React.ReactNode => {
    if (isTextNode(element)) {
      return renderTextChild(element, index);
    }
    
    if (isLinkNode(element)) {
      return (
        <a
          key={index}
          href={element.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-color hover:text-primary-dark underline"
        >
          {element.children.map((child: StrapiRichTextNode, childIndex: number) => 
            renderInlineElement(child, childIndex)
          )}
        </a>
      );
    }
    
    // For any other node type that might appear inline, render as block
    return renderBlock(element, index);
  };

  // Render blocks based on type
  return (
    <div className={className}>
      {blocks.map((block, index) => renderBlock(block, index))}
    </div>
  );
};

export default RichTextRenderer;
