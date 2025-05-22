import React from 'react';
import { useTaxHarvesting } from '../context/TaxHarvestingContext';
import { formatCurrency } from '../utils/formatters';
import CapitalGainsCard from './CapitalGainsCard';

const CapitalGainsCards: React.FC = () => {
  const { 
    originalCapitalGains, 
    updatedCapitalGains, 
    calculateSavings 
  } = useTaxHarvesting();

  if (!originalCapitalGains || !updatedCapitalGains) return null;

  const preHarvestingNetSTCG = originalCapitalGains.stcg.profits - originalCapitalGains.stcg.losses;
  const preHarvestingNetLTCG = originalCapitalGains.ltcg.profits - originalCapitalGains.ltcg.losses;
  const preHarvestingTotal = preHarvestingNetSTCG + preHarvestingNetLTCG;

  const postHarvestingNetSTCG = updatedCapitalGains.stcg.profits - updatedCapitalGains.stcg.losses;
  const postHarvestingNetLTCG = updatedCapitalGains.ltcg.profits - updatedCapitalGains.ltcg.losses;
  const postHarvestingTotal = postHarvestingNetSTCG + postHarvestingNetLTCG;

  const savings = calculateSavings();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <CapitalGainsCard
        title="Capital Gains (Pre-Harvesting)"
        type="pre"
        stcg={{
          profits: originalCapitalGains.stcg.profits,
          losses: originalCapitalGains.stcg.losses,
          net: preHarvestingNetSTCG
        }}
        ltcg={{
          profits: originalCapitalGains.ltcg.profits,
          losses: originalCapitalGains.ltcg.losses,
          net: preHarvestingNetLTCG
        }}
        total={preHarvestingTotal}
      />
      
      <CapitalGainsCard
        title="Capital Gains (After Harvesting)"
        type="post"
        stcg={{
          profits: updatedCapitalGains.stcg.profits,
          losses: updatedCapitalGains.stcg.losses,
          net: postHarvestingNetSTCG
        }}
        ltcg={{
          profits: updatedCapitalGains.ltcg.profits,
          losses: updatedCapitalGains.ltcg.losses,
          net: postHarvestingNetLTCG
        }}
        total={postHarvestingTotal}
        savings={savings > 0 ? savings : undefined}
      />
    </div>
  );
};

export default CapitalGainsCards;