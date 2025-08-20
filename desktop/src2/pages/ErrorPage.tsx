import React from 'react';

const ErrorPage: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-full w-full">
    <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
    <p>An unexpected error occurred. Please try again later.</p>
  </div>
);

export default ErrorPage;
