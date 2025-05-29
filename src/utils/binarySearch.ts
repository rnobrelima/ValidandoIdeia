import { useState } from 'react';

export interface SearchStep {
  low: number;
  mid: number;
  high: number;
  found: boolean;
  foundIndex: number | null;
}

export function generateBinarySearchSteps(
  array: number[],
  target: number
): SearchStep[] {
  const steps: SearchStep[] = [];
  let low = 0;
  let high = array.length - 1;
  
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    
    // Add this step to the steps array
    steps.push({
      low,
      mid,
      high,
      found: array[mid] === target,
      foundIndex: array[mid] === target ? mid : null,
    });
    
    // If element is found, we're done
    if (array[mid] === target) {
      break;
    }
    
    // Adjust search boundaries
    if (array[mid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  
  // If no match was found and we've exhausted the search
  if (!steps[steps.length - 1].found) {
    steps.push({
      low,
      mid: -1, // No valid mid point anymore
      high,
      found: false,
      foundIndex: null,
    });
  }
  
  return steps;
}

export function useBinarySearch(array: number[]) {
  const [steps, setSteps] = useState<SearchStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [searchTarget, setSearchTarget] = useState<number | ''>('');
  const [searchCompleted, setSearchCompleted] = useState<boolean>(false);

  const startSearch = () => {
    if (searchTarget === '') return;
    
    const generatedSteps = generateBinarySearchSteps(array, Number(searchTarget));
    setSteps(generatedSteps);
    setCurrentStepIndex(0);
    setSearchCompleted(false);
  };

  const goToNextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      setSearchCompleted(true);
    }
  };

  const resetSearch = () => {
    setSteps([]);
    setCurrentStepIndex(0);
    setSearchTarget('');
    setSearchCompleted(false);
  };

  const currentStep = steps.length > 0 ? steps[currentStepIndex] : null;
  const isSearching = steps.length > 0;
  const isLastStep = currentStepIndex === steps.length - 1;

  return {
    searchTarget,
    setSearchTarget,
    startSearch,
    goToNextStep,
    resetSearch,
    currentStep,
    isSearching,
    isLastStep,
    searchCompleted,
    steps,
    currentStepIndex
  };
}