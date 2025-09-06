import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { CustomCode } from '@/types/api';
import { RichTextRenderer } from '@/components/ui/RichTextRenderer';

export interface CustomCodeDetailProps {
  /** The custom code object from the API */
  customCode: CustomCode;
  /** Additional CSS classes */
  className?: string;
}

export const CustomCodeDetail = ({
  customCode,
  className = ''
}: CustomCodeDetailProps) => {
  // State for copy confirmation
  const [isCopied, setIsCopied] = useState(false);

  const {
    name,
    code,
    description_short,
    description, // Rich text description
    creators,
    is_featured,
    createdAt,
    updatedAt
  } = customCode;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code || '');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Header Section */}
      <div className="feature-card p-8">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="flex-1">
            {/* Title */}
            <div className="flex items-start gap-4 mb-4">
              <h1 className="text-3xl lg:text-4xl font-bold font-headline text-primary">
                {name.toUpperCase()}
              </h1>
              {is_featured && (
                <div className="bg-secondary text-light-primary px-3 py-1 text-sm font-semibold rounded-full flex-shrink-0">
                  FEATURED
                </div>
              )}
            </div>

            {/* Creators */}
            {creators && creators.length > 0 && (
              <div className="mb-4">
                <span className="text-sm text-tertiary mr-2">Created by</span>
                <div className="inline-flex flex-wrap gap-2">
                  {creators.map((creator, index) => (
                    <span key={creator.id} className="text-secondary">
                      <Link
                        to={`/creators/${creator.slug}`}
                        className="hover:text-primary transition-colors"
                      >
                        {creator.name}
                      </Link>
                      {index < creators.length - 1 && <span className="text-tertiary ml-2">,</span>}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Short Description */}
            {description_short && (
              <p className="text-lg text-secondary leading-relaxed">
                {description_short}
              </p>
            )}

            {/* Metadata */}
            <div className="flex flex-wrap gap-6 text-sm text-tertiary mt-6">
              <div>
                <span className="font-medium">Created:</span> {formatDate(createdAt)}
              </div>
              {updatedAt !== createdAt && (
                <div>
                  <span className="font-medium">Updated:</span> {formatDate(updatedAt)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Custom Code Display Section */}
      <div className="feature-card p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold font-headline text-primary">
            CUSTOM GAME CODE
          </h2>
          <button
            onClick={handleCopyCode}
            className="btn-primary px-4 py-2 flex items-center space-x-2"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
            <span>{isCopied ? 'Copied!' : 'Copy Code'}</span>
          </button>
        </div>

        {code ? (
          <div className="bg-surface border border-default rounded-lg p-6">
            <code className="text-2xl font-mono font-bold text-primary block text-center py-8 tracking-widest">
              {code}
            </code>
          </div>
        ) : (
          <div className="bg-surface border border-default rounded-lg p-6">
            <p className="text-center text-secondary">No custom code available</p>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-6 bg-surface border border-default rounded-lg p-4">
          <h3 className="font-semibold text-primary mb-2">How to Use</h3>
          <ol className="list-decimal list-inside text-sm text-secondary space-y-1">
            <li>Copy the custom code above</li>
            <li>Start The Long Dark game</li>
            <li>Go to "Custom Game" mode</li>
            <li>Click "Share/Code" button</li>
            <li>Paste the code and click "Use Code"</li>
          </ol>
        </div>
      </div>

      {/* Long Description Section */}
      {description && (
        <div className="feature-card p-8">
          <h2 className="text-2xl font-bold font-headline text-primary mb-6">
            DESCRIPTION
          </h2>
          <div className="prose prose-lg max-w-none">
            <RichTextRenderer blocks={description} />
          </div>
        </div>
      )}

      {/* Related Challenges Section */}
      {/* TODO: This would be populated when challenges relation is available */}
      
      {/* Back to Custom Codes */}
      <div className="text-center pt-8">
        <Link
          to="/custom-codes"
          className="btn-secondary px-6 py-3 inline-flex items-center space-x-2"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back to Custom Codes</span>
        </Link>
      </div>
    </div>
  );
};
