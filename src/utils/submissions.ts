/**
 * Utility functions for sorting and processing submissions
 */

export interface Submission {
  id: number;
  documentId: string;
  runner: string;
  runner_url?: string;
  video_url?: string;
  note?: string;
  result?: string;
  submitted_date?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

/**
 * Converts result string to a numeric value for sorting
 * Handles different result formats: days, time periods, time format, numbers
 */
export const parseResultForSorting = (result: string | undefined): number => {
  if (!result || typeof result !== 'string') {
    return Infinity; // Empty results go to the end
  }

  const trimmedResult = result.trim();
  if (trimmedResult === '') {
    return Infinity;
  }

  // Pattern 1: Days only (e.g., "98d") - convert to minutes
  const daysOnlyMatch = trimmedResult.match(/^(\d+)d$/);
  if (daysOnlyMatch && daysOnlyMatch[1]) {
    return parseInt(daysOnlyMatch[1], 10) * 24 * 60; // Convert days to minutes
  }

  // Pattern 2: Time periods (e.g., "9d 20h 21m") - convert everything to minutes
  const timePeriodsMatch = trimmedResult.match(/^(?:(\d+)d\s*)?(?:(\d+)h\s*)?(?:(\d+)m\s*)?(?:(\d+)s\s*)?$/);
  if (timePeriodsMatch && /\d+[dhms]/.test(trimmedResult)) {
    const days = parseInt(timePeriodsMatch[1] || '0', 10);
    const hours = parseInt(timePeriodsMatch[2] || '0', 10);
    const minutes = parseInt(timePeriodsMatch[3] || '0', 10);
    const seconds = parseInt(timePeriodsMatch[4] || '0', 10);
    
    return (days * 24 * 60) + (hours * 60) + minutes + (seconds / 60);
  }

  // Pattern 3: Time format (e.g., "10:30:12.123") - convert to minutes
  const timeFormatMatch = trimmedResult.match(/^(\d{1,2}):(\d{1,2})(?::(\d{1,2})(?:\.(\d{1,3}))?)?$/);
  if (timeFormatMatch && timeFormatMatch[1] && timeFormatMatch[2]) {
    const hours = parseInt(timeFormatMatch[1], 10);
    const minutes = parseInt(timeFormatMatch[2], 10);
    const seconds = parseInt(timeFormatMatch[3] || '0', 10);
    const milliseconds = parseInt((timeFormatMatch[4] || '0').padEnd(3, '0'), 10);
    
    return (hours * 60) + minutes + (seconds / 60) + (milliseconds / 60000);
  }

  // Pattern 4: Pure numbers - return as is
  const numberMatch = trimmedResult.match(/^\d+$/);
  if (numberMatch) {
    return parseInt(trimmedResult, 10);
  }

  // If no pattern matches, treat as infinity (invalid results go to end)
  return Infinity;
};

/**
 * Sorts submissions based on result field and sorting direction
 * @param submissions Array of submissions to sort
 * @param sortDirection 'ASC' for ascending (lower is better), 'DESC' for descending (higher is better)
 * @returns Sorted array of submissions
 */
export const sortSubmissionsByResult = (
  submissions: Submission[],
  sortDirection: 'ASC' | 'DESC'
): Submission[] => {
  return [...submissions].sort((a, b) => {
    const aValue = parseResultForSorting(a.result);
    const bValue = parseResultForSorting(b.result);
    
    if (sortDirection === 'ASC') {
      return aValue - bValue;
    } else {
      return bValue - aValue;
    }
  });
};

/**
 * Sorts submissions by creation date
 * @param submissions Array of submissions to sort
 * @param direction 'ASC' for oldest first, 'DESC' for newest first
 * @returns Sorted array of submissions
 */
export const sortSubmissionsByDate = (
  submissions: Submission[],
  direction: 'ASC' | 'DESC' = 'DESC'
): Submission[] => {
  return [...submissions].sort((a, b) => {
    const aDate = new Date(a.createdAt).getTime();
    const bDate = new Date(b.createdAt).getTime();
    
    if (direction === 'ASC') {
      return aDate - bDate;
    } else {
      return bDate - aDate;
    }
  });
};

/**
 * Gets the top N submissions from a sorted list, filtering out empty results if using result sorting
 * @param submissions Array of submissions (should be pre-sorted)
 * @param count Number of top submissions to return
 * @param isResultSorting Whether this is result-based sorting (will filter out empty results)
 * @returns Top N submissions
 */
export const getTopSubmissions = (
  submissions: Submission[],
  count: number,
  isResultSorting: boolean = false
): Submission[] => {
  let filteredSubmissions = submissions;
  
  // If using result sorting, filter out submissions without results
  if (isResultSorting) {
    filteredSubmissions = submissions.filter(s => s.result && s.result.trim() !== '');
  }
  
  return filteredSubmissions.slice(0, count);
};