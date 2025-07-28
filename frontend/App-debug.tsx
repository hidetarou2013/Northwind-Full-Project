import React from 'react';

const App: React.FC = () => {
  return (
    <div className="flex h-screen bg-light-bg items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-dark-text mb-4">Northwind Dashboard</h1>
        <p className="text-light-text">Application is loading successfully!</p>
        <div className="mt-4 p-4 bg-primary text-white rounded">
          <p>If you can see this, React is working!</p>
        </div>
      </div>
    </div>
  );
};

export default App;
