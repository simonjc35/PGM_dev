import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { PriceCard } from '@/components/PriceCard';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { PGMPrice, PricingVariables, OfferPrice } from '@/types';
import { PriceService } from '@/lib/priceService';
import { PriceCalculator } from '@/lib/priceCalculator';
import { RefreshCw } from 'lucide-react-native';

export default function PricesScreen() {
  const [prices, setPrices] = useState<PGMPrice[]>([]);
  const [offerPrices, setOfferPrices] = useState<OfferPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Mock pricing variables - in real app, fetch from Supabase
  const pricingVariables: PricingVariables = {
    id: '1',
    hedgeValue: 2.5, // 2.5% hedge
    margin: 1.8, // 1.8% margin
    processCost: 5.0, // $5 processing cost
    lastUpdated: new Date().toISOString(),
  };

  const fetchPrices = async () => {
    try {
      const fetchedPrices = await PriceService.fetchPGMPrices();
      setPrices(fetchedPrices);
      
      const calculatedOffers = PriceCalculator.calculateOfferPrices(
        fetchedPrices,
        pricingVariables
      );
      setOfferPrices(calculatedOffers);
    } catch (error) {
      console.error('Error fetching prices:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchPrices();
    
    // Set up auto-refresh every 30 seconds
    const interval = setInterval(fetchPrices, 30000);
    return () => clearInterval(interval);
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchPrices();
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>PGM Live Prices</Text>
        <TouchableOpacity onPress={onRefresh} style={styles.refreshButton}>
          <RefreshCw size={20} color="#1E3A8A" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.variablesCard}>
          <Text style={styles.variablesTitle}>Current Pricing Variables</Text>
          <View style={styles.variablesGrid}>
            <View style={styles.variableItem}>
              <Text style={styles.variableLabel}>Hedge</Text>
              <Text style={styles.variableValue}>{pricingVariables.hedgeValue}%</Text>
            </View>
            <View style={styles.variableItem}>
              <Text style={styles.variableLabel}>Margin</Text>
              <Text style={styles.variableValue}>{pricingVariables.margin}%</Text>
            </View>
            <View style={styles.variableItem}>
              <Text style={styles.variableLabel}>Process</Text>
              <Text style={styles.variableValue}>${pricingVariables.processCost}</Text>
            </View>
          </View>
        </View>

        {prices.map((price, index) => {
          const offer = offerPrices.find(o => o.metal === price.metal);
          return (
            <PriceCard
              key={price.id}
              price={price}
              offerPrice={offer?.offerPrice}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1F2937',
  },
  refreshButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  variablesCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  variablesTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
  },
  variablesGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  variableItem: {
    alignItems: 'center',
  },
  variableLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  variableValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E3A8A',
  },
});