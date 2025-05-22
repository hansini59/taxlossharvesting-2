import React from 'react';
import { formatCurrency } from '../utils/formatters';

interface GainsData {
  profits: number;
  losses: number;
  net: number;
}

interface CapitalGainsCardProps {
  title: string;
  type: 'pre' | 'post';
  stcg: GainsData;
  ltcg: GainsData;
  total: number;
  savings?: number;
}

const CapitalGainsCard: React.FC<CapitalGainsCardProps> = ({
  title,
  type,
  stcg,
  ltcg,
  total,
  savings
}) => {
  const cardClass = type === 'pre' 
    ? 'bg-gray-900 text-white' 
    : 'bg-blue-50 border border-blue-200 text-gray-900';
  
  const headingClass = type === 'pre' 
    ? 'text-white' 
    : 'text-blue-800';
  
  const dividerClass = type === 'pre' 
    ? 'border-gray-700' 
    : 'border-blue-200';
  
  const labelClass = type === 'pre' 
    ? 'text-gray-400' 
    : 'text-gray-600';
  
  return (
    <div className={`rounded-lg shadow ${cardClass} p-6`}>
      <h2 className={`text-lg font-semibold mb-4 ${headingClass}`}>{title}</h2>
      
      <div className="space-y-4">
        {/* Short-term capital gains */}
        <div>
          <h3 className={`text-sm font-medium mb-2 ${labelClass}`}>Short-term</h3>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className={`text-xs ${labelClass}`}>Profits</p>
              <p className={`font-medium ${stcg.profits > 0 ? 'text-green-600' : ''}`}>
                {formatCurrency(stcg.profits)}
              </p>
            </div>
            <div>
              <p className={`text-xs ${labelClass}`}>Losses</p>
              <p className={`font-medium ${stcg.losses > 0 ? 'text-red-600' : ''}`}>
                {formatCurrency(stcg.losses)}
              </p>
            </div>
            <div className="col-span-2">
              <p className={`text-xs ${labelClass}`}>Net Short-term Capital Gains</p>
              <p className={`font-semibold ${stcg.net > 0 ? 'text-green-600' : stcg.net < 0 ? 'text-red-600' : ''}`}>
                {formatCurrency(stcg.net)}
              </p>
            </div>
          </div>
        </div>
        
        <hr className={`border-t ${dividerClass}`} />
        
        {/* Long-term capital gains */}
        <div>
          <h3 className={`text-sm font-medium mb-2 ${labelClass}`}>Long-term</h3>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className={`text-xs ${labelClass}`}>Profits</p>
              <p className={`font-medium ${ltcg.profits > 0 ? 'text-green-600' : ''}`}>
                {formatCurrency(ltcg.profits)}
              </p>
            </div>
            <div>
              <p className={`text-xs ${labelClass}`}>Losses</p>
              <p className={`font-medium ${ltcg.losses > 0 ? 'text-red-600' : ''}`}>
                {formatCurrency(ltcg.losses)}
              </p>
            </div>
            <div className="col-span-2">
              <p className={`text-xs ${labelClass}`}>Net Long-term Capital Gains</p>
              <p className={`font-semibold ${ltcg.net > 0 ? 'text-green-600' : ltcg.net < 0 ? 'text-red-600' : ''}`}>
                {formatCurrency(ltcg.net)}
              </p>
            </div>
          </div>
        </div>
        
        <hr className={`border-t ${dividerClass}`} />
        
        {/* Total capital gains */}
        <div>
          <div className="flex justify-between items-center">
            <p className={`text-sm font-medium ${labelClass}`}>Realised Capital Gains</p>
            <p className={`text-lg font-bold ${total > 0 ? 'text-green-600' : total < 0 ? 'text-red-600' : ''}`}>
              {formatCurrency(total)}
            </p>
          </div>
        </div>
        
        {savings && savings > 0 && (
          <div className="mt-4 bg-green-100 text-green-800 p-3 rounded-md flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
            </svg>
            <p className="text-sm font-medium">You're going to save {formatCurrency(savings)}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CapitalGainsCard;