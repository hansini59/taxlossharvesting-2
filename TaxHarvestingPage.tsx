import React from 'react';
import CapitalGainsCards from '../components/CapitalGainsCards';
import HoldingsTable from '../components/HoldingsTable';
import { useTaxHarvesting } from '../context/TaxHarvestingContext';

const TaxHarvestingPage: React.FC = () => {
  const { loading, error } = useTaxHarvesting();

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4 text-gray-700">Loading tax harvesting data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h3 className="text-red-600 font-medium text-lg mb-2">Error Loading Data</h3>
          <p className="text-gray-700">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Tax Loss Harvesting</h1>
      <CapitalGainsCards />
      <HoldingsTable />
    </div>
  );
};

export default TaxHarvestingPage;