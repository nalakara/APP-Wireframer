import React from 'react';
import { Stage } from '../types';
import { Icon } from './Icon';

interface ProgressBarProps {
  currentStage: Stage;
  stages: { id: Stage; name: string; description: string }[];
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStage, stages }) => {
  const getIconForStage = (stageId: Stage) => {
    switch(stageId) {
      case Stage.Specify: return <Icon name="specify" className="h-6 w-6" />;
      case Stage.Plan: return <Icon name="plan" className="h-6 w-6" />;
      case Stage.Task: return <Icon name="task" className="h-6 w-6" />;
      case Stage.Implement: return <Icon name="implement" className="h-6 w-6" />;
      default: return null;
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center relative">
        {/* Background line */}
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-[#EAE3C9] transform -translate-y-1/2" />
        
        {/* Foreground line (progress) */}
        <div 
          className="absolute top-1/2 left-0 h-0.5 bg-[#00A99D] transform -translate-y-1/2 transition-all duration-500" 
          style={{ width: `${(currentStage / (stages.length -1)) * 100}%` }}
        />
        
        {stages.map((stage) => {
          const isCompleted = currentStage > stage.id;
          const isActive = currentStage === stage.id;
          return (
            <div key={stage.id} className="flex-1 flex flex-col items-center text-center relative z-10">
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 relative ${
                    isActive
                      ? 'bg-[#F45D48] border-[#F45D48] text-white animate-pulse'
                      : isCompleted
                      ? 'bg-[#00A99D] border-[#00A99D] text-white'
                      : 'bg-[#FDFCEC] border-[#EAE3C9] text-gray-400'
                  }`}
                >
                  {isCompleted ? <Icon name="check" className="h-7 w-7" /> : getIconForStage(stage.id)}
                  {isActive && <div className="absolute -inset-1 rounded-full border-2 border-[#F45D48] animate-ping opacity-50"></div>}
                </div>
                <p
                  className={`mt-2 font-semibold transition-colors duration-300 text-sm tracking-widest ${
                    isActive ? 'text-[#333333]' : isCompleted ? 'text-[#333333]' : 'text-gray-400'
                  }`}
                >
                  {stage.name}
                </p>
                <p className="text-xs text-gray-500">{stage.description}</p>
              </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar;
