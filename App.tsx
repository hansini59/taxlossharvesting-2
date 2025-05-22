import React from 'react';
import { TaxHarvestingProvider } from './context/TaxHarvestingContext';
import TaxHarvestingPage from './pages/TaxHarvestingPage';

function App() {
  return (
    <TaxHarvestingProvider>
      <div className="min-h-screen bg-gray-50">
        <TaxHarvestingPage />
      </div>
    </TaxHarvestingProvider>
  );
}

export default App;