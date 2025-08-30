import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { PriceCalculator } from '@/lib/priceCalculator';
import { Calculator } from 'lucide-react-native';

export default function CalculatorScreen() {
  const [spotPrice, setSpotPrice] = useState('2025.50');
  const [hedgeValue, setHedgeValue] = useState('2.5');
  const [margin, setMargin] = useState('1.8');
  const [processCost, setProcessCost] = useState('5.0');
  const [offerPrice, setOfferPrice] = useState<number | null>(null);

  const calculatePrice = () => {
    const variables = {
      id: '1',
      hedgeValue: parseFloat(hedgeValue),
      margin: parseFloat(margin),
      processCost: parseFloat(processCost),
      lastUpdated: new Date().toISOString(),
    };

    const calculated = PriceCalculator.calculateOfferPrice(
      parseFloat(spotPrice),
      variables
    );
    setOfferPrice(calculated);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Calculator size={24} color="#1E3A8A" />
        <Text style={styles.title}>Price Calculator</Text>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Input Parameters</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Spot Price ($)</Text>
            <TextInput
              style={styles.input}
              value={spotPrice}
              onChangeText={setSpotPrice}
              placeholder="Enter spot price"
              keyboardType="decimal-pad"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Hedge Value (%)</Text>
            <TextInput
              style={styles.input}
              value={hedgeValue}
              onChangeText={setHedgeValue}
              placeholder="Enter hedge percentage"
              keyboardType="decimal-pad"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Margin (%)</Text>
            <TextInput
              style={styles.input}
              value={margin}
              onChangeText={setMargin}
              placeholder="Enter margin percentage"
              keyboardType="decimal-pad"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Process Cost ($)</Text>
            <TextInput
              style={styles.input}
              value={processCost}
              onChangeText={setProcessCost}
              placeholder="Enter process cost"
              keyboardType="decimal-pad"
            />
          </View>

          <TouchableOpacity style={styles.calculateButton} onPress={calculatePrice}>
            <Text style={styles.calculateButtonText}>Calculate Offer Price</Text>
          </TouchableOpacity>
        </View>

        {offerPrice && (
          <View style={styles.resultCard}>
            <Text style={styles.resultTitle}>Calculated Offer Price</Text>
            <Text style={styles.resultPrice}>${offerPrice.toFixed(2)}</Text>
            <View style={styles.breakdown}>
              <Text style={styles.breakdownTitle}>Calculation Breakdown:</Text>
              <Text style={styles.breakdownItem}>
                Spot Price: ${parseFloat(spotPrice).toFixed(2)}
              </Text>
              <Text style={styles.breakdownItem}>
                + Hedge ({hedgeValue}%): ${((parseFloat(spotPrice) * parseFloat(hedgeValue)) / 100).toFixed(2)}
              </Text>
              <Text style={styles.breakdownItem}>
                + Process Cost: ${parseFloat(processCost).toFixed(2)}
              </Text>
              <Text style={styles.breakdownItem}>
                + Margin ({margin}%): Applied to total
              </Text>
            </View>
          </View>
        )}
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
    marginLeft: 12,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#F9FAFB',
  },
  calculateButton: {
    backgroundColor: '#1E3A8A',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  calculateButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  resultCard: {
    backgroundColor: '#1E3A8A',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  resultPrice: {
    fontSize: 36,
    fontWeight: '800',
    color: '#F59E0B',
    marginBottom: 20,
  },
  breakdown: {
    width: '100%',
  },
  breakdownTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  breakdownItem: {
    fontSize: 14,
    color: '#E5E7EB',
    marginBottom: 4,
  },
});