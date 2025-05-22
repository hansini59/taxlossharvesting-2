import React, { useState } from 'react';
import { useTaxHarvesting } from '../context/TaxHarvestingContext';
import { formatCurrency } from '../utils/formatters';
import { Holding } from '../types';

const HoldingsTable: React.FC = () => {
  const { holdings, selectedHoldings, toggleHolding, toggleAllHoldings } = useTaxHarvesting();
  const [viewAll, setViewAll] = useState(false);
  
  const displayedHoldings = viewAll ? holdings : holdings.slice(0, 10);
  
  const allSelected = holdings.length > 0 && 
    holdings.every(holding => selectedHoldings[holding.coin]);
  
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Holdings</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 rounded"
                    checked={allSelected}
                    onChange={() => toggleAllHoldings(!allSelected)}
                  />
                  <span className="ml-2">Asset</span>
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Holdings<br />Avg Buy Price
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Current Price
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Short-Term Gain
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Long-Term Gain
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount to Sell
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {displayedHoldings.map((holding) => (
              <HoldingRow 
                key={holding.coin} 
                holding={holding} 
                isSelected={selectedHoldings[holding.coin]}
                onToggle={() => toggleHolding(holding.coin)}
              />
            ))}
          </tbody>
        </table>
      </div>
      
      {holdings.length > 10 && (
        <div className="p-4 border-t border-gray-200 flex justify-center">
          <button
            onClick={() => setViewAll(!viewAll)}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            {viewAll ? 'View Less' : 'View All'}
          </button>
        </div>
      )}
    </div>
  );
};

interface HoldingRowProps {
  holding: Holding;
  isSelected: boolean;
  onToggle: () => void;
}

const HoldingRow: React.FC<HoldingRowProps> = ({ holding, isSelected, onToggle }) => {
  return (
    <tr className={isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'}>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <input
            type="checkbox"
            className="h-4 w-4 text-blue-600 rounded mr-4"
            checked={isSelected}
            onChange={onToggle}
          />
          <div className="flex items-center">
            <img 
              src={holding.logo} 
              alt={holding.coin} 
              className="h-8 w-8 rounded-full"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://koinx-statics.s3.ap-south-1.amazonaws.com/currencies/DefaultCoin.svg";
              }}
            />
            <div className="ml-4">
              <div className="font-medium text-gray-900">{holding.coin}</div>
              <div className="text-xs text-gray-500">{holding.coinName}</div>
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{holding.totalHolding.toFixed(6)}</div>
        <div className="text-xs text-gray-500">{formatCurrency(holding.averageBuyPrice)}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{formatCurrency(holding.currentPrice)}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className={`text-sm font-medium ${holding.stcg.gain >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {formatCurrency(holding.stcg.gain)}
        </div>
        <div className="text-xs text-gray-500">{holding.stcg.balance.toFixed(6)}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className={`text-sm font-medium ${holding.ltcg.gain >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {formatCurrency(holding.ltcg.gain)}
        </div>
        <div className="text-xs text-gray-500">{holding.ltcg.balance.toFixed(6)}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">
          {isSelected ? holding.totalHolding.toFixed(6) : '-'}
        </div>
      </td>
    </tr>
  );
};

export default HoldingsTable;