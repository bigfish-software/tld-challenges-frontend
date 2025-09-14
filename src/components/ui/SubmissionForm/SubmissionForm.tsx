import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { Input, Textarea, Select, SimpleCaptcha, Button, ErrorDisplay } from '../';
import { apiClient } from '../../../services/api';
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
}

// Include apiError in the allowed error types
type FormErrors = Partial<Record<keyof SubmissionFormValues | 'captcha' | 'apiError', string | null>>;

export const SubmissionForm = ({ 
  challenges = [], 
  preselectedChallengeId,
  onSuccess
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
      const { challenge, ...submissionData } = submission;
      
      // Make sure challenge_id is sent as a number
      const dataToSend = {
        ...submissionData,
        challenge_id: Number(submission.challenge_id)
      };
      
      return apiClient.post('/submissions', { data: dataToSend });
    },
    onSuccess: () => {
      // Reset form or navigate away
      resetForm();
      if (onSuccess) {
        onSuccess();
      } else {
        navigate('/challenges'); // Navigate to challenges page after successful submission
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
      newErrors.runner = 'Runner name is required';
    }
    
    // Make sure challenge_id is a valid number, not 0
    if (!formValues.challenge_id || formValues.challenge_id === 0) {
      newErrors.challenge_id = 'Please select a challenge';
    }
    
    if (!formValues.video_url) {
      newErrors.video_url = 'Video URL is required';
    } else if (!isValidUrl(formValues.video_url)) {
      newErrors.video_url = 'Please enter a valid URL';
    }
    
    if (!formValues.result.trim()) {
      newErrors.result = 'Result is required';
    }
    
    // URL validation
    if (formValues.runner_url && !isValidUrl(formValues.runner_url)) {
      newErrors.runner_url = 'Please enter a valid URL';
    }
    
    // Captcha validation
    if (!isCaptchaValid) {
      newErrors.captcha = 'Please complete the human verification';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
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
          label="Runner Name"
          value={formValues.runner}
          onChange={handleInputChange}
          error={errors.runner || null}
          required
          placeholder="Your name or handle"
        />
        
        <Input
          name="runner_url"
          label="Runner URL"
          value={formValues.runner_url}
          onChange={handleInputChange}
          error={errors.runner_url || null}
          placeholder="https://your-social-media.com/profile"
          helperText="Link to your YouTube, Twitch, or social media profile"
        />
        
        <Input
          name="video_url"
          label="Video URL"
          value={formValues.video_url}
          onChange={handleInputChange}
          error={errors.video_url || null}
          required
          placeholder="https://youtube.com/watch?v=..."
          helperText="Link to your run video (YouTube or Twitch)"
        />
        
        <Input
          name="result"
          label="Result"
          value={formValues.result}
          onChange={handleInputChange}
          error={errors.result || null}
          required
          placeholder="e.g., 45:30 or 150 days"
          helperText="Your completion time or score"
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