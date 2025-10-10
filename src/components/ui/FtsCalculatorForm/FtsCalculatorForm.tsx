import React, { useState } from 'react';
import { Input, Button } from '../';

export interface FtsCalculatorFormValues {
  shotsTaken: string;
  shotsHit: string;
  moose: string;
  bears: string;
  wolves: string;
  deer: string;
  rabbits: string;
  ptarmigans: string;
  cougar: 'yes' | 'no';
}

export interface FtsCalculatorFormProps {
  onCalculate?: (values: FtsCalculatorFormValues) => void;
}

type FormErrors = Partial<Record<keyof FtsCalculatorFormValues, string | null>>;

export const FtsCalculatorForm = ({ onCalculate }: FtsCalculatorFormProps) => {
  const [formValues, setFormValues] = useState<FtsCalculatorFormValues>({
    shotsTaken: '',
    shotsHit: '',
    moose: '',
    bears: '',
    wolves: '',
    deer: '',
    rabbits: '',
    ptarmigans: '',
    cougar: 'no'
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [result, setResult] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormValues(prev => ({ ...prev, cougar: value as 'yes' | 'no' }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    // Validate shots taken
    if (!formValues.shotsTaken.trim()) {
      newErrors.shotsTaken = 'Shots taken is required';
    } else if (isNaN(Number(formValues.shotsTaken)) || Number(formValues.shotsTaken) < 0) {
      newErrors.shotsTaken = 'Must be a valid number';
    }
    
    // Validate shots hit
    if (!formValues.shotsHit.trim()) {
      newErrors.shotsHit = 'Shots hit is required';
    } else if (isNaN(Number(formValues.shotsHit)) || Number(formValues.shotsHit) < 0) {
      newErrors.shotsHit = 'Must be a valid number';
    }
    
    // Validate animal counts
    const animalFields: (keyof FtsCalculatorFormValues)[] = ['moose', 'bears', 'wolves', 'deer', 'rabbits', 'ptarmigans'];
    animalFields.forEach(field => {
      const value = formValues[field] as string;
      if (!value.trim()) {
        newErrors[field] = 'Required';
      } else if (isNaN(Number(value)) || Number(value) < 0) {
        newErrors[field] = 'Must be a valid number';
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Placeholder calculation - will be implemented later
      // For now, just set a dummy result
      setResult(0);
      
      if (onCalculate) {
        onCalculate(formValues);
      }
    }
  };

  const handleReset = () => {
    setFormValues({
      shotsTaken: '',
      shotsHit: '',
      moose: '',
      bears: '',
      wolves: '',
      deer: '',
      rabbits: '',
      ptarmigans: '',
      cougar: 'no'
    });
    setErrors({});
    setResult(null);
  };

  return (
    <form onSubmit={handleCalculate} className="space-y-6 max-w-2xl mx-auto" noValidate>
      <div className="grid grid-cols-1 gap-6">
        {/* Shooting Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            name="shotsTaken"
            label="Shots Taken"
            type="number"
            value={formValues.shotsTaken}
            onChange={handleInputChange}
            error={errors.shotsTaken || null}
            required
            placeholder="0"
            min="0"
          />
          
          <Input
            name="shotsHit"
            label="Shots Hit"
            type="number"
            value={formValues.shotsHit}
            onChange={handleInputChange}
            error={errors.shotsHit || null}
            required
            placeholder="0"
            min="0"
          />
        </div>
        
        {/* Spacer */}
        <div className="h-4" />
        
        {/* Animal Kills */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            name="moose"
            label="Moose"
            type="number"
            value={formValues.moose}
            onChange={handleInputChange}
            error={errors.moose || null}
            required
            placeholder="0"
            min="0"
          />
          
          <Input
            name="bears"
            label="Bears"
            type="number"
            value={formValues.bears}
            onChange={handleInputChange}
            error={errors.bears || null}
            required
            placeholder="0"
            min="0"
          />
          
          <Input
            name="wolves"
            label="Wolves"
            type="number"
            value={formValues.wolves}
            onChange={handleInputChange}
            error={errors.wolves || null}
            required
            placeholder="0"
            min="0"
          />
          
          <Input
            name="deer"
            label="Deer"
            type="number"
            value={formValues.deer}
            onChange={handleInputChange}
            error={errors.deer || null}
            required
            placeholder="0"
            min="0"
          />
          
          <Input
            name="rabbits"
            label="Rabbits"
            type="number"
            value={formValues.rabbits}
            onChange={handleInputChange}
            error={errors.rabbits || null}
            required
            placeholder="0"
            min="0"
          />
          
          <Input
            name="ptarmigans"
            label="Ptarmigans"
            type="number"
            value={formValues.ptarmigans}
            onChange={handleInputChange}
            error={errors.ptarmigans || null}
            required
            placeholder="0"
            min="0"
          />
        </div>
        
        {/* Cougar Radio Button */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-primary">
            Cougar? <span className="text-error">*</span>
          </label>
          <div className="flex gap-6">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="cougar"
                value="yes"
                checked={formValues.cougar === 'yes'}
                onChange={handleRadioChange}
                className="w-4 h-4 text-primary-color border-border focus:ring-2 focus:ring-primary-color"
              />
              <span className="ml-2 text-primary">Yes</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="cougar"
                value="no"
                checked={formValues.cougar === 'no'}
                onChange={handleRadioChange}
                className="w-4 h-4 text-primary-color border-border focus:ring-2 focus:ring-primary-color"
              />
              <span className="ml-2 text-primary">No</span>
            </label>
          </div>
        </div>
        
        {/* Spacer */}
        <div className="h-4" />
        
        {/* Result Display */}
        {result !== null && (
          <div className="bg-surface border border-primary rounded-lg p-6">
            <h3 className="text-lg font-semibold text-primary mb-2 font-headline uppercase">Final Score</h3>
            <p className="text-3xl font-bold text-secondary-color">{result}</p>
          </div>
        )}
      </div>
      
      <div className="flex justify-end gap-4">
        {result !== null && (
          <Button 
            type="button" 
            variant="secondary"
            onClick={handleReset}
          >
            Reset
          </Button>
        )}
        <Button 
          type="submit" 
          variant="primary"
        >
          Calculate
        </Button>
      </div>
    </form>
  );
};
