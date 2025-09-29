/**
 * Tournament date formatting utilities with UTC enforcement
 * 
 * These utilities ensure consistent tournament date display across all users
 * regardless of their timezone by enforcing UTC display with clear labeling.
 */

/**
 * Format a date string as UTC with date, time, and clear UTC labeling
 * Used for tournament start/end dates to ensure consistency across timezones
 * 
 * @param dateString - ISO date string from API (e.g., "2025-05-31T22:00:00.000Z")
 * @returns Formatted date string with time and UTC label (e.g., "May 31, 2025 10:00 PM UTC")
 */
export const formatTournamentDateUTC = (dateString?: string | null): string => {
  if (!dateString) {
    return 'Not specified';
  }
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
    
    const dateFormatted = date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      timeZone: 'UTC' // Force UTC display
    });
    
    const timeFormatted = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: 'UTC' // Force UTC display
    });
    
    return `${dateFormatted} ${timeFormatted} UTC`;
  } catch (error) {
    console.error('Date formatting error:', error, 'for date:', dateString);
    return 'Invalid Date';
  }
};

/**
 * Format a date string as UTC with full month name, time, and clear UTC labeling
 * Used for detailed tournament pages where more verbose formatting is appropriate
 * 
 * @param dateString - ISO date string from API (e.g., "2025-05-31T22:00:00.000Z")
 * @returns Formatted date string with time and UTC label (e.g., "May 31, 2025 10:00 PM UTC")
 */
export const formatTournamentDateLongUTC = (dateString?: string | null): string => {
  if (!dateString) {
    return 'Not specified';
  }
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
    
    const dateFormatted = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC' // Force UTC display
    });
    
    const timeFormatted = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: 'UTC' // Force UTC display
    });
    
    return `${dateFormatted} ${timeFormatted} UTC`;
  } catch (error) {
    console.error('Date formatting error:', error, 'for date:', dateString);
    return 'Invalid Date';
  }
};

/**
 * Format a date range for tournaments with UTC enforcement and time display
 * 
 * @param startDate - ISO date string for tournament start
 * @param endDate - ISO date string for tournament end
 * @returns Formatted date range string (e.g., "May 31 10:00 PM - Jun 15 11:59 PM, 2025 UTC")
 */
export const formatTournamentDateRangeUTC = (
  startDate?: string | null, 
  endDate?: string | null
): string => {
  if (!startDate && !endDate) {
    return 'Dates not specified';
  }
  
  if (!startDate) {
    return `Ends: ${formatTournamentDateUTC(endDate)}`;
  }
  
  if (!endDate) {
    return `Starts: ${formatTournamentDateUTC(startDate)}`;
  }
  
  try {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return 'Invalid dates';
    }
    
    // If same year, show abbreviated format with times
    if (start.getUTCFullYear() === end.getUTCFullYear()) {
      const startDateFormatted = start.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        timeZone: 'UTC'
      });
      
      const startTimeFormatted = start.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZone: 'UTC'
      });
      
      const endDateFormatted = end.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'UTC'
      });
      
      const endTimeFormatted = end.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZone: 'UTC'
      });
      
      return `${startDateFormatted} ${startTimeFormatted} - ${endDateFormatted} ${endTimeFormatted} UTC`;
    }
    
    // Different years, show full format with times
    return `${formatTournamentDateUTC(startDate)} - ${formatTournamentDateUTC(endDate)}`;
  } catch (error) {
    console.error('Date range formatting error:', error);
    return 'Invalid date range';
  }
};