import { 
  StrapiRichTextBlocks, 
  StrapiRichTextNode, 
  isStrapiRichTextBlocks,
  isTextNode,
  hasChildren,
  getTextContent,
  getNodeChildren
} from '@/types/richText';

export function extractTextFromBlocks(blocks: StrapiRichTextBlocks | unknown): string {
  if (!isStrapiRichTextBlocks(blocks)) {
    return '';
  }

  function extractFromNode(node: StrapiRichTextNode): string {
    if (isTextNode(node)) {
      return getTextContent(node);
    }

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

  const truncated = fullText.substring(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(' ');
  
  if (lastSpaceIndex > maxLength * 0.8) {
    return truncated.substring(0, lastSpaceIndex) + '...';
  }
  
  return truncated + '...';
}

export function hasRichTextContent(blocks: StrapiRichTextBlocks | unknown): boolean {
  const text = extractTextFromBlocks(blocks);
  return text.trim().length > 0;
}

/**
 * Check if rich text blocks contain meaningful content (excluding empty paragraphs)
 * This function considers empty paragraphs as not having content for layout purposes
 */
export function hasMeaningfulRichTextContent(blocks: StrapiRichTextBlocks | unknown): boolean {
  if (!isStrapiRichTextBlocks(blocks)) {
    return false;
  }

  function hasNodeContent(node: StrapiRichTextNode): boolean {
    if (isTextNode(node)) {
      return node.text.trim().length > 0;
    }

    // For paragraphs, check if any children have content
    if (node.type === 'paragraph' && hasChildren(node)) {
      return getNodeChildren(node).some(hasNodeContent);
    }

    // For other block types with children, check if they have content
    if (hasChildren(node)) {
      return getNodeChildren(node).some(hasNodeContent);
    }

    // For non-text, non-paragraph types, consider them as having content
    return true;
  }

  return blocks.some(hasNodeContent);
}
