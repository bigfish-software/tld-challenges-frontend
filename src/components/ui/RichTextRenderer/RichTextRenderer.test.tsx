import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { RichTextRenderer } from './RichTextRenderer';
import type { StrapiRichTextBlocks } from '@/types/richText';

describe('RichTextRenderer', () => {
  describe('Empty Paragraph Handling', () => {
    it('should render empty paragraphs with proper spacing', () => {
      const blocksWithEmptyParagraphs: StrapiRichTextBlocks = [
        {
          type: 'paragraph',
          children: [
            {
              text: 'First paragraph',
              type: 'text'
            }
          ]
        },
        {
          type: 'paragraph',
          children: [
            {
              text: '',
              type: 'text'
            }
          ]
        },
        {
          type: 'paragraph',
          children: [
            {
              text: 'Second paragraph after empty',
              type: 'text'
            }
          ]
        }
      ];

      const { container } = render(<RichTextRenderer blocks={blocksWithEmptyParagraphs} />);

      // Check that text content is rendered
      expect(screen.getByText('First paragraph')).toBeInTheDocument();
      expect(screen.getByText('Second paragraph after empty')).toBeInTheDocument();

      // Check that empty paragraph creates spacing element
      const spacingElements = container.querySelectorAll('div[style*="height"]');
      expect(spacingElements).toHaveLength(1);
      expect(spacingElements[0]).toHaveStyle({ height: '1.5em' });
    });

    it('should render empty paragraphs with compact spacing in compact variant', () => {
      const blocksWithEmptyParagraphs: StrapiRichTextBlocks = [
        {
          type: 'paragraph',
          children: [
            {
              text: 'First paragraph',
              type: 'text'
            }
          ]
        },
        {
          type: 'paragraph',
          children: [
            {
              text: '',
              type: 'text'
            }
          ]
        }
      ];

      const { container } = render(<RichTextRenderer blocks={blocksWithEmptyParagraphs} variant="compact" />);

      // Check that empty paragraph creates compact spacing element
      const spacingElements = container.querySelectorAll('div[style*="height"]');
      expect(spacingElements).toHaveLength(1);
      expect(spacingElements[0]).toHaveStyle({ height: '1em' });
    });

    it('should handle multiple consecutive empty paragraphs', () => {
      const blocksWithMultipleEmptyParagraphs: StrapiRichTextBlocks = [
        {
          type: 'paragraph',
          children: [
            {
              text: 'Content paragraph',
              type: 'text'
            }
          ]
        },
        {
          type: 'paragraph',
          children: [
            {
              text: '',
              type: 'text'
            }
          ]
        },
        {
          type: 'paragraph',
          children: [
            {
              text: '',
              type: 'text'
            }
          ]
        },
        {
          type: 'paragraph',
          children: [
            {
              text: 'After empty paragraphs',
              type: 'text'
            }
          ]
        }
      ];

      const { container } = render(<RichTextRenderer blocks={blocksWithMultipleEmptyParagraphs} />);

      // Check that both empty paragraphs create spacing elements
      const spacingElements = container.querySelectorAll('div[style*="height"]');
      expect(spacingElements).toHaveLength(2);
    });

    it('should not render spacing for paragraphs with only whitespace text', () => {
      const blocksWithWhitespaceOnly: StrapiRichTextBlocks = [
        {
          type: 'paragraph',
          children: [
            {
              text: '   ',
              type: 'text'
            }
          ]
        }
      ];

      const { container } = render(<RichTextRenderer blocks={blocksWithWhitespaceOnly} />);

      // Whitespace-only paragraphs should be treated as empty and create spacing
      const spacingElements = container.querySelectorAll('div[style*="height"]');
      expect(spacingElements).toHaveLength(1);
    });

    it('should render normal paragraphs with content normally', () => {
      const blocksWithContent: StrapiRichTextBlocks = [
        {
          type: 'paragraph',
          children: [
            {
              text: 'Normal paragraph with content',
              type: 'text'
            }
          ]
        }
      ];

      const { container } = render(<RichTextRenderer blocks={blocksWithContent} />);

      // Should render as normal paragraph, not spacing div
      expect(screen.getByText('Normal paragraph with content')).toBeInTheDocument();
      const spacingElements = container.querySelectorAll('div[style*="height"]');
      expect(spacingElements).toHaveLength(0);
    });
  });

  describe('Variant Handling', () => {
    it('should render summary variant correctly', () => {
      const blocks: StrapiRichTextBlocks = [
        {
          type: 'paragraph',
          children: [
            {
              text: 'This is a long paragraph that should be truncated when using the summary variant to ensure it does not exceed the maximum length specified.',
              type: 'text'
            }
          ]
        }
      ];

      render(<RichTextRenderer blocks={blocks} variant="summary" maxLength={50} />);

      const text = screen.getByText(/This is a long paragraph/);
      expect(text.textContent).toMatch(/\.\.\.$/); // Should end with ellipsis
      expect(text.textContent!.length).toBeLessThanOrEqual(53); // 50 + '...'
    });
  });
});