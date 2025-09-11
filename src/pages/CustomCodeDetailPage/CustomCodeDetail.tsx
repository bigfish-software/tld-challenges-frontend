import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { CustomCode } from '@/types/api';
import { RichTextRenderer } from '@/components/ui/RichTextRenderer';
import { Accordion } from '@/components/ui/Accordion';
import { Button } from '@/components/ui/Button';
import { getImageUrl, getImageAltText, getResponsiveImageProps } from '@/utils/images';

export interface CustomCodeDetailProps {
  /** The custom code object from the API */
  customCode: CustomCode;
}

export const CustomCodeDetail = ({
  customCode
}: CustomCodeDetailProps) => {
  const navigate = useNavigate();
  // State for copy confirmation
  const [isCopied, setIsCopied] = useState(false);

  const {
    name,
    code,
    description_short,
    description_long, // Rich text description
    creators,
    is_featured,
    createdAt,
    updatedAt,
    challenges, // Related challenges if available
    faqs, // FAQs if available
    thumbnail // Image for the header
  } = customCode;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code || '');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Format date helper (matching ChallengeDetailPage)
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Hero Section (matching ChallengeDetailPage structure) */}
          <div className="bg-surface border border-default rounded-lg overflow-hidden">
            {/* Thumbnail Image Section */}
            {thumbnail && (
              <div className="relative h-64 md:h-96 lg:h-[500px] overflow-hidden">
                {(() => {
                  const imageProps = getResponsiveImageProps(thumbnail);
                  return imageProps ? (
                    <img
                      src={imageProps.src}
                      srcSet={imageProps.srcSet}
                      sizes={imageProps.sizes}
                      alt={getImageAltText(thumbnail, name)}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={getImageUrl(thumbnail, 'large')}
                      alt={getImageAltText(thumbnail, name)}
                      className="w-full h-full object-cover"
                    />
                  );
                })()}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Hero Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    {is_featured && (
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-secondary text-light-primary">
                        Featured
                      </span>
                    )}
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary-color text-white">
                      Custom Code
                    </span>
                  </div>
                  
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-headline text-white mb-4 drop-shadow-lg">
                    {name.toUpperCase()}
                  </h1>

                  {description_short && (
                    <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl drop-shadow">
                      {description_short}
                    </p>
                  )}
                </div>
              </div>
            )}
            
            {/* Header Section (fallback if no thumbnail) */}
            {!thumbnail && (
              <div className="p-8">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  {is_featured && (
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-secondary text-light-primary">
                      Featured
                    </span>
                  )}
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary-color text-white">
                    Custom Code
                  </span>
                </div>
                
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-headline text-primary mb-4">
                  {name.toUpperCase()}
                </h1>

                {description_short && (
                  <p className="text-lg md:text-xl text-secondary leading-relaxed max-w-3xl">
                    {description_short}
                  </p>
                )}
              </div>
            )}

            {/* Meta Information Bar (matching ChallengeDetailPage) */}
            <div className="border-t border-default bg-background-primary p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-6 text-sm text-tertiary">
                  <div>
                    <span className="font-medium">Created:</span>
                    <span className="ml-1">{formatDate(createdAt)}</span>
                  </div>
                  <div>
                    <span className="font-medium">Updated:</span>
                    <span className="ml-1">{formatDate(updatedAt)}</span>
                  </div>
                </div>

                {/* Creators Section (matching ChallengeDetailPage) */}
                {creators && creators.length > 0 && (
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-tertiary font-medium">Created by:</span>
                    <div className="flex flex-wrap items-center gap-3">
                      {creators.map((creator) => (
                        <div key={creator.id} className="flex items-center gap-2">
                          <Link
                            to={`/creators/${creator.slug}`}
                            className="text-primary nav-link hover:text-secondary-color transition-colors font-medium text-sm"
                          >
                            {creator.name}
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Content Grid (matching ChallengeDetailPage layout) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Custom Code Display Section */}
              <div className="bg-surface border border-default rounded-lg p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold font-headline text-primary uppercase">
                    Custom Game Code
                  </h2>
                  <Button
                    variant="primary"
                    size="md"
                    onClick={handleCopyCode}
                    className="flex items-center gap-2"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                    <span>{isCopied ? 'Copied!' : 'Copy Code'}</span>
                  </Button>
                </div>

                {code ? (
                  <div className="bg-background-primary border border-default rounded-lg p-8">
                    <code className="text-3xl md:text-4xl font-mono font-bold text-primary block text-center py-8 tracking-widest break-all">
                      {code}
                    </code>
                  </div>
                ) : (
                  <div className="bg-background-primary border border-default rounded-lg p-8">
                    <p className="text-center text-secondary text-lg">No custom code available</p>
                  </div>
                )}
              </div>

              {/* Detailed Description (matching ChallengeDetailPage) */}
              {description_long && (
                <div className="bg-surface border border-default rounded-lg p-8">
                  <h2 className="text-2xl font-bold font-headline text-primary mb-6 uppercase">
                    Description
                  </h2>
                  <div className="max-w-none text-primary">
                    <RichTextRenderer blocks={description_long} />
                  </div>
                </div>
              )}

              {/* FAQ Section (matching ChallengeDetailPage) */}
              {faqs && faqs.length > 0 && (
                <div className="bg-surface border border-default rounded-lg p-8">
                  <h2 className="text-2xl font-bold font-headline text-primary mb-6 uppercase">
                    Frequently Asked Questions
                  </h2>
                  <Accordion allowMultiple={true} className="space-y-3">
                    {faqs.map((faq) => (
                      <Accordion.Item 
                        key={faq.id} 
                        id={`faq-${faq.id}`} 
                        title={faq.question}
                      >
                        <div className="prose dark:prose-invert prose-sm prose-headings:text-secondary prose-links:text-primary prose-links:no-underline hover:prose-links:text-secondary-color max-w-none">
                          <RichTextRenderer blocks={faq.answer} />
                        </div>
                      </Accordion.Item>
                    ))}
                  </Accordion>
                </div>
              )}
            </div>

            {/* Sidebar Column (matching ChallengeDetailPage) */}
            <div className="space-y-6">
              {/* Custom Code Stats (matching Challenge Stats) */}
              <div className="bg-surface border border-default rounded-lg p-6">
                <h3 className="text-xl font-bold font-headline text-primary mb-4 uppercase">
                  Code Info
                </h3>
                
                <div className="space-y-3 text-sm mb-6">
                  <div className="flex justify-between">
                    <span className="text-tertiary">Related Challenges:</span>
                    <span className="font-medium text-primary">
                      {challenges?.length || 0}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-tertiary">Created:</span>
                    <span className="font-medium text-primary">
                      {formatDate(createdAt)}
                    </span>
                  </div>
                  {updatedAt !== createdAt && (
                    <div className="flex justify-between">
                      <span className="text-tertiary">Updated:</span>
                      <span className="font-medium text-primary">
                        {formatDate(updatedAt)}
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Copy Code Button */}
                <Button
                  variant="secondary"
                  size="md"
                  fullWidth
                  shadow="lg"
                  hoverEffect="both"
                  onClick={handleCopyCode}
                  className="mb-4"
                >
                  {isCopied ? 'Code Copied!' : 'Copy Custom Code'}
                </Button>

                {/* Browse Challenges Button */}
                <Button
                  variant="outline"
                  size="md"
                  fullWidth
                  onClick={() => navigate('/challenges')}
                >
                  Browse Challenges
                </Button>
              </div>

              {/* Related Challenges Section */}
              {challenges && challenges.length > 0 && (
                <div className="w-full">
                  <h3 className="text-lg font-bold font-headline text-primary mb-4 uppercase">
                    Challenges Using This Code
                  </h3>
                  <div className="space-y-4">
                    {challenges.slice(0, 3).map((challenge) => (
                      <div key={challenge.id} className="bg-surface border border-default rounded-lg p-4 hover:border-secondary-color transition-colors">
                        <h4 className="font-semibold text-primary mb-2">
                          <Link
                            to={`/challenges/${challenge.slug}`}
                            className="hover:text-secondary-color transition-colors"
                          >
                            {challenge.name}
                          </Link>
                        </h4>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-tertiary">
                            Difficulty: {challenge.difficulty}
                          </span>
                          <Link
                            to={`/challenges/${challenge.slug}`}
                            className="text-xs text-primary hover:text-secondary-color transition-colors font-medium"
                          >
                            View Challenge →
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                  {challenges.length > 3 && (
                    <div className="mt-4 text-center">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate('/challenges')} // TODO: Add filter for this custom code
                      >
                        View All {challenges.length} Challenges
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
