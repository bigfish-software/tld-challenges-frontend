import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { PageLayout } from '../../components/layout';
import { LoadingSpinner, ErrorDisplay, NoDataDisplay, Breadcrumb } from '../../components/ui';
import { MedalIcon, YouTubeIcon } from '../../components/ui/icons';
import { apiService } from '../../services/api';
import { sortSubmissionsByResult, sortSubmissionsByDate, type Submission } from '../../utils/submissions';
import { isVideoUrl } from '../../utils/socialMedia';
import { getImageUrl, getResponsiveImageProps, getImageAltText } from '../../utils/images';
import type { ChallengeResponse } from '../../types/api';

const formatResult = (result: string | undefined): string => {
  if (!result || result.trim() === '') {
    return 'No result';
  }
  return result;
};

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const SubmissionRow = ({ 
  submission, 
  position, 
  showResult 
}: { 
  submission: Submission; 
  position?: number | undefined; 
  showResult: boolean;
}) => {
  const showVideoLink = submission.video_url && isVideoUrl(submission.video_url);
  
  return (
    <div className="card-base rounded-lg p-6 hover:bg-surface-raised transition-all">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1 min-w-0">
          {position && position <= 3 && (
            <MedalIcon position={position as 1 | 2 | 3} size="lg" />
          )}
          {position && position > 3 && (
            <div className="flex-shrink-0 w-8 h-8 bg-neutral text-light-primary rounded-full flex items-center justify-center text-sm font-bold font-sans">
              {position}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-3">
              {submission.runner_url ? (
                <a
                  href={submission.runner_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-primary text-lg font-sans text-link"
                  aria-label={`Visit ${submission.runner}'s profile`}
                >
                  {submission.runner}
                </a>
              ) : (
                <h3 className="font-semibold text-primary text-lg font-sans">{submission.runner}</h3>
              )}
            </div>
            {submission.note && (
              <div className="mt-3">
                <p className="text-secondary italic font-sans text-base leading-relaxed">
                  {submission.note}
                </p>
              </div>
            )}
          </div>
        </div>
        
        <div className="text-right flex-shrink-0 ml-4">
          {showResult && (
            <p className="font-mono text-xl text-primary mb-1 font-semibold">
              {formatResult(submission.result)}
            </p>
          )}
          {showVideoLink && (
            <a
              href={submission.video_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary text-link inline-flex items-center justify-end space-x-2 mb-1"
              aria-label={`Watch ${submission.runner}'s run video`}
            >
              <YouTubeIcon size="sm" />
              <span className="text-sm font-sans">Watch the run</span>
            </a>
          )}
          <p className="text-sm text-secondary font-sans">
            {formatDate(submission.createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
};

export const ChallengeLeaderboardPage = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data, isLoading, error } = useQuery({
    queryKey: ['challenge', slug],
    queryFn: async () => {
      const response = await apiService.challenges.getBySlug(slug!);
      return response as { data: ChallengeResponse };
    },
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-8">
          <LoadingSpinner />
        </div>
      </PageLayout>
    );
  }

  if (error || !data?.data) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-8">
          <ErrorDisplay message="Challenge not found" />
        </div>
      </PageLayout>
    );
  }

  const challenge = data.data;
  const submissions = challenge.submissions || [];
  const hasLeaderboard = challenge.has_leaderboard;
  const sortDirection = challenge.submission_result_sorting;

  // Sort submissions based on leaderboard settings
  const sortedSubmissions = hasLeaderboard 
    ? sortSubmissionsByResult(submissions, sortDirection)
    : sortSubmissionsByDate(submissions, 'ASC'); // Sort by creation date ascending if no leaderboard

  // Filter out empty results for leaderboard view
  const displaySubmissions = hasLeaderboard 
    ? sortedSubmissions.filter(s => s.result && s.result.trim() !== '')
    : sortedSubmissions;

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Challenges', href: '/challenges' },
    { label: challenge.name, href: `/challenges/${challenge.slug}` },
    { label: hasLeaderboard ? 'Leaderboard' : 'All Submissions', current: true }
  ];

  return (
    <PageLayout>
      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumbItems} />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mt-6">
          {/* Header Section with Background Image */}
          <div className={`relative rounded-lg overflow-hidden mb-8 ${
            challenge.thumbnail ? 'min-h-[200px]' : ''
          }`}>
            {/* Background Image */}
            {challenge.thumbnail && (
              <div className="absolute inset-0">
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
                {/* Gradient overlay for better text readability - same as challenge detail page */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </div>
            )}
            
            {/* Fallback background for challenges without thumbnails */}
            {!challenge.thumbnail && (
              <div className="absolute inset-0 bg-gradient-to-br from-primary-color/20 to-secondary-color/20 card-base"></div>
            )}
            
            {/* Content positioned at bottom */}
            <div className={`relative z-10 flex items-end min-h-[200px] ${
              challenge.thumbnail ? '' : 'min-h-[120px]'
            }`}>
              <div className="p-8 w-full">
                <h1 className={`mb-3 font-headline uppercase ${
                  challenge.thumbnail 
                    ? 'text-light-primary text-3xl sm:text-4xl lg:text-5xl font-bold drop-shadow-lg' 
                    : 'text-heading-1'
                }`}>
                  {challenge.name.toUpperCase()}
                </h1>
                <h2 className={`mb-0 font-headline uppercase ${
                  challenge.thumbnail 
                    ? 'text-light-secondary text-xl sm:text-2xl lg:text-3xl font-semibold drop-shadow' 
                    : 'text-heading-3 text-secondary'
                }`}>
                  {hasLeaderboard ? 'LEADERBOARD' : 'ALL SUBMISSIONS'}
                </h2>
              </div>
            </div>
          </div>

          {displaySubmissions.length === 0 ? (
            <NoDataDisplay 
              title="No submissions yet"
              description="Be the first to submit your run for this challenge!"
            />
          ) : (
            <div className="space-y-4">
              {displaySubmissions.map((submission, index) => (
                <SubmissionRow
                  key={submission.id}
                  submission={submission}
                  position={hasLeaderboard ? index + 1 : undefined}
                  showResult={hasLeaderboard}
                />
              ))}
            </div>
          )}

          {/* Back to Challenge Button at bottom */}
          {displaySubmissions.length > 0 && (
            <div className="mt-8 text-center">
              <Link
                to={`/challenges/${challenge.slug}`}
                className="btn-secondary px-6 py-3 text-sm font-medium rounded-md inline-flex items-center space-x-2 font-sans"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>Back to Challenge</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};