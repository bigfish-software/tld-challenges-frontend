import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChallengeResponse } from '@/types/api';
import { RichTextRenderer } from '@/components/ui/RichTextRenderer';
import { CustomCodeCard } from '@/components/ui/CustomCodeCard';

interface ChallengeDetailProps {
  challenge: ChallengeResponse;
}

export const ChallengeDetail: React.FC<ChallengeDetailProps> = ({ challenge }) => {
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

  // Get responsive image URL
  const getImageUrl = (thumbnail: ChallengeResponse['thumbnail'], size: 'thumbnail' | 'small' | 'medium' | 'large' | 'original' = 'medium'): string | undefined => {
    if (!thumbnail) return undefined;
    
    if (size === 'original') return `http://localhost:1337${thumbnail.url}`;
    
    const format = thumbnail.formats?.[size];
    if (format) return `http://localhost:1337${format.url}`;
    
    return `http://localhost:1337${thumbnail.url}`;
  };

  return (
    <div className="space-y-8">
      {/* Hero Section with Thumbnail */}
      <div className="bg-surface border border-default rounded-lg overflow-hidden">
        {challenge.thumbnail && (
          <div className="relative h-64 md:h-96 lg:h-[500px] overflow-hidden">
            <img
              src={getImageUrl(challenge.thumbnail, 'large')}
              alt={challenge.thumbnail.alternativeText || challenge.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Hero Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                  {challenge.difficulty}
                </span>
                {challenge.is_featured && (
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-secondary text-light-primary">
                    ⭐ Featured
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
                  ⭐ Featured
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
                📜 RULES & REQUIREMENTS
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
                ❓ FREQUENTLY ASKED QUESTIONS
              </h2>
              <div className="space-y-6">
                {challenge.faqs.map((faq, index) => (
                  <div key={faq.id} className="border-b border-default pb-6 last:border-b-0">
                    <h3 className="text-lg font-semibold text-primary mb-3">
                      Q{index + 1}: {faq.question}
                    </h3>
                    <div className="prose dark:prose-invert prose-sm prose-headings:text-secondary prose-links:text-primary prose-links:no-underline hover:prose-links:text-secondary-color bg-background-primary p-4 rounded-lg">
                      <RichTextRenderer blocks={faq.answer} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          {/* Custom Code Section */}
          {challenge.custom_code && (
            <div className="w-full">
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

          {/* Tournament Info */}
          {challenge.tournament && (
            <div className="bg-surface border border-default rounded-lg p-6">
              <h3 className="text-xl font-bold font-headline text-primary mb-4">
                🏆 TOURNAMENT INFO
              </h3>
              <div className="space-y-3">
                <div>
                  <h4 className="text-lg font-semibold text-primary">
                    {challenge.tournament.name}
                  </h4>
                  {challenge.tournament.description_short && (
                    <p className="text-sm text-secondary mt-1">
                      {challenge.tournament.description_short}
                    </p>
                  )}
                </div>
                
                <div className="text-sm text-tertiary space-y-1">
                  <div>
                    <span className="font-medium">Status:</span>
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                      challenge.tournament.state === 'active' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                        : challenge.tournament.state === 'planned'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                        : challenge.tournament.state === 'completed'
                        ? 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
                        : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                    }`}>
                      {challenge.tournament.state.charAt(0).toUpperCase() + challenge.tournament.state.slice(1)}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium">Start:</span>
                    <span className="ml-1">{formatDate(challenge.tournament.start_date)}</span>
                  </div>
                  <div>
                    <span className="font-medium">End:</span>
                    <span className="ml-1">{formatDate(challenge.tournament.end_date)}</span>
                  </div>
                </div>
                
                <Link
                  to={`/tournaments/${challenge.tournament.slug}`}
                  className="block w-full text-center bg-secondary-color hover:bg-primary text-white px-4 py-2 rounded-md text-sm font-medium transition-colors mt-4"
                >
                  View Tournament →
                </Link>
              </div>
            </div>
          )}

          {/* Challenge Stats */}
          <div className="bg-surface border border-default rounded-lg p-6">
            <h3 className="text-xl font-bold font-headline text-primary mb-4">
              📊 CHALLENGE STATS
            </h3>
            <div className="space-y-3 text-sm">
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
          </div>
        </div>
      </div>

      {/* Recent Submissions Section */}
      {challenge.submissions && challenge.submissions.length > 0 && (
        <div className="bg-surface border border-default rounded-lg p-8">
          <h2 className="text-2xl font-bold font-headline text-primary mb-6">
            🎯 RECENT SUBMISSIONS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {challenge.submissions.slice(0, 6).map((submission) => (
              <div key={submission.id} className="border border-default rounded-lg p-4 hover:border-secondary-color transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium text-primary">{submission.runner}</p>
                    {submission.result && (
                      <p className="text-sm text-secondary font-mono">⏱️ {submission.result}</p>
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
                      🎥 Watch Run
                    </a>
                  )}
                  {submission.runner_url && (
                    <a 
                      href={submission.runner_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-tertiary hover:text-primary text-xs transition-colors"
                    >
                      Profile →
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
  );
};
