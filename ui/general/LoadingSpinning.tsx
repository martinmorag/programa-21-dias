import React from 'react';

export default function LoadingSpinning() {
  return (
    <div className="bg-white dark:bg-gray-950 flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-4 border-gray-200 dark:border-gray-700 border-t-transparent dark:border-t-transparent"></div>
    </div>
  );
}