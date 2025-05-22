import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchCapitalGains, fetchHoldings } from '../services/api';
import { CapitalGains, Holding } from '../types';

interface TaxHarvestingContextType {
  originalCapitalGains: CapitalGains | null;
  updatedCapitalGains: CapitalGains | null;
  holdings: Holding[];
  selectedHoldings: { [key: string]: boolean };
  loading: boolean;
  error: string | null;
  toggleHolding: (coin: string) => void;
  toggleAllHoldings: (isSelected: boolean) => void;
  calculateSavings: () => number;
}

const TaxHarvestingContext = createContext<TaxHarvestingContextType | undefined>(undefined);

export const TaxHarvestingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [originalCapitalGains, setOriginalCapitalGains] = useState<CapitalGains | null>(null);
  const [updatedCapitalGains, setUpdatedCapitalGains] = useState<CapitalGains | null>(null);
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [selectedHoldings, setSelectedHoldings] = useState<{ [key: string]: boolean }>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [gainsData, holdingsData] = await Promise.all([
          fetchCapitalGains(),
          fetchHoldings()
        ]);
        
        setOriginalCapitalGains(gainsData.capitalGains);
        setUpdatedCapitalGains(gainsData.capitalGains);
        setHoldings(holdingsData);
        
        // Initialize selectedHoldings with all false
        const initialSelection = holdingsData.reduce((acc: { [key: string]: boolean }, holding) => {
          acc[holding.coin] = false;
          return acc;
        }, {});
        setSelectedHoldings(initialSelection);
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load tax harvesting data. Please try again later.');
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const toggleHolding = (coin: string) => {
    const isSelected = !selectedHoldings[coin];
    setSelectedHoldings(prev => ({
      ...prev,
      [coin]: isSelected
    }));
    
    updateCapitalGains({ ...selectedHoldings, [coin]: isSelected });
  };

  const toggleAllHoldings = (isSelected: boolean) => {
    const newSelection = Object.keys(selectedHoldings).reduce((acc: { [key: string]: boolean }, coin) => {
      acc[coin] = isSelected;
      return acc;
    }, {});
    
    setSelectedHoldings(newSelection);
    updateCapitalGains(newSelection);
  };

  const updateCapitalGains = (selection: { [key: string]: boolean }) => {
    if (!originalCapitalGains) return;

    // Start with original capital gains
    const updatedGains = {
      stcg: { ...originalCapitalGains.stcg },
      ltcg: { ...originalCapitalGains.ltcg }
    };

    // Update with selected holdings
    holdings.forEach(holding => {
      if (selection[holding.coin]) {
        // Short-term capital gains
        if (holding.stcg.gain > 0) {
          updatedGains.stcg.profits += holding.stcg.gain;
        } else if (holding.stcg.gain < 0) {
          updatedGains.stcg.losses += Math.abs(holding.stcg.gain);
        }

        // Long-term capital gains
        if (holding.ltcg.gain > 0) {
          updatedGains.ltcg.profits += holding.ltcg.gain;
        } else if (holding.ltcg.gain < 0) {
          updatedGains.ltcg.losses += Math.abs(holding.ltcg.gain);
        }
      }
    });

    setUpdatedCapitalGains(updatedGains);
  };

  const calculateSavings = (): number => {
    if (!originalCapitalGains || !updatedCapitalGains) return 0;

    const originalNetGain = 
      (originalCapitalGains.stcg.profits - originalCapitalGains.stcg.losses) + 
      (originalCapitalGains.ltcg.profits - originalCapitalGains.ltcg.losses);
    
    const updatedNetGain = 
      (updatedCapitalGains.stcg.profits - updatedCapitalGains.stcg.losses) + 
      (updatedCapitalGains.ltcg.profits - updatedCapitalGains.ltcg.losses);
    
    return originalNetGain > updatedNetGain ? originalNetGain - updatedNetGain : 0;
  };

  return (
    <TaxHarvestingContext.Provider 
      value={{
        originalCapitalGains,
        updatedCapitalGains,
        holdings,
        selectedHoldings,
        loading,
        error,
        toggleHolding,
        toggleAllHoldings,
        calculateSavings
      }}
    >
      {children}
    </TaxHarvestingContext.Provider>
  );
};

export const useTaxHarvesting = (): TaxHarvestingContextType => {
  const context = useContext(TaxHarvestingContext);
  if (context === undefined) {
    throw new Error('useTaxHarvesting must be used within a TaxHarvestingProvider');
  }
  return context;
};