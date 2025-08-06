import { ProgressProps } from '@/lib/utils';
import React from 'react';

const Progress: React.FC<ProgressProps> = ({ value }) => {
  return (
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
      <div
        className="bg-indigo-600 h-full rounded-full transition-all duration-500"
        style={{ width: `${value}%` }}
      />
    </div>
  );
};

export default Progress;