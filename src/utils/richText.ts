// Utility functions for handling Strapi rich text blocks

interface RichTextChild {
  text: string;
  type: string;
  bold?: boolean;
  italic?: boolean;
}

interface RichTextBlock {
  type: string;
  level?: number;
  format?: string;
  children: (RichTextChild | RichTextBlock)[];
}

/**
 * Extract plain text from Strapi rich text blocks
 * This function recursively extracts text content from the complex block structure
 */
export function extractTextFromBlocks(blocks: RichTextBlock[] | any): string {
  if (!blocks || !Array.isArray(blocks)) {
    return '';
  }

  function extractFromBlock(block: RichTextBlock | RichTextChild): string {
    // If it's a text node
    if ('text' in block) {
      return block.text || '';
    }

    // If it has children, recursively extract from them
    if ('children' in block && Array.isArray(block.children)) {
      return block.children.map(extractFromBlock).join('');
    }

    return '';
  }

  return blocks.map(extractFromBlock).join(' ').trim();
}

/**
 * Extract a summary (first paragraph or limited text) from rich text blocks
 */
export function extractSummaryFromBlocks(blocks: RichTextBlock[] | any, maxLength: number = 200): string {
  const fullText = extractTextFromBlocks(blocks);
  
  if (fullText.length <= maxLength) {
    return fullText;
  }

  // Find the last complete word before maxLength
  const truncated = fullText.substring(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(' ');
  
  if (lastSpaceIndex > maxLength * 0.8) { // Only truncate at word boundary if it's reasonably close
    return truncated.substring(0, lastSpaceIndex) + '...';
  }
  
  return truncated + '...';
}

/**
 * Check if rich text blocks contain any content
 */
export function hasRichTextContent(blocks: RichTextBlock[] | any): boolean {
  const text = extractTextFromBlocks(blocks);
  return text.trim().length > 0;
}
