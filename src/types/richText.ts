/**
 * Strapi Rich Text Block Type Definitions
 * 
 * These types define the structure of rich text content from Strapi CMS.
 * Strapi uses a block-based rich text editor that outputs structured JSON.
 */

/**
 * Base interface for all rich text nodes
 */
interface BaseRichTextNode {
  type: string;
  children?: StrapiRichTextNode[];
}

/**
 * Text node with formatting options
 */
export interface TextNode extends BaseRichTextNode {
  type: 'text';
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
}

/**
 * Paragraph node containing text and inline elements
 */
export interface ParagraphNode extends BaseRichTextNode {
  type: 'paragraph';
  children: StrapiRichTextNode[];
}

/**
 * Heading node with level (1-6)
 */
export interface HeadingNode extends BaseRichTextNode {
  type: 'heading';
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: StrapiRichTextNode[];
}

/**
 * List node (ordered or unordered)
 */
export interface ListNode extends BaseRichTextNode {
  type: 'list';
  format: 'ordered' | 'unordered';
  children: ListItemNode[];
}

/**
 * List item node
 */
export interface ListItemNode extends BaseRichTextNode {
  type: 'list-item';
  children: StrapiRichTextNode[];
}

/**
 * Quote/blockquote node
 */
export interface QuoteNode extends BaseRichTextNode {
  type: 'quote';
  children: StrapiRichTextNode[];
}

/**
 * Code block node
 */
export interface CodeNode extends BaseRichTextNode {
  type: 'code';
  children: TextNode[];
}

/**
 * Link node with URL
 */
export interface LinkNode extends BaseRichTextNode {
  type: 'link';
  url: string;
  children: StrapiRichTextNode[];
}

/**
 * Union type for all possible rich text nodes
 */
export type StrapiRichTextNode = 
  | TextNode
  | ParagraphNode
  | HeadingNode
  | ListNode
  | ListItemNode
  | QuoteNode
  | CodeNode
  | LinkNode;

/**
 * Array of rich text blocks (top-level structure from Strapi)
 */
export type StrapiRichTextBlocks = StrapiRichTextNode[];

/**
 * Type guard to check if data is valid Strapi rich text blocks
 */
export const isStrapiRichTextBlocks = (data: unknown): data is StrapiRichTextBlocks => {
  if (!Array.isArray(data)) {
    return false;
  }
  
  return data.every((item) => {
    return (
      typeof item === 'object' &&
      item !== null &&
      'type' in item &&
      typeof item.type === 'string'
    );
  });
};

/**
 * Type guard to check if a node is a text node
 */
export const isTextNode = (node: StrapiRichTextNode): node is TextNode => {
  return node.type === 'text';
};

/**
 * Type guard to check if a node is a paragraph node
 */
export const isParagraphNode = (node: StrapiRichTextNode): node is ParagraphNode => {
  return node.type === 'paragraph';
};

/**
 * Type guard to check if a node is a heading node
 */
export const isHeadingNode = (node: StrapiRichTextNode): node is HeadingNode => {
  return node.type === 'heading';
};

/**
 * Type guard to check if a node is a list node
 */
export const isListNode = (node: StrapiRichTextNode): node is ListNode => {
  return node.type === 'list';
};

/**
 * Type guard to check if a node is a list item node
 */
export const isListItemNode = (node: StrapiRichTextNode): node is ListItemNode => {
  return node.type === 'list-item';
};

/**
 * Type guard to check if a node is a quote node
 */
export const isQuoteNode = (node: StrapiRichTextNode): node is QuoteNode => {
  return node.type === 'quote';
};

/**
 * Type guard to check if a node is a code node
 */
export const isCodeNode = (node: StrapiRichTextNode): node is CodeNode => {
  return node.type === 'code';
};

/**
 * Type guard to check if a node is a link node
 */
export const isLinkNode = (node: StrapiRichTextNode): node is LinkNode => {
  return node.type === 'link';
};

/**
 * Type guard to check if a node has children
 */
export const hasChildren = (node: StrapiRichTextNode): node is StrapiRichTextNode & { children: StrapiRichTextNode[] } => {
  return 'children' in node && Array.isArray(node.children);
};

/**
 * Helper to safely get text content from a text node
 */
export const getTextContent = (node: StrapiRichTextNode): string => {
  if (isTextNode(node)) {
    return node.text;
  }
  return '';
};

/**
 * Helper to safely get children from a node
 */
export const getNodeChildren = (node: StrapiRichTextNode): StrapiRichTextNode[] => {
  if (hasChildren(node)) {
    return node.children;
  }
  return [];
};
