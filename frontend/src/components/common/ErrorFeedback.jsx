import React from 'react';

const ErrorFeedback = ({ message = "Something went wrong loading this content.", onRetry }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center p-16 text-center bg-red-50 rounded-2xl border-2 border-red-100 shadow-sm">
      <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-6">
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">Failed to load</h3>
      <p className="text-gray-600 max-w-md mb-8 leading-relaxed">{message}</p>
      {onRetry && (
        <button 
          onClick={onRetry}
          className="px-8 py-3 bg-black text-white font-medium rounded-full hover:bg-gray-800 transition-colors inline-flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorFeedback;
