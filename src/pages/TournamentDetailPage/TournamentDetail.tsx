import { Link, useNavigate } from 'react-router-dom';
import type { Tournament, StrapiMedia, ChallengeResponse } from '@/types/api';
import { RichTextRenderer } from '@/components/ui/RichTextRenderer';
import { Accordion } from '@/components/ui/Accordion';
import { getImageUrl, getImageAltText, getResponsiveImageProps } from '@/utils/images';

// Helper type with optional thumbnail property
interface TournamentWithThumbnail extends Tournament {
  thumbnail?: StrapiMedia | null;
}

interface TournamentDetailProps {
  tournament: TournamentWithThumbnail;
}

export const TournamentDetail = ({ tournament }: TournamentDetailProps) => {
  const navigate = useNavigate();
  
  // Format date for display with better error handling
  const formatDate = (dateString?: string | null) => {
    if (!dateString) {
      return 'Not specified';
    }
    
    try {
      const date = new Date(dateString);
      // Check if date is valid
      if (isNaN(date.getTime())) {
        return 'Invalid Date';
      }
      
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      console.error('Date formatting error:', error, 'for date:', dateString);
      return 'Invalid Date';
    }
  };

  // Get tournament state styling
  const getStateBadge = (state: string) => {
    const stateStyles = {
      'planned': 'badge-info',
      'active': 'badge-success',
      'completed': 'badge-neutral',
      'cancelled': 'badge-error'
    };
    return stateStyles[state as keyof typeof stateStyles] || 'badge-info';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Hero Section with Thumbnail */}
          <div className="bg-surface border border-default rounded-lg overflow-hidden">
            {tournament.thumbnail && (
              <div className="relative h-64 md:h-96 lg:h-[500px] overflow-hidden">
                {(() => {
                  const imageProps = getResponsiveImageProps(tournament.thumbnail);
                  return imageProps ? (
                    <img
                      src={imageProps.src}
                      srcSet={imageProps.srcSet}
                      sizes={imageProps.sizes}
                      alt={getImageAltText(tournament.thumbnail, tournament.name)}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={getImageUrl(tournament.thumbnail, 'large')}
                      alt={getImageAltText(tournament.thumbnail, tournament.name)}
                      className="w-full h-full object-cover"
                    />
                  );
                })()}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Hero Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStateBadge(tournament.state)}`}>
                      {tournament.state.charAt(0).toUpperCase() + tournament.state.slice(1)}
                    </span>
                    {tournament.is_featured && (
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-secondary text-light-primary">
                        Featured
                      </span>
                    )}
                  </div>
                  
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-headline text-white mb-4 drop-shadow-lg">
                    {tournament.name.toUpperCase()}
                  </h1>

                  {tournament.description_short && (
                    <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl drop-shadow">
                      {tournament.description_short}
                    </p>
                  )}
                </div>
              </div>
            )}
            
            {/* Header Section (fallback if no thumbnail) */}
            {!tournament.thumbnail && (
              <div className="p-8">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStateBadge(tournament.state)}`}>
                    {tournament.state.charAt(0).toUpperCase() + tournament.state.slice(1)}
                  </span>
                  {tournament.is_featured && (
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-secondary text-light-primary">
                      Featured
                    </span>
                  )}
                </div>
                
                <h1 className="text-3xl sm:text-4xl font-bold font-headline text-primary mb-4">
                  {tournament.name.toUpperCase()}
                </h1>

                {tournament.description_short && (
                  <p className="text-lg text-secondary leading-relaxed">
                    {tournament.description_short}
                  </p>
                )}
              </div>
            )}

            {/* Meta Information Bar */}
            <div className="border-t border-default bg-background-primary p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-6 text-sm text-tertiary">
                  <div>
                    <span className="font-medium">Start Date:</span>
                    <span className="ml-1">{formatDate(tournament.start_date)}</span>
                  </div>
                  <div>
                    <span className="font-medium">End Date:</span>
                    <span className="ml-1">{formatDate(tournament.end_date)}</span>
                  </div>
                </div>

                {/* Creators Section */}
                {tournament.creators && tournament.creators.length > 0 && (
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-tertiary font-medium">Created by:</span>
                    <div className="flex flex-wrap items-center gap-3">
                      {tournament.creators.map((creator) => (
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

          {/* Main Content */}
          <div className="space-y-8">
            {/* Detailed Description */}
            {tournament.description_long && (
              <div className="bg-surface border border-default rounded-lg p-8">
                <h2 className="text-2xl sm:text-3xl font-bold font-headline text-primary mb-6 uppercase">
                  ABOUT THIS TOURNAMENT
                </h2>
                <div className="max-w-none text-primary">
                  <RichTextRenderer blocks={tournament.description_long} />
                </div>
              </div>
            )}

            {/* Tournament Challenges Section - Redesigned with grid layout */}
            {tournament.challenges && tournament.challenges.length > 0 && (
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold font-headline text-primary mb-6 uppercase">
                  TOURNAMENT CHALLENGES ({tournament.challenges.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tournament.challenges.map((challenge) => {
                    // Convert the challenge to a valid ChallengeResponse
                    // Use type assertion to handle complex type conversions
                    const processedChallenge = {
                      ...challenge,
                      // Ensure required ChallengeResponse properties exist
                      id: challenge.id,
                      documentId: challenge.documentId || `doc-${challenge.id}`,
                      name: challenge.name,
                      slug: challenge.slug || `challenge-${challenge.id}`,
                      // Ensure difficulty is one of the allowed values
                      difficulty: (challenge.difficulty as any) || 'Medium',
                      is_featured: !!challenge.is_featured,
                      // Make sure these date properties exist
                      createdAt: (challenge as any).createdAt || new Date().toISOString(),
                      updatedAt: (challenge as any).updatedAt || new Date().toISOString(),
                      publishedAt: (challenge as any).publishedAt || new Date().toISOString(),
                      // Add required properties to match ChallengeResponse type
                      tournaments: [{...tournament, slug: tournament.slug || ''}],
                      custom_code: (challenge as any).custom_code || null,
                      creators: (challenge as any).creators || [],
                      // These properties may now exist in the challenge from tournament data
                      rules: (challenge as any).rules || [],
                      faqs: (challenge as any).faqs || [],
                      submissions: (challenge as any).submissions || [],
                      thumbnail: (challenge as any).thumbnail || null
                    } as ChallengeResponse;

                    // Get difficulty badge styling
                    const getDifficultyBadge = (difficulty: string | undefined) => {
                      switch(difficulty) {
                        case 'Easy': return 'badge-success';
                        case 'Medium': return 'badge-info';
                        case 'Hard': return 'badge-warning';
                        case 'Very Hard': 
                        case 'Extreme': return 'badge-error';
                        default: return 'badge-info';
                      }
                    };
                    
                    return (
                      <div 
                        key={challenge.id} 
                        className={`${challenge.is_featured 
                          ? 'card-base featured-card' 
                          : 'card-base'
                        } group rounded-lg overflow-hidden transition-all duration-200 flex flex-col h-full relative`}
                      >
                        {/* Display challenge thumbnail if available */}
                        {challenge.thumbnail && (
                          <div className="relative overflow-hidden">
                            {/* Use aspect-ratio container for consistent thumbnail sizing */}
                            <div className="aspect-w-16 aspect-h-9 bg-surface border border-default">
                              {(() => {
                                // Define responsive sizes based on grid columns
                                const customSizes = `
                                  (max-width: 639px) 100vw,
                                  (max-width: 767px) 100vw,
                                  (max-width: 1023px) 50vw,
                                  (max-width: 1279px) 33vw,
                                  25vw
                                `;
                                
                                const imageProps = getResponsiveImageProps(challenge.thumbnail);
                                return imageProps ? (
                                  <img
                                    src={imageProps.src}
                                    srcSet={imageProps.srcSet}
                                    sizes={customSizes}
                                    alt={getImageAltText(challenge.thumbnail, challenge.name)}
                                    className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                                    loading="lazy"
                                  />
                                ) : (
                                  <img
                                    src={getImageUrl(challenge.thumbnail, 'medium')}
                                    alt={getImageAltText(challenge.thumbnail, challenge.name)}
                                    className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                                    loading="lazy"
                                  />
                                );
                              })()}
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
                          </div>
                        )}
                        
                        {challenge.is_featured && (
                          <div className="absolute -bottom-px -left-px z-10">
                            <div className="bg-secondary text-light-primary px-3 py-1 text-sm font-semibold rounded-bl-lg rounded-tr-lg">
                              FEATURED
                            </div>
                          </div>
                        )}
                        <div className="p-6 flex flex-col h-full">
                          <div className="flex items-start justify-between">
                            <h3 className="text-xl sm:text-2xl font-bold font-headline text-primary uppercase group-hover:text-secondary-color transition-colors">
                              {challenge.name}
                            </h3>
                            <span className={`inline-flex ml-2 px-3 py-1 rounded-full text-sm font-medium ${getDifficultyBadge(challenge.difficulty)}`}>
                              {challenge.difficulty}
                            </span>
                          </div>
                          
                          {challenge.description_short && (
                            <p className="text-secondary mt-4">
                              {challenge.description_short}
                            </p>
                          )}
                          
                          {/* Display Rules if available */}
                          {processedChallenge.rules && processedChallenge.rules.length > 0 && (
                            <div className="mt-4 space-y-2">
                              <h4 className="text-lg font-semibold text-primary">Rules</h4>
                              <ul className="list-disc space-y-1 text-sm text-secondary pl-4">
                                {processedChallenge.rules.map((rule: any) => {
                                  // Extract the text from the first paragraph of the rule description
                                  const ruleText = rule.description && 
                                    Array.isArray(rule.description) && 
                                    rule.description[0]?.children?.[0]?.text
                                      ? rule.description[0].children[0].text
                                      : rule.name || 'Rule';
                                      
                                  return (
                                    <li key={rule.id} className="leading-tight">
                                      {ruleText}
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          )}
                          
                          <div className="flex-grow"></div>
                          
                          <div className="flex flex-wrap gap-3 mt-4">
                            <button
                              onClick={() => navigate(`/challenges/${processedChallenge.slug}`)}
                              className="btn-primary px-4 py-2 rounded-md text-sm font-medium"
                            >
                              View Details
                            </button>
                            <button
                              onClick={() => navigate(`/submissions/${processedChallenge.id}`)}
                              className="btn-secondary px-4 py-2 rounded-md text-sm font-medium"
                            >
                              Submit Run
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* FAQ Section */}
            {tournament.faqs && tournament.faqs.length > 0 && (
              <div className="bg-surface border border-default rounded-lg p-8">
                <h2 className="text-2xl sm:text-3xl font-bold font-headline text-primary mb-6 uppercase">
                  FREQUENTLY ASKED QUESTIONS
                </h2>
                <Accordion allowMultiple={true} className="space-y-3">
                  {tournament.faqs.map((faq) => (
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
        </div>
      </div>
    </div>
  );
};
