import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { Input, Textarea, Select, SimpleCaptcha, Button, ErrorDisplay } from '../';
import { apiService } from '../../../services/api';
import type { SelectOption } from '../Select/Select';

export interface IdeaFormValues {
  type: string;
  description: string;
  creator: string;
  creator_twitch?: string;
  creator_youtube?: string;
}

export interface IdeaFormProps {
  onSuccess?: () => void;
  initialType?: string | undefined;
}

type FormErrors = Partial<Record<keyof IdeaFormValues | 'captcha' | 'apiError', string | null>>;

export const IdeaForm = ({ onSuccess, initialType }: IdeaFormProps) => {
  const navigate = useNavigate();
  
  const [formValues, setFormValues] = useState<IdeaFormValues>({
    type: initialType || '',
    description: '',
    creator: '',
    creator_twitch: '',
    creator_youtube: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);

  const ideaTypeOptions: SelectOption[] = [
    { value: '', label: 'Select an idea type...' },
    { value: 'Challenge', label: 'Challenge' },
    { value: 'CustomCode', label: 'Custom Code' },
    { value: 'Tournament', label: 'Tournament' }
  ];

  const ideaMutation = useMutation({
    mutationFn: (idea: IdeaFormValues) => {
      const dataToSend = {
        type: idea.type,
        description: idea.description,
        creator: idea.creator,
        creator_twitch: idea.creator_twitch || '',
        creator_youtube: idea.creator_youtube || ''
      };
      
      return apiService.ideas.create(dataToSend);
    },
    onSuccess: () => {
      // Reset form
      resetForm();
      
      // If custom success handler is provided, use that
      if (onSuccess) {
        onSuccess();
      } else {
        // Otherwise, navigate to a success page
        navigate('/idea/success');
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
    
    setFormValues(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user types
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

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
    if (!formValues.type.trim()) {
      newErrors.type = 'Idea type is required';
    }
    
    if (!formValues.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formValues.description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters long';
    }
    
    if (!formValues.creator.trim()) {
      newErrors.creator = 'Creator name is required';
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
      type: initialType || '',
      description: '',
      creator: '',
      creator_twitch: '',
      creator_youtube: ''
    });
    setErrors({});
    setIsCaptchaValid(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent browser's built-in validation
    
    // Always run our custom validation
    if (validateForm()) {
      ideaMutation.mutate(formValues);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto" noValidate>
      {errors.apiError && (
        <ErrorDisplay message={errors.apiError} />
      )}
      
      {/* Instructions Section */}
      <div className="bg-surface border border-border rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-primary mb-4 flex items-center">
          <svg 
            className="h-5 w-5 text-secondary-color mr-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" 
            />
          </svg>
          Keep this in mind when describing your idea
        </h3>
        
        <div className="space-y-4 text-sm text-secondary">
          <p className="text-base text-secondary mb-6 leading-relaxed">
            We're excited to hear your creative ideas! The Long Dark community thrives on innovative content, and your contributions help shape the future of challenges, custom codes, and tournaments. Each content type serves a unique purpose: <strong>Challenges</strong> test survival skills and creativity, <strong>Custom Codes</strong> modify gameplay mechanics for enhanced experiences, and <strong>Tournaments</strong> bring the community together through competitive events. The more detailed your submission, the better we can understand your vision and bring it to life.
          </p>
          
          <div>
            <h4 className="font-medium text-primary mb-2">For Challenges:</h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Be precise about the goal - when is the challenge completed?</li>
              <li>List all rules that apply to the challenge</li>
              <li>Specify the difficulty level (Easy, Medium, Hard, Very Hard, Extreme)</li>
              <li>Mention any custom codes that should be used</li>
              <li>Provide both a short description (teaser) and long description (detail page)</li>
              <li>Include a compelling name for the challenge</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-primary mb-2">For Custom Codes:</h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Provide the actual custom code</li>
              <li>Include both short and long descriptions</li>
              <li>Give it a memorable name</li>
              <li>Explain what the code does and how it changes gameplay</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-primary mb-2">For Tournaments:</h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Specify start and end dates</li>
              <li>Provide both short and long descriptions</li>
              <li>Mention any prizes or rewards</li>
              <li>Include a compelling tournament name</li>
              <li>Explain the tournament format and rules</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <Select
          name="type"
          label="Idea Type"
          options={ideaTypeOptions}
          value={formValues.type}
          onChange={handleInputChange}
          error={errors.type || null}
          required
        />

        <Input
          name="creator"
          label="Creator Name"
          value={formValues.creator}
          onChange={handleInputChange}
          error={errors.creator || null}
          required
          placeholder="Your name or handle"
          helperText="Let us know who you are!"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            name="creator_twitch"
            label="Twitch Channel (Optional)"
            value={formValues.creator_twitch || ''}
            onChange={handleInputChange}
            placeholder="https://twitch.tv/yourhandle"
            helperText="Your Twitch channel URL"
          />
          
          <Input
            name="creator_youtube"
            label="YouTube Channel (Optional)"
            value={formValues.creator_youtube || ''}
            onChange={handleInputChange}
            placeholder="https://youtube.com/@yourhandle"
            helperText="Your YouTube channel URL"
          />
        </div>
        
        <Textarea
          name="description"
          label="Description"
          value={formValues.description}
          onChange={handleInputChange}
          error={errors.description || null}
          required
          placeholder="Describe your idea in detail..."
          helperText="The more details you provide, the better we can understand and implement your idea"
          rows={12}
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
            <strong>Note:</strong> Your idea submission will be reviewed by our team. 
            We appreciate all community contributions and will consider each suggestion carefully. 
            Popular ideas may be implemented in future updates!
          </p>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button 
          type="submit" 
          variant="primary"
          isLoading={ideaMutation.isPending}
        >
          {ideaMutation.isPending ? 'Submitting...' : 'Submit Idea'}
        </Button>
      </div>
    </form>
  );
};