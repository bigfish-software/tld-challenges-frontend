import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from './Accordion';
import { RichTextRenderer } from '../RichTextRenderer';

const meta: Meta<typeof Accordion> = {
  title: 'UI/Accordion',
  component: Accordion,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A flexible accordion component that supports single or multiple open items.
Built with accessibility in mind, featuring proper ARIA attributes and keyboard navigation.

## Features
- **Single or Multiple**: Control whether multiple items can be open simultaneously
- **Smooth Animation**: CSS transitions for opening/closing with dynamic height
- **Accessibility**: Full keyboard navigation and ARIA support
- **Theme Support**: Works seamlessly with light and dark themes
- **Compound Pattern**: Use Accordion.Item for context-aware items

## Usage Guidelines
- Use for FAQ sections, detailed information panels, or content organization
- Keep titles concise but descriptive
- Consider default open items for important content
- Use allowMultiple for exploratory content, single mode for focused reading
        `
      }
    }
  },
  argTypes: {
    allowMultiple: {
      control: 'boolean',
      description: 'Allow multiple accordion items to be open at once'
    },
    defaultOpenItems: {
      control: 'object',
      description: 'Array of item IDs that should be open by default'
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample FAQ data
const sampleFAQs = [
  {
    id: 'faq-1',
    question: 'How do I start playing The Long Dark?',
    answer: 'The Long Dark is a survival game where you must survive in the Canadian wilderness after a global disaster. Start with Wintermute (story mode) to learn the basics, then try Survival mode for the full experience.'
  },
  {
    id: 'faq-2', 
    question: 'What are custom codes and how do I use them?',
    answer: 'Custom codes are special game settings that modify your survival experience. You can find them on our Custom Codes page and enter them when starting a new survival game to enable specific challenges or modifications.'
  },
  {
    id: 'faq-3',
    question: 'How do I submit a challenge run?',
    answer: 'Once you complete a challenge, you can submit your run through the challenge detail page. Include your completion time, a video link if available, and any notes about your strategy or experience.'
  },
  {
    id: 'faq-4',
    question: 'Can I participate in tournaments as a beginner?',
    answer: 'Absolutely! Our tournaments include challenges for all skill levels, from beginner-friendly survival goals to expert-level endurance challenges. Check the difficulty rating and choose tournaments that match your experience.'
  }
];

// Rich text content for more complex examples
const richTextAnswer = [
  {
    type: 'paragraph',
    children: [
      { text: 'To participate in tournaments, follow these steps:' }
    ]
  },
  {
    type: 'numbered-list',
    children: [
      {
        type: 'list-item',
        children: [{ text: 'Browse available tournaments on the Tournaments page' }]
      },
      {
        type: 'list-item', 
        children: [{ text: 'Select a tournament that matches your skill level' }]
      },
      {
        type: 'list-item',
        children: [{ text: 'Read the challenge requirements carefully' }]
      },
      {
        type: 'list-item',
        children: [{ text: 'Complete the challenge and submit your run' }]
      }
    ]
  }
];

export const Default: Story = {
  render: (args) => (
    <Accordion {...args}>
      {sampleFAQs.map((faq) => (
        <Accordion.Item key={faq.id} id={faq.id} title={faq.question}>
          <p className="text-secondary leading-relaxed">{faq.answer}</p>
        </Accordion.Item>
      ))}
    </Accordion>
  ),
  args: {
    allowMultiple: false,
    defaultOpenItems: []
  }
};

export const AllowMultiple: Story = {
  render: (args) => (
    <Accordion {...args}>
      {sampleFAQs.slice(0, 3).map((faq) => (
        <Accordion.Item key={faq.id} id={faq.id} title={faq.question}>
          <p className="text-secondary leading-relaxed">{faq.answer}</p>
        </Accordion.Item>
      ))}
    </Accordion>
  ),
  args: {
    allowMultiple: true,
    defaultOpenItems: ['faq-1']
  },
  parameters: {
    docs: {
      description: {
        story: 'Multiple accordion items can be open simultaneously when allowMultiple is true'
      }
    }
  }
};

export const WithDefaultOpen: Story = {
  render: (args) => (
    <Accordion {...args}>
      {sampleFAQs.map((faq) => (
        <Accordion.Item key={faq.id} id={faq.id} title={faq.question}>
          <p className="text-secondary leading-relaxed">{faq.answer}</p>
        </Accordion.Item>
      ))}
    </Accordion>
  ),
  args: {
    allowMultiple: false,
    defaultOpenItems: ['faq-2']
  },
  parameters: {
    docs: {
      description: {
        story: 'Specify which items should be open by default using defaultOpenItems'
      }
    }
  }
};

export const WithRichContent: Story = {
  render: (args) => (
    <Accordion {...args}>
      <Accordion.Item 
        id="rich-content" 
        title="How do I participate in tournaments?"
      >
        <div className="prose dark:prose-invert prose-sm max-w-none">
          <RichTextRenderer blocks={richTextAnswer} />
        </div>
      </Accordion.Item>
      <Accordion.Item 
        id="simple-content" 
        title="What equipment do I need?"
      >
        <p className="text-secondary leading-relaxed">
          You only need The Long Dark game installed on your computer. 
          No additional mods or equipment required - just your survival skills!
        </p>
      </Accordion.Item>
      <Accordion.Item 
        id="complex-content" 
        title="Challenge completion requirements"
      >
        <div className="space-y-4">
          <p className="text-secondary leading-relaxed">
            Each challenge has specific completion requirements:
          </p>
          <ul className="list-disc list-inside space-y-2 text-secondary">
            <li>Achieve the stated survival goal (days survived, location reached, etc.)</li>
            <li>Use only the specified custom code settings</li>
            <li>Follow all listed rules and restrictions</li>
            <li>Document your run with screenshots or video (recommended)</li>
          </ul>
          <div className="bg-surface border border-default rounded-lg p-4 mt-4">
            <p className="text-sm text-tertiary">
              <strong>Tip:</strong> Read the full challenge description and FAQ before starting to avoid disqualification.
            </p>
          </div>
        </div>
      </Accordion.Item>
    </Accordion>
  ),
  args: {
    allowMultiple: true,
    defaultOpenItems: []
  },
  parameters: {
    docs: {
      description: {
        story: 'Accordion can contain rich content including lists, formatted text, and nested components'
      }
    }
  }
};

export const SingleItem: Story = {
  render: (args) => (
    <Accordion {...args}>
      <Accordion.Item 
        id="single" 
        title="What is The Long Dark Challenges community?"
      >
        <div className="space-y-4">
          <p className="text-secondary leading-relaxed">
            The Long Dark Challenges is a community-driven platform where players can:
          </p>
          <ul className="list-disc list-inside space-y-1 text-secondary ml-4">
            <li>Participate in survival challenges</li>
            <li>Join organized tournaments</li>
            <li>Share custom game codes</li>
            <li>Connect with other survivors</li>
          </ul>
          <p className="text-secondary leading-relaxed">
            Whether you&apos;re a seasoned survivor or just starting your journey, 
            there&apos;s something for everyone in our community.
          </p>
        </div>
      </Accordion.Item>
    </Accordion>
  ),
  args: {
    allowMultiple: false,
    defaultOpenItems: []
  },
  parameters: {
    docs: {
      description: {
        story: 'Single accordion item for simple expandable content sections'
      }
    }
  }
};

export const ThemeComparison: Story = {
  render: () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white min-h-[400px] p-6 rounded-lg border">
        <div className="p-4 bg-gray-100 text-center font-semibold text-gray-900 mb-6 rounded">
          Light Theme
        </div>
        <Accordion allowMultiple={true} defaultOpenItems={['light-1']}>
          <Accordion.Item id="light-1" title="Getting Started">
            <p className="text-gray-600 leading-relaxed">
              Learn the basics of The Long Dark survival gameplay and community challenges.
            </p>
          </Accordion.Item>
          <Accordion.Item id="light-2" title="Challenge Rules">
            <p className="text-gray-600 leading-relaxed">
              Understanding the rules and requirements for participating in community challenges.
            </p>
          </Accordion.Item>
          <Accordion.Item id="light-3" title="Tournament Guide">
            <p className="text-gray-600 leading-relaxed">
              How to join and compete in organized tournaments with other players.
            </p>
          </Accordion.Item>
        </Accordion>
      </div>
      
      <div className="bg-slate-900 min-h-[400px] p-6 rounded-lg border border-slate-700 dark">
        <div className="p-4 bg-slate-800 text-center font-semibold text-slate-100 mb-6 rounded">
          Dark Theme
        </div>
        <Accordion allowMultiple={true} defaultOpenItems={['dark-1']}>
          <Accordion.Item id="dark-1" title="Getting Started">
            <p className="text-slate-300 leading-relaxed">
              Learn the basics of The Long Dark survival gameplay and community challenges.
            </p>
          </Accordion.Item>
          <Accordion.Item id="dark-2" title="Challenge Rules">
            <p className="text-slate-300 leading-relaxed">
              Understanding the rules and requirements for participating in community challenges.
            </p>
          </Accordion.Item>
          <Accordion.Item id="dark-3" title="Tournament Guide">
            <p className="text-slate-300 leading-relaxed">
              How to join and compete in organized tournaments with other players.
            </p>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Side-by-side comparison of accordion appearance in light and dark themes'
      }
    }
  }
};
