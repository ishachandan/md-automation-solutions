import React from 'react';

const LoadingSkeleton = ({ count = 3, type = "card" }) => {
  return (
    <div className={`grid gap-6 ${type === 'card' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
      {Array(count).fill(0).map((_, i) => (
        <div key={i} className="animate-pulse bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full">
          <div className="bg-gray-200 h-56 w-full"></div>
          <div className="p-8 flex-1 space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="h-5 bg-gray-200 rounded-lg w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded-lg w-full"></div>
              <div className="h-4 bg-gray-200 rounded-lg w-5/6"></div>
            </div>
            <div className="flex gap-3 pt-4">
              <div className="h-10 bg-gray-200 rounded-full w-28"></div>
              <div className="h-10 bg-gray-200 rounded-full w-28"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
