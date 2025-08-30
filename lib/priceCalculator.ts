import { PGMPrice, PricingVariables, OfferPrice } from '@/types';

export class PriceCalculator {
  static calculateOfferPrice(
    spotPrice: number,
    variables: PricingVariables
  ): number {
    const { hedgeValue, margin, processCost } = variables;
    
    // Apply hedge value (percentage adjustment)
    const hedgedPrice = spotPrice * (1 + hedgeValue / 100);
    
    // Add process cost
    const priceWithProcessCost = hedgedPrice + processCost;
    
    // Apply margin
    const finalPrice = priceWithProcessCost * (1 + margin / 100);
    
    return Math.round(finalPrice * 100) / 100;
  }

  static calculateOfferPrices(
    prices: PGMPrice[],
    variables: PricingVariables
  ): OfferPrice[] {
    return prices.map(price => {
      const offerPrice = this.calculateOfferPrice(price.price, variables);
      const savings = price.price - offerPrice;
      const savingsPercent = (savings / price.price) * 100;

      return {
        metal: price.metal,
        spotPrice: price.price,
        offerPrice,
        savings: Math.abs(savings),
        savingsPercent: Math.abs(savingsPercent),
      };
    });
  }
}