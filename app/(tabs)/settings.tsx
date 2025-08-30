import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Settings as SettingsIcon, Save } from 'lucide-react-native';

export default function SettingsScreen() {
  const [hedgeValue, setHedgeValue] = useState('2.5');
  const [margin, setMargin] = useState('1.8');
  const [processCost, setProcessCost] = useState('5.0');
  const [autoUpdate, setAutoUpdate] = useState(true);

  const saveSettings = () => {
    // In real app, save to Supabase
    Alert.alert('Success', 'Pricing variables updated successfully!');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SettingsIcon size={24} color="#1E3A8A" />
        <Text style={styles.title}>Admin Settings</Text>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Pricing Variables</Text>
          <Text style={styles.sectionDescription}>
            Configure the variables used for offer price calculations
          </Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Hedge Value (%)</Text>
            <Text style={styles.description}>
              Risk adjustment percentage applied to spot prices
            </Text>
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
            <Text style={styles.description}>
              Profit margin percentage applied to final price
            </Text>
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
            <Text style={styles.description}>
              Fixed processing cost added to each transaction
            </Text>
            <TextInput
              style={styles.input}
              value={processCost}
              onChangeText={setProcessCost}
              placeholder="Enter process cost"
              keyboardType="decimal-pad"
            />
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={saveSettings}>
            <Save size={20} color="#FFFFFF" />
            <Text style={styles.saveButtonText}>Save Variables</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>API Configuration</Text>
          <Text style={styles.sectionDescription}>
            Configure external API sources for PGM prices
          </Text>
          
          <View style={styles.apiStatus}>
            <Text style={styles.apiLabel}>Primary API Source</Text>
            <View style={styles.statusIndicator}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>Active</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.configButton}>
            <Text style={styles.configButtonText}>Configure API Sources</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Algorithm Settings</Text>
          <Text style={styles.sectionDescription}>
            Enable automatic variable adjustment based on market conditions
          </Text>
          
          <TouchableOpacity
            style={[styles.toggleButton, autoUpdate && styles.toggleActive]}
            onPress={() => setAutoUpdate(!autoUpdate)}
          >
            <Text style={[styles.toggleText, autoUpdate && styles.toggleTextActive]}>
              Auto-Update Variables: {autoUpdate ? 'ON' : 'OFF'}
            </Text>
          </TouchableOpacity>
        </View>
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
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: '#6B7280',
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
  saveButton: {
    backgroundColor: '#10B981',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 8,
  },
  apiStatus: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  apiLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    color: '#10B981',
    fontWeight: '600',
  },
  configButton: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  configButtonText: {
    color: '#1E3A8A',
    fontSize: 16,
    fontWeight: '600',
  },
  toggleButton: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  toggleActive: {
    backgroundColor: '#1E3A8A',
  },
  toggleText: {
    color: '#6B7280',
    fontSize: 16,
    fontWeight: '600',
  },
  toggleTextActive: {
    color: '#FFFFFF',
  },
});