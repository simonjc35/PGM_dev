import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PGMPrice } from '@/types';
import { TrendingUp, TrendingDown } from 'lucide-react-native';

interface PriceCardProps {
  price: PGMPrice;
  offerPrice?: number;
}

export function PriceCard({ price, offerPrice }: PriceCardProps) {
  const isPositive = price.change >= 0;
  const metalNames: Record<string, string> = {
    gold: 'Gold',
    silver: 'Silver',
    platinum: 'Platinum',
    palladium: 'Palladium',
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.metalName}>{metalNames[price.metal]}</Text>
          <Text style={styles.symbol}>{price.symbol}</Text>
        </View>
        <View style={[styles.changeContainer, isPositive ? styles.positive : styles.negative]}>
          {isPositive ? (
            <TrendingUp size={16} color="#10B981" />
          ) : (
            <TrendingDown size={16} color="#EF4444" />
          )}
          <Text style={[styles.changeText, isPositive ? styles.positiveText : styles.negativeText]}>
            {isPositive ? '+' : ''}{price.changePercent.toFixed(2)}%
          </Text>
        </View>
      </View>
      
      <View style={styles.priceSection}>
        <Text style={styles.spotLabel}>Spot Price</Text>
        <Text style={styles.spotPrice}>${price.price.toFixed(2)}</Text>
      </View>

      {offerPrice && (
        <View style={styles.offerSection}>
          <Text style={styles.offerLabel}>Your Offer Price</Text>
          <Text style={styles.offerPrice}>${offerPrice.toFixed(2)}</Text>
          <Text style={styles.savings}>
            Save ${Math.abs(price.price - offerPrice).toFixed(2)}
          </Text>
        </View>
      )}

      <Text style={styles.lastUpdated}>
        Updated {new Date(price.lastUpdated).toLocaleTimeString()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  metalName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  symbol: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  positive: {
    backgroundColor: '#ECFDF5',
  },
  negative: {
    backgroundColor: '#FEF2F2',
  },
  changeText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  positiveText: {
    color: '#10B981',
  },
  negativeText: {
    color: '#EF4444',
  },
  priceSection: {
    marginBottom: 12,
  },
  spotLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  spotPrice: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1F2937',
  },
  offerSection: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  offerLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  offerPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E3A8A',
    marginBottom: 4,
  },
  savings: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10B981',
  },
  lastUpdated: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});