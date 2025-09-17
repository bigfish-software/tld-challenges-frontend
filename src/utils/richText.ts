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
