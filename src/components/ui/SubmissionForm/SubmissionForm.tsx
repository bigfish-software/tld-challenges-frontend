import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { Input, Textarea, Select, SimpleCaptcha, Button, ErrorDisplay } from '../';
import { apiService } from '../../../services/api';
import { validateResult, getResultValidationError, isValidVideoUrl, isValidSocialUrl, getVideoUrlValidationError, getSocialUrlValidationError, ensureHttpsUrl } from '../../../utils/validation';
import type { SelectOption } from '../Select/Select';
import type { ChallengeResponse } from '../../../types/api';

export interface SubmissionFormValues {
  runner: string;
  runner_url: string;
  video_url: string;
  note: string;
  result: string;
  challenge_id: number;
  challenge?: ChallengeResponse; // For display purposes only
}

export interface SubmissionFormProps {
  challenges?: ChallengeResponse[];
  preselectedChallengeId?: number | undefined;
  onSuccess?: () => void;
  // Optional challenge name for better UX in success message
  challengeName?: string;
}

// Include apiError in the allowed error types
type FormErrors = Partial<Record<keyof SubmissionFormValues | 'captcha' | 'apiError', string | null>>;

export const SubmissionForm = ({ 
  challenges = [], 
  preselectedChallengeId,
  onSuccess,
  challengeName
}: SubmissionFormProps) => {
  const navigate = useNavigate();
  // This ensures we always have a valid challenge_id (if preselected) or 0
  const getInitialChallengeId = () => {
    if (preselectedChallengeId !== undefined && preselectedChallengeId !== null) {
      // Verify the preselected challenge exists in our list
      const exists = challenges.some(c => c.id === preselectedChallengeId);
      return exists ? preselectedChallengeId : 0;
    }
    return 0;
  };
  
  const [formValues, setFormValues] = useState<SubmissionFormValues>({
    runner: '',
    runner_url: '',
    video_url: '',
    note: '',
    result: '',
    challenge_id: getInitialChallengeId()
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);

  const challengeOptions: SelectOption[] = challenges.map(challenge => ({
    value: challenge.id.toString(), // Convert to string for consistent comparison with <select>
    label: challenge.name || `Challenge #${challenge.id}`
  }));

  // Add an empty option if no challenge is preselected
  if (!preselectedChallengeId && challengeOptions.length > 0) {
    challengeOptions.unshift({ value: '', label: 'Select a challenge...' });
  }

  const submissionMutation = useMutation({
    mutationFn: (submission: SubmissionFormValues) => {
      // Remove any fields we don't want to send to the API
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { challenge: _, ...submissionData } = submission;
      
      // Match exactly what the backend expects based on working request
      const dataToSend = {
        runner: submissionData.runner,
        runner_url: submissionData.runner_url ? ensureHttpsUrl(submissionData.runner_url) : '',
        video_url: ensureHttpsUrl(submissionData.video_url),
        note: submissionData.note,
        result: submissionData.result,
        challenge: Number(submission.challenge_id)
      };
      
      return apiService.submissions.create(dataToSend);
    },
    onSuccess: () => {
      // Reset form
      resetForm();
      
      // If custom success handler is provided, use that
      if (onSuccess) {
        onSuccess();
      } else {
        // Otherwise, navigate to the success page with challenge context
        const selectedChallenge = challenges.find(c => c.id === formValues.challenge_id);
        navigate('/submission/success', { 
          state: { 
            challengeSlug: selectedChallenge?.slug,
            challengeName: challengeName || selectedChallenge?.name
          }
        });
      }
    },
    onError: (error: any) => {
      // Handle API errors
      if (error.response?.data?.error) {
        setErrors({
          ...errors,
          apiError: error.response.data.error.message || 'An error occurred during submission.'
        });
      } else {
        setErrors({
          ...errors,
          apiError: 'An unexpected error occurred. Please try again later.'
        });
      }
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'challenge_id') {
      // Handle challenge_id special case
      if (value === '') {
        setFormValues(prev => ({ ...prev, challenge_id: 0 }));
      } else {
        // Try to parse as integer
        const numericValue = parseInt(value, 10);
        if (!isNaN(numericValue)) {
          // Verify this is a valid challenge ID from our list
          const validChallenge = challenges.find(c => c.id === numericValue);
          if (validChallenge) {
            setFormValues(prev => ({ ...prev, challenge_id: numericValue }));
          } else {
            setFormValues(prev => ({ ...prev, challenge_id: numericValue }));
          }
        } else {
          setFormValues(prev => ({ ...prev, challenge_id: 0 }));
        }
      }
    } else {
      // Handle all other fields normally
      setFormValues(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error for this field when user types
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  // Checkbox handling removed as no longer needed

  const handleCaptchaChange = (isValid: boolean) => {
    setIsCaptchaValid(isValid);
    
    if (isValid && errors.captcha) {
      setErrors(prev => ({
        ...prev,
        captcha: null
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    // Required fields
    if (!formValues.runner.trim()) {
      newErrors.runner = 'Name is required';
    }
    
    // Make sure challenge_id is a valid number, not 0
    if (!formValues.challenge_id || formValues.challenge_id === 0) {
      newErrors.challenge_id = 'Please select a challenge';
    }
    
    if (!formValues.video_url) {
      newErrors.video_url = 'Video URL is required';
    } else if (!isValidVideoUrl(formValues.video_url)) {
      newErrors.video_url = getVideoUrlValidationError();
    }
    
    // Result is now optional, but if provided, must be valid
    if (formValues.result.trim() && !validateResult(formValues.result)) {
      newErrors.result = getResultValidationError();
    }
    
    // URL validation for social media
    if (formValues.runner_url && !isValidSocialUrl(formValues.runner_url)) {
      newErrors.runner_url = getSocialUrlValidationError();
    }
    
    // Captcha validation
    if (!isCaptchaValid) {
      newErrors.captcha = 'Please complete the human verification';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setFormValues({
      runner: '',
      runner_url: '',
      video_url: '',
      note: '',
      result: '',
      challenge_id: preselectedChallengeId ? Number(preselectedChallengeId) : 0
    });
    setErrors({});
    setIsCaptchaValid(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent browser's built-in validation
    
    // Always run our custom validation
    if (validateForm()) {
      submissionMutation.mutate(formValues);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto" noValidate>
      {errors.apiError && (
        <ErrorDisplay message={errors.apiError} />
      )}
      
      <div className="grid grid-cols-1 gap-6">
          <Select
            name="challenge_id"
            label="Challenge"
            options={challengeOptions}
            value={formValues.challenge_id ? formValues.challenge_id.toString() : ''}
            onChange={handleInputChange}
            error={errors.challenge_id || null}
            required
          />        <Input
          name="runner"
          label="Name"
          value={formValues.runner}
          onChange={handleInputChange}
          error={errors.runner || null}
          required
          placeholder="Your name or handle"
        />
        
        <Input
          name="video_url"
          label="Video URL"
          value={formValues.video_url}
          onChange={handleInputChange}
          error={errors.video_url || null}
          required
          placeholder="youtube.com/watch?v=... or twitch.tv/videos/..."
          helperText="Link to your run video (YouTube or Twitch only)"
        />
        
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 flex items-start">
          <svg 
            className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mr-3 flex-shrink-0 mt-0.5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" 
            />
          </svg>
          <div className="text-sm">
            <p className="text-yellow-800 dark:text-yellow-200 font-medium mb-1">
              Important: Twitch VOD Limitation
            </p>
            <p className="text-yellow-700 dark:text-yellow-300">
              Keep in mind that Twitch only stores your VODs for a limited amount of time. 
              We highly recommend exporting your VOD to YouTube and providing a link to that for permanent archival.
            </p>
          </div>
        </div>
        
        <Input
          name="result"
          label="Result"
          value={formValues.result}
          onChange={handleInputChange}
          error={errors.result || null}
          placeholder="e.g., 98d, 9d 20h 21m, 10:30:12.123, or 501321"
          helperText="Your completion time, survival days, or score (optional)"
        />

        <Input
          name="runner_url"
          label="Socials URL"
          value={formValues.runner_url}
          onChange={handleInputChange}
          error={errors.runner_url || null}
          placeholder="youtube.com/@yourhandle or twitch.tv/yourhandle"
          helperText="Link to your YouTube, Twitch, or Twitter profile"
        />
        
        <Textarea
          name="note"
          label="Notes"
          value={formValues.note}
          onChange={handleInputChange}
          error={errors.note || null}
          placeholder="Any additional information about your run..."
          helperText="Add context or details about your submission"
          rows={4}
        />
        
        <div className="flex justify-center">
          <SimpleCaptcha 
            onChange={handleCaptchaChange}
            error={errors.captcha || null}
          />
        </div>
        
        <div className="bg-surface border border-border rounded-lg p-4 mt-6 flex items-start">
          <svg 
            className="h-5 w-5 text-secondary-color mr-2 flex-shrink-0 mt-0.5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
          <p className="text-sm text-secondary">
            <strong>Note:</strong> Submissions are manually reviewed by our editors. 
            This process may take some time, especially during peak periods. Once approved, 
            your submission will appear on the leaderboard.
          </p>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button 
          type="submit" 
          variant="primary"
          isLoading={submissionMutation.isPending}
        >
          {submissionMutation.isPending ? 'Submitting...' : 'Submit Run'}
        </Button>
      </div>
    </form>
  );
};