export interface PGMPrice {
  id: string;
  metal: 'gold' | 'silver' | 'platinum' | 'palladium';
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  lastUpdated: string;
}

export interface PricingVariables {
  id: string;
  hedgeValue: number;
  margin: number;
  processCost: number;
  lastUpdated: string;
}

export interface OfferPrice {
  metal: string;
  spotPrice: number;
  offerPrice: number;
  savings: number;
  savingsPercent: number;
}

export interface User {
  id: string;
  email: string;
  membershipTier: 'basic' | 'premium' | 'enterprise';
  created_at: string;
}