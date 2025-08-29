// Utility functions for handling Strapi rich text blocks

import { 
  StrapiRichTextBlocks, 
  StrapiRichTextNode, 
  isStrapiRichTextBlocks,
  isTextNode,
  hasChildren,
  getTextContent,
  getNodeChildren
} from '@/types/richText';

/**
 * Extract plain text from Strapi rich text blocks
 * This function recursively extracts text content from the complex block structure
 */
export function extractTextFromBlocks(blocks: StrapiRichTextBlocks | unknown): string {
  // Validate input using type guard
  if (!isStrapiRichTextBlocks(blocks)) {
    return '';
  }

  function extractFromNode(node: StrapiRichTextNode): string {
    // If it's a text node, return the text content
    if (isTextNode(node)) {
      return getTextContent(node);
    }

    // If it has children, recursively extract from them
    if (hasChildren(node)) {
      return getNodeChildren(node).map(extractFromNode).join('');
    }

    return '';
  }

  return blocks.map(extractFromNode).join(' ').trim();
}

/**
 * Extract a summary (first paragraph or limited text) from rich text blocks
 */
export function extractSummaryFromBlocks(blocks: StrapiRichTextBlocks | unknown, maxLength: number = 200): string {
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
export function hasRichTextContent(blocks: StrapiRichTextBlocks | unknown): boolean {
  const text = extractTextFromBlocks(blocks);
  return text.trim().length > 0;
}
