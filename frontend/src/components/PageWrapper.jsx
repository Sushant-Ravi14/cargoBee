import React from 'react';

const PageWrapper = ({ children, className = '' }) => {
  return (
    <div className={`min-h-screen bg-background w-full overflow-x-hidden ${className}`}>
      {children}
    </div>
  );
};

export default PageWrapper;
