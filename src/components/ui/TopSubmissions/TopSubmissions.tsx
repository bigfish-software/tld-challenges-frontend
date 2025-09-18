import { Link } from 'react-router-dom';
import { sortSubmissionsByResult, getTopSubmissions, type Submission } from '../../../utils/submissions';
import { MedalIcon, YouTubeIcon } from '../icons';
import { isVideoUrl } from '../../../utils/socialMedia';

export interface TopSubmissionsProps {
  submissions: Submission[];
  challengeSlug: string;
  sortDirection: 'ASC' | 'DESC';
  hasLeaderboard: boolean;
}

const formatResult = (result: string | undefined): string => {
  if (!result || result.trim() === '') {
    return 'No result';
  }
  return result;
};

export const TopSubmissions = ({ 
  submissions, 
  challengeSlug, 
  sortDirection,
  hasLeaderboard 
}: TopSubmissionsProps) => {
  // Sort submissions based on leaderboard settings
  const sortedSubmissions = hasLeaderboard 
    ? sortSubmissionsByResult(submissions, sortDirection)
    : submissions; // Don't sort if no leaderboard

  // Get top 3 submissions
  const topSubmissions = getTopSubmissions(sortedSubmissions, 3, hasLeaderboard);

  if (topSubmissions.length === 0) {
    return (
      <div className="bg-surface border border-default rounded-lg p-6">
        <h3 className="text-heading-4 text-primary font-headline mb-4">
          {hasLeaderboard ? 'LEADERBOARD' : 'RECENT SUBMISSIONS'}
        </h3>
        <p className="text-secondary text-sm">
          No submissions yet. Be the first to submit your run!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-default rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-heading-4 text-primary font-headline">
          {hasLeaderboard ? 'LEADERBOARD' : 'RECENT SUBMISSIONS'}
        </h3>
        <Link
          to={`/challenges/${challengeSlug}/leaderboard`}
          className="text-sm text-tertiary text-link"
        >
          View all
        </Link>
      </div>

      <div className="space-y-3">
        {topSubmissions.map((submission, index) => {
          const showVideoLink = submission.video_url && isVideoUrl(submission.video_url);
          
          return (
            <div 
              key={submission.id}
              className="flex items-center justify-between p-4 bg-surface border border-default rounded-lg"
            >
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                {hasLeaderboard && index < 3 && (
                  <MedalIcon position={(index + 1) as 1 | 2 | 3} size="lg" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    {submission.runner_url ? (
                      <a
                        href={submission.runner_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-primary font-sans text-link"
                        aria-label={`Visit ${submission.runner}'s profile`}
                      >
                        {submission.runner}
                      </a>
                    ) : (
                      <span className="font-medium text-primary font-sans">
                        {submission.runner}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="text-right flex-shrink-0 ml-4">
                {hasLeaderboard ? (
                  <>
                    <p className="font-mono text-lg text-primary font-medium">
                      {formatResult(submission.result)}
                    </p>
                    {showVideoLink && (
                      <a
                        href={submission.video_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-secondary text-link inline-flex items-center justify-end space-x-1 mt-1"
                        aria-label={`Watch ${submission.runner}'s run video`}
                      >
                        <YouTubeIcon size="sm" />
                        <span className="text-xs font-sans">Watch the run</span>
                      </a>
                    )}
                  </>
                ) : (
                  <>
                    <p className="text-sm text-secondary font-sans">
                      {new Date(submission.createdAt).toLocaleDateString()}
                    </p>
                    {showVideoLink && (
                      <a
                        href={submission.video_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-secondary text-link inline-flex items-center justify-end space-x-1 mt-1"
                        aria-label={`Watch ${submission.runner}'s run video`}
                      >
                        <YouTubeIcon size="sm" />
                        <span className="text-xs font-sans">Watch the run</span>
                      </a>
                    )}
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};