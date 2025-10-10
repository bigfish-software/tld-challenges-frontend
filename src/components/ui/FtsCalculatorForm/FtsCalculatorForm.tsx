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
  const [showAccuracyWarning, setShowAccuracyWarning] = useState(false);

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
    
    // Validate shots taken - empty is treated as 0
    if (formValues.shotsTaken.trim() && (isNaN(Number(formValues.shotsTaken)) || Number(formValues.shotsTaken) < 0)) {
      newErrors.shotsTaken = 'Must be a valid number';
    }
    
    // Validate shots hit - empty is treated as 0
    if (formValues.shotsHit.trim() && (isNaN(Number(formValues.shotsHit)) || Number(formValues.shotsHit) < 0)) {
      newErrors.shotsHit = 'Must be a valid number';
    }
    
    // Validate animal counts - empty is treated as 0
    const animalFields: (keyof FtsCalculatorFormValues)[] = ['moose', 'bears', 'wolves', 'deer', 'rabbits', 'ptarmigans'];
    animalFields.forEach(field => {
      const value = formValues[field] as string;
      if (value.trim() && (isNaN(Number(value)) || Number(value) < 0)) {
        newErrors[field] = 'Must be a valid number';
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Convert form values to numbers, treating empty strings as 0
      const shotsTaken = formValues.shotsTaken.trim() ? Number(formValues.shotsTaken) : 0;
      const shotsHit = formValues.shotsHit.trim() ? Number(formValues.shotsHit) : 0;
      const moose = formValues.moose.trim() ? Number(formValues.moose) : 0;
      const bears = formValues.bears.trim() ? Number(formValues.bears) : 0;
      const wolves = formValues.wolves.trim() ? Number(formValues.wolves) : 0;
      const deer = formValues.deer.trim() ? Number(formValues.deer) : 0;
      const rabbits = formValues.rabbits.trim() ? Number(formValues.rabbits) : 0;
      const ptarmigans = formValues.ptarmigans.trim() ? Number(formValues.ptarmigans) : 0;
      const hasCougar = formValues.cougar === 'yes';
      
      // Calculate animal points
      let animalPoints = 0;
      animalPoints += ptarmigans * 1;  // Birds: 1 point
      animalPoints += rabbits * 1;     // Rabbits: 1 point
      animalPoints += deer * 3;        // Deer: 3 points
      animalPoints += wolves * 5;      // Wolf: 5 points
      animalPoints += bears * 25;      // Bear: 25 points
      animalPoints += moose * 100;     // Moose: 100 points
      
      // Cougar: 250 points, capped at one cougar total
      if (hasCougar) {
        animalPoints += 250;
      }
      
      // Calculate accuracy bonus
      let accuracyPoints = 0;
      const meetsMinimumShots = shotsTaken >= 50;
      
      if (meetsMinimumShots && shotsTaken > 0) {
        const accuracy = (shotsHit / shotsTaken) * 100;
        
        // Accuracy score based on bands (scored on the full percent)
        if (accuracy >= 100) {
          accuracyPoints = 1500;
        } else if (accuracy >= 90) {
          accuracyPoints = 900;
        } else if (accuracy >= 80) {
          accuracyPoints = 800;
        } else if (accuracy >= 70) {
          accuracyPoints = 700;
        } else if (accuracy >= 60) {
          accuracyPoints = 600;
        } else if (accuracy >= 50) {
          accuracyPoints = 500;
        } else if (accuracy >= 40) {
          accuracyPoints = 400;
        } else if (accuracy >= 30) {
          accuracyPoints = 300;
        } else if (accuracy >= 20) {
          accuracyPoints = 200;
        } else if (accuracy >= 10) {
          accuracyPoints = 100;
        }
        // Below 10% accuracy gives 0 points
      }
      
      const totalScore = animalPoints + accuracyPoints;
      setResult(totalScore);
      setShowAccuracyWarning(!meetsMinimumShots);
      
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
    setShowAccuracyWarning(false);
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
            placeholder="0"
            min="0"
          />
        </div>
        
        {/* Cougar Radio Button */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-primary">
            Cougar?
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
          <div className="space-y-4">
            <div className="bg-surface border border-primary rounded-lg p-6">
              <h3 className="text-lg font-semibold text-primary mb-2 font-headline uppercase">Final Score</h3>
              <p className="text-3xl font-bold text-secondary-color">{result}</p>
            </div>
            
            {showAccuracyWarning && (
              <div className="bg-surface border border-border rounded-lg p-4 flex items-start">
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
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" 
                  />
                </svg>
                <p className="text-sm text-secondary">
                  <strong>Note:</strong> Accuracy bonus not included. Minimum of 50 shots required to earn accuracy points.
                </p>
              </div>
            )}
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
