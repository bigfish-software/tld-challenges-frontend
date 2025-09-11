import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { ChallengeResponse } from '@/types/api';
import { RichTextRenderer } from '@/components/ui/RichTextRenderer';
import { CustomCodeCard } from '@/components/ui/CustomCodeCard';
import { TournamentCard } from '@/components/ui/TournamentCard';
import { Accordion } from '@/components/ui/Accordion';
import { Button } from '@/components/ui/Button';
import { getImageUrl, getImageAltText, getResponsiveImageProps } from '@/utils/images';

interface ChallengeDetailPageContentProps {
  challenge: ChallengeResponse;
}

export const ChallengeDetailPageContent: React.FC<ChallengeDetailPageContentProps> = ({ challenge }) => {
  const navigate = useNavigate();
  
  // Helper function to get difficulty color (using same system as ChallengeCard)
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'badge-success'; // Easy - Green
      case 'Medium':
        return 'badge-info'; // Medium - Blue  
      case 'Hard':
        return 'badge-warning'; // Hard - Orange/Amber
      case 'Very Hard':
      case 'Extreme':
        return 'badge-error'; // Very Hard - Red
      default:
        return 'badge-neutral';
    }
  };

  // Format date helper
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
          {/* Hero Section with Thumbnail */}
          <div className="bg-surface border border-default rounded-lg overflow-hidden">
            {challenge.thumbnail && (
              <div className="relative h-64 md:h-96 lg:h-[500px] overflow-hidden">
                {(() => {
                  const imageProps = getResponsiveImageProps(challenge.thumbnail);
                  return imageProps ? (
                    <img
                      src={imageProps.src}
                      srcSet={imageProps.srcSet}
                      sizes={imageProps.sizes}
                      alt={getImageAltText(challenge.thumbnail, challenge.name)}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={getImageUrl(challenge.thumbnail, 'large')}
                      alt={getImageAltText(challenge.thumbnail, challenge.name)}
                      className="w-full h-full object-cover"
                    />
                  );
                })()}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Hero Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                      {challenge.difficulty}
                    </span>
                    {challenge.is_featured && (
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-secondary text-light-primary">
                        Featured
                      </span>
                    )}
                  </div>
                  
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-headline text-white mb-4 drop-shadow-lg">
                    {challenge.name.toUpperCase()}
                  </h1>

                  {challenge.description_short && (
                    <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl drop-shadow">
                      {challenge.description_short}
                    </p>
                  )}
                </div>
              </div>
            )}
            
            {/* Header Section (fallback if no thumbnail) */}
            {!challenge.thumbnail && (
              <div className="p-8">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                    {challenge.difficulty}
                  </span>
                  {challenge.is_featured && (
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-secondary text-light-primary">
                      Featured
                    </span>
                  )}
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary mb-4">
                  {challenge.name.toUpperCase()}
                </h1>

                {challenge.description_short && (
                  <p className="text-lg text-secondary leading-relaxed">
                    {challenge.description_short}
                  </p>
                )}
              </div>
            )}

            {/* Meta Information Bar */}
            <div className="border-t border-default bg-background-primary p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-6 text-sm text-tertiary">
                  <div>
                    <span className="font-medium">Created:</span>
                    <span className="ml-1">{formatDate(challenge.createdAt)}</span>
                  </div>
                  <div>
                    <span className="font-medium">Updated:</span>
                    <span className="ml-1">{formatDate(challenge.updatedAt)}</span>
                  </div>
                </div>

                {/* Creators Section */}
                {challenge.creators && challenge.creators.length > 0 && (
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-tertiary font-medium">Created by:</span>
                    <div className="flex flex-wrap items-center gap-3">
                      {challenge.creators.map((creator) => (
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

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Detailed Description */}
              {challenge.description_long && (
                <div className="bg-surface border border-default rounded-lg p-8">
                  <h2 className="text-2xl font-bold font-headline text-primary mb-6 uppercase">
                    DESCRIPTION
                  </h2>
                  <div className="max-w-none text-primary">
                    <RichTextRenderer blocks={challenge.description_long} />
                  </div>
                </div>
              )}

              {/* Rules Section */}
              {challenge.rules && challenge.rules.length > 0 && (
                <div className="bg-surface border border-default rounded-lg p-8">
                  <h2 className="text-2xl font-bold font-headline text-primary mb-6">
                    RULES & REQUIREMENTS
                  </h2>
                  <div className="space-y-6">
                    {challenge.rules.map((rule, index) => (
                      <div key={rule.id || index} className="border-l-4 border-secondary-color pl-6 py-2">
                        {rule.name && (
                          <h3 className="text-lg font-semibold text-primary mb-2">
                            {index + 1}. {rule.name}
                          </h3>
                        )}
                        <div className="prose dark:prose-invert prose-sm prose-headings:text-primary prose-links:text-primary prose-links:no-underline hover:prose-links:text-secondary-color">
                          <RichTextRenderer blocks={rule.description} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* FAQ Section */}
              {challenge.faqs && challenge.faqs.length > 0 && (
                <div className="bg-surface border border-default rounded-lg p-8">
                  <h2 className="text-2xl font-bold font-headline text-primary mb-6">
                    FREQUENTLY ASKED QUESTIONS
                  </h2>
                  <Accordion allowMultiple={true} className="space-y-3">
                    {challenge.faqs.map((faq) => (
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

            {/* Sidebar Column */}
            <div className="space-y-6">
              {/* Challenge Stats */}
              <div className="bg-surface border border-default rounded-lg p-6">
                <h3 className="text-xl font-bold font-headline text-primary mb-4">
                  CHALLENGE STATS
                </h3>
                <div className="space-y-3 text-sm mb-6">
                  <div className="flex justify-between">
                    <span className="text-tertiary">Submissions:</span>
                    <span className="font-medium text-primary">
                      {challenge.submissions?.length || 0}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-tertiary">Difficulty:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                      {challenge.difficulty}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-tertiary">Created:</span>
                    <span className="font-medium text-primary">
                      {formatDate(challenge.createdAt)}
                    </span>
                  </div>
                  {challenge.updatedAt !== challenge.createdAt && (
                    <div className="flex justify-between">
                      <span className="text-tertiary">Updated:</span>
                      <span className="font-medium text-primary">
                        {formatDate(challenge.updatedAt)}
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Submit Run Button */}
                <Button
                  variant="secondary"
                  size="md"
                  fullWidth
                  shadow="lg"
                  hoverEffect="both"
                  onClick={() => {
                    // TODO: Implement submit run functionality
                    // This could either open a modal or navigate to a submission form
                    console.log('Submit run clicked for challenge:', challenge.id);
                  }}
                >
                  Submit Run
                </Button>
              </div>

              {/* Custom Code Section */}
              {challenge.custom_code && (
                <div className="w-full">
                  <h3 className="text-lg font-bold font-headline text-primary mb-4 uppercase">
                    Custom Code to Use
                  </h3>
                  <CustomCodeCard
                    customCode={{
                      ...challenge.custom_code,
                      publishedAt: challenge.custom_code.publishedAt || '',
                      creators: challenge.creators || []
                    }}
                    variant="compact"
                    onCardClick={(slug) => navigate(`/custom-codes/${slug}`)}
                    className="w-full max-w-full"
                  />
                </div>
              )}

              {/* Tournament Info using TournamentCard */}
              {challenge.tournaments && challenge.tournaments.length > 0 && (
                <div className="w-full">
                  <h3 className="text-lg font-bold font-headline text-primary mb-4 uppercase">
                    Part of {challenge.tournaments.length === 1 ? 'This Tournament' : 'These Tournaments'}
                  </h3>
                  <div className="space-y-4">
                    {challenge.tournaments.map((tournament) => (
                      <TournamentCard
                        key={tournament.id}
                        tournament={{
                          ...tournament,
                          slug: tournament.slug || '',
                          publishedAt: tournament.publishedAt || '',
                          creators: [] // Tournaments from challenge response don't include creators
                        }}
                        variant="compact"
                        onOrganizerClick={(_organizerName, organizerUrl) => {
                          if (organizerUrl) {
                            window.open(organizerUrl, '_blank', 'noopener,noreferrer');
                          }
                        }}
                        className="w-full max-w-full"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Recent Submissions Section */}
          {challenge.submissions && challenge.submissions.length > 0 && (
            <div className="bg-surface border border-default rounded-lg p-8">
              <h2 className="text-2xl font-bold font-headline text-primary mb-6">
                RECENT SUBMISSIONS
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {challenge.submissions.slice(0, 6).map((submission) => (
                  <div key={submission.id} className="border border-default rounded-lg p-4 hover:border-secondary-color transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium text-primary">{submission.runner}</p>
                        {submission.result && (
                          <p className="text-sm text-secondary font-mono">{submission.result}</p>
                        )}
                      </div>
                      <p className="text-xs text-tertiary">
                        {formatDate(submission.submitted_date || submission.createdAt)}
                      </p>
                    </div>
                    {submission.note && (
                      <p className="text-sm text-tertiary mt-2 line-clamp-2">{submission.note}</p>
                    )}
                    <div className="flex justify-between items-center mt-3">
                      {submission.video_url && (
                        <a 
                          href={submission.video_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-secondary-color text-sm transition-colors font-medium"
                        >
                          Watch Run
                        </a>
                      )}
                      {submission.runner_url && (
                        <a 
                          href={submission.runner_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-tertiary hover:text-primary text-xs transition-colors"
                        >
                          Profile
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              {challenge.submissions.length > 6 && (
                <div className="text-center mt-6">
                  <p className="text-sm text-tertiary">
                    Showing 6 of {challenge.submissions.length} submissions
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
