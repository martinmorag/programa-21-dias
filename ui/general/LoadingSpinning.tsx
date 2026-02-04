import React from 'react';

export default function LoadingSpinning() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 flex items-center justify-center min-h-screen koko">
      <div className="animate-spin rounded-full h-32 w-32 border-4 border-gray-200 dark:border-gray-700 border-t-transparent dark:border-t-transparent"></div>
    </div>
  );
}