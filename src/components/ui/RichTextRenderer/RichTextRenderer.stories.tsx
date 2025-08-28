import type { Meta, StoryObj } from '@storybook/react';
import { RichTextRenderer } from './RichTextRenderer';

const meta: Meta<typeof RichTextRenderer> = {
  title: 'UI/RichTextRenderer',
  component: RichTextRenderer,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A component for rendering Strapi rich text blocks with proper formatting support including headings, lists, bold, italic, and more.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'compact', 'summary'],
      description: 'Display variant of the rich text'
    },
    maxLength: {
      control: 'number',
      description: 'Maximum length for summary variant (characters)'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample rich text blocks representing the N.O.G.O.A custom code description
const sampleRichTextBlocks = [
  {
    type: "heading",
    level: 1,
    children: [
      {
        bold: true,
        text: "No one gets out alive",
        type: "text"
      }
    ]
  },
  {
    type: "heading",
    level: 3,
    children: [
      {
        text: "Everything wants to kill you!",
        type: "text"
      }
    ]
  },
  {
    type: "paragraph",
    children: [
      {
        text: "",
        type: "text"
      }
    ]
  },
  {
    type: "list",
    format: "unordered",
    children: [
      {
        type: "list-item",
        children: [
          {
            text: "spawn at night in a blizzard",
            type: "text"
          }
        ]
      },
      {
        type: "list-item",
        children: [
          {
            text: "interloper loot",
            type: "text"
          }
        ]
      },
      {
        type: "list-item",
        children: [
          {
            text: "no health regen",
            type: "text"
          }
        ]
      },
      {
        type: "list-item",
        children: [
          {
            text: "wind max",
            type: "text"
          }
        ]
      },
      {
        type: "list-item",
        children: [
          {
            text: "blizzards max",
            type: "text"
          }
        ]
      },
      {
        type: "list-item",
        children: [
          {
            text: "auroras max",
            type: "text"
          }
        ]
      },
      {
        type: "list-item",
        children: [
          {
            text: "weather changes max",
            type: "text"
          }
        ]
      },
      {
        type: "list-item",
        children: [
          {
            text: "wolves/bears/cougars max",
            type: "text"
          }
        ]
      },
      {
        type: "list-item",
        children: [
          {
            text: "hunger/thirst/fatigue max",
            type: "text"
          }
        ]
      },
      {
        type: "list-item",
        children: [
          {
            text: "deer/rabbit/moose low",
            type: "text"
          }
        ]
      },
      {
        type: "list-item",
        children: [
          {
            text: "saplings/teas/cattails low",
            type: "text"
          }
        ]
      },
      {
        type: "list-item",
        children: [
          {
            text: "no birch bark tea",
            type: "text"
          }
        ]
      }
    ]
  }
];

// Sample with various formatting options
const formattingExampleBlocks = [
  {
    type: "heading",
    level: 2,
    children: [
      {
        text: "Rich Text Formatting Examples",
        type: "text"
      }
    ]
  },
  {
    type: "paragraph",
    children: [
      {
        text: "This paragraph contains ",
        type: "text"
      },
      {
        text: "bold text",
        type: "text",
        bold: true
      },
      {
        text: ", ",
        type: "text"
      },
      {
        text: "italic text",
        type: "text",
        italic: true
      },
      {
        text: ", and ",
        type: "text"
      },
      {
        text: "inline code",
        type: "text",
        code: true
      },
      {
        text: " formatting.",
        type: "text"
      }
    ]
  },
  {
    type: "heading",
    level: 3,
    children: [
      {
        text: "Numbered List",
        type: "text"
      }
    ]
  },
  {
    type: "list",
    format: "ordered",
    children: [
      {
        type: "list-item",
        children: [
          {
            text: "First item",
            type: "text"
          }
        ]
      },
      {
        type: "list-item",
        children: [
          {
            text: "Second item with ",
            type: "text"
          },
          {
            text: "bold text",
            type: "text",
            bold: true
          }
        ]
      },
      {
        type: "list-item",
        children: [
          {
            text: "Third item",
            type: "text"
          }
        ]
      }
    ]
  }
];

export const Default: Story = {
  args: {
    blocks: sampleRichTextBlocks,
    variant: 'default'
  }
};

export const Compact: Story = {
  args: {
    blocks: sampleRichTextBlocks,
    variant: 'compact'
  }
};

export const Summary: Story = {
  args: {
    blocks: sampleRichTextBlocks,
    variant: 'summary',
    maxLength: 100
  }
};

export const SummaryLong: Story = {
  args: {
    blocks: sampleRichTextBlocks,
    variant: 'summary',
    maxLength: 200
  }
};

export const FormattingExamples: Story = {
  args: {
    blocks: formattingExampleBlocks,
    variant: 'default'
  }
};

export const EmptyContent: Story = {
  args: {
    blocks: [],
    variant: 'default'
  }
};

export const ThemeComparison: Story = {
  render: () => (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="bg-white min-h-screen">
        <div className="p-4 bg-gray-100 text-center font-semibold text-gray-900">
          Light Theme
        </div>
        <div className="p-6">
          <RichTextRenderer blocks={sampleRichTextBlocks} variant="default" />
        </div>
      </div>
      <div className="bg-slate-900 min-h-screen dark">
        <div className="p-4 bg-slate-800 text-center font-semibold text-slate-100">
          Dark Theme
        </div>
        <div className="p-6">
          <RichTextRenderer blocks={sampleRichTextBlocks} variant="default" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Side-by-side comparison of light and dark theme implementations'
      }
    }
  }
};
