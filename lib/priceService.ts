import { PGMPrice } from '@/types';

export class PriceService {
  private static readonly API_BASE = 'https://api.metals.live/v1/spot';
  
  static async fetchPGMPrices(): Promise<PGMPrice[]> {
    try {
      // Mock data for demo - replace with actual API calls
      const mockPrices: PGMPrice[] = [
        {
          id: '1',
          metal: 'gold',
          symbol: 'XAU',
          price: 2025.50,
          change: 15.30,
          changePercent: 0.76,
          lastUpdated: new Date().toISOString(),
        },
        {
          id: '2',
          metal: 'silver',
          symbol: 'XAG',
          price: 24.85,
          change: -0.45,
          changePercent: -1.78,
          lastUpdated: new Date().toISOString(),
        },
        {
          id: '3',
          metal: 'platinum',
          symbol: 'XPT',
          price: 985.75,
          change: 8.25,
          changePercent: 0.84,
          lastUpdated: new Date().toISOString(),
        },
        {
          id: '4',
          metal: 'palladium',
          symbol: 'XPD',
          price: 945.20,
          change: -12.50,
          changePercent: -1.30,
          lastUpdated: new Date().toISOString(),
        },
      ];

      return mockPrices;
    } catch (error) {
      console.error('Error fetching PGM prices:', error);
      throw new Error('Failed to fetch PGM prices');
    }
  }
}