import React from 'react';
import { Link } from 'react-router-dom';
import { ChallengeResponse } from '@/types/api';
import { RichTextRenderer } from '@/components/ui/RichTextRenderer';

interface ChallengeDetailProps {
  challenge: ChallengeResponse;
}

export const ChallengeDetail: React.FC<ChallengeDetailProps> = ({ challenge }) => {
  // Helper function to get difficulty color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'hard':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'very hard':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
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
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="bg-surface border border-default rounded-lg p-8">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                {challenge.difficulty}
              </span>
              {challenge.is_featured && (
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                  Featured
                </span>
              )}
            </div>
            
            <h1 className="text-3xl font-bold font-headline text-primary mb-4">
              {challenge.name.toUpperCase()}
            </h1>

            {challenge.description_short && (
              <p className="text-lg text-secondary leading-relaxed mb-6">
                {challenge.description_short}
              </p>
            )}

            {/* Tournament & Custom Code Info */}
            <div className="flex flex-wrap gap-6 text-sm text-tertiary">
              {challenge.tournament && (
                <div>
                  <span className="font-medium">Tournament:</span>
                  <Link 
                    to={`/tournaments/${challenge.tournament.slug}`}
                    className="ml-1 text-primary hover:text-secondary transition-colors"
                  >
                    {challenge.tournament.name}
                  </Link>
                </div>
              )}
              {challenge.custom_code && (
                <div>
                  <span className="font-medium">Custom Code:</span>
                  <Link 
                    to={`/custom-codes/${challenge.custom_code.slug}`}
                    className="ml-1 text-primary hover:text-secondary transition-colors"
                  >
                    {challenge.custom_code.name}
                  </Link>
                </div>
              )}
              <div>
                <span className="font-medium">Created:</span>
                <span className="ml-1">{formatDate(challenge.createdAt)}</span>
              </div>
            </div>
          </div>

          {/* Creators Section */}
          {challenge.creators && challenge.creators.length > 0 && (
            <div className="lg:text-right">
              <p className="text-sm text-tertiary mb-2">Created by</p>
              <div className="space-y-1">
                {challenge.creators.map((creator) => (
                  <div key={creator.id} className="flex lg:justify-end items-center gap-2">
                    <Link
                      to={`/creators/${creator.slug}`}
                      className="text-primary hover:text-secondary transition-colors font-medium"
                    >
                      {creator.name}
                    </Link>
                    <div className="flex gap-1">
                      {creator.twitch_url && (
                        <a
                          href={creator.twitch_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-tertiary hover:text-primary transition-colors"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
                          </svg>
                        </a>
                      )}
                      {creator.youtube_url && (
                        <a
                          href={creator.youtube_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-tertiary hover:text-primary transition-colors"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Detailed Description */}
      {challenge.description_long && (
        <div className="bg-surface border border-default rounded-lg p-8">
          <h2 className="text-2xl font-bold font-headline text-primary mb-6">
            CHALLENGE DETAILS
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            <RichTextRenderer blocks={challenge.description_long} />
          </div>
        </div>
      )}

      {/* Rules Section */}
      {challenge.rules && challenge.rules.length > 0 && (
        <div className="bg-surface border border-default rounded-lg p-8">
          <h2 className="text-2xl font-bold font-headline text-primary mb-6">
            RULES
          </h2>
          <div className="space-y-4">
            {challenge.rules.map((rule, index) => (
              <div key={rule.id || index} className="border-l-4 border-primary pl-6">
                <div className="prose dark:prose-invert">
                  <RichTextRenderer blocks={rule.description} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Custom Code Section */}
      {challenge.custom_code && (
        <div className="bg-surface border border-default rounded-lg p-8">
          <h2 className="text-2xl font-bold font-headline text-primary mb-6">
            CUSTOM GAME CODE
          </h2>
          <div className="bg-background-primary border border-default rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-primary">
                  {challenge.custom_code.name}
                </h3>
                {challenge.custom_code.description_short && (
                  <p className="text-sm text-tertiary mt-1">
                    {challenge.custom_code.description_short}
                  </p>
                )}
              </div>
              <Link
                to={`/custom-codes/${challenge.custom_code.slug}`}
                className="btn-secondary px-4 py-2 rounded-md text-sm"
              >
                View Details
              </Link>
            </div>
            <div className="bg-surface border border-default rounded-lg p-4">
              <code className="text-sm font-mono text-primary break-all">
                {challenge.custom_code.code}
              </code>
            </div>
          </div>
        </div>
      )}

      {/* FAQ Section */}
      {challenge.faqs && challenge.faqs.length > 0 && (
        <div className="bg-surface border border-default rounded-lg p-8">
          <h2 className="text-2xl font-bold font-headline text-primary mb-6">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <div className="space-y-6">
            {challenge.faqs.map((faq) => (
              <div key={faq.id} className="border-b border-default pb-6 last:border-b-0">
                <h3 className="text-lg font-semibold text-primary mb-3">
                  {faq.question}
                </h3>
                <div className="prose dark:prose-invert">
                  <RichTextRenderer blocks={faq.answer} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Submissions Section */}
      {challenge.submissions && challenge.submissions.length > 0 && (
        <div className="bg-surface border border-default rounded-lg p-8">
          <h2 className="text-2xl font-bold font-headline text-primary mb-6">
            RECENT SUBMISSIONS
          </h2>
          <div className="space-y-4">
            {challenge.submissions.slice(0, 5).map((submission) => (
              <div key={submission.id} className="border border-default rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium text-primary">{submission.runner}</p>
                    {submission.result && (
                      <p className="text-sm text-secondary">Result: {submission.result}</p>
                    )}
                  </div>
                  <p className="text-sm text-tertiary">
                    {formatDate(submission.submitted_date || submission.createdAt)}
                  </p>
                </div>
                {submission.note && (
                  <p className="text-sm text-tertiary mt-2">{submission.note}</p>
                )}
                {submission.video_url && (
                  <a 
                    href={submission.video_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-secondary text-sm transition-colors mt-2 inline-block"
                  >
                    Watch Run →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
