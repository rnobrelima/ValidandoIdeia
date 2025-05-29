import React from 'react';
import { SearchStep } from '../utils/binarySearch';

interface ArrayDisplayProps {
  array: number[];
  currentStep: SearchStep | null;
}

const ArrayDisplay: React.FC<ArrayDisplayProps> = ({ array, currentStep }) => {
  return (
    <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-8 sm:mb-10">
      {array.map((num, index) => {
        let bgColor = 'bg-slate-200';
        let textColor = 'text-slate-800';
        
        if (currentStep) {
          // Current search range (light blue)
          if (index >= currentStep.low && index <= currentStep.high) {
            bgColor = 'bg-blue-400';
          }
          
          // Mid index (yellow)
          if (index === currentStep.mid) {
            bgColor = 'bg-amber-400';
            textColor = 'text-slate-900';
          } 
          // Low index (light gray)
          else if (index === currentStep.low) {
            bgColor = 'bg-slate-300';
            textColor = 'text-slate-800';
          } 
          // High index (light gray)
          else if (index === currentStep.high) {
            bgColor = 'bg-slate-300';
            textColor = 'text-slate-800';
          }
          // Out of current search range
          else if (index < currentStep.low || index > currentStep.high) {
            bgColor = 'bg-slate-100';
            textColor = 'text-slate-400';
          }
          
          // Found index (green)
          if (currentStep.found && index === currentStep.foundIndex) {
            bgColor = 'bg-green-500';
            textColor = 'text-white';
          }
        }
        
        return (
          <div 
            key={index}
            className={`relative flex items-center justify-center w-12 h-12 sm:w-12 sm:h-12 md:w-14 md:h-14 ${bgColor} ${textColor} font-semibold rounded-md shadow-sm transition-all duration-300`}
          >
            <span className="text-sm sm:text-base">{num}</span>
            <span className="absolute -bottom-2 sm:-bottom-2 text-[11px] sm:text-xs font-medium text-slate-600 bg-white/80 px-0.5 rounded">{index}</span>
            
            {currentStep && index === currentStep.low && (
              <span className="absolute -top-6 sm:-top-7 text-[11px] sm:text-xs font-medium text-slate-600 bg-white/80 px-0.5 rounded">low</span>
            )}
            {currentStep && index === currentStep.mid && (
              <span className="absolute -top-6 sm:-top-7 text-[11px] sm:text-xs font-medium text-amber-600 bg-white/80 px-0.5 rounded">mid</span>
            )}
            {currentStep && index === currentStep.high && (
              <span className="absolute -top-6 sm:-top-7 text-[11px] sm:text-xs font-medium text-slate-600 bg-white/80 px-0.5 rounded">high</span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ArrayDisplay;