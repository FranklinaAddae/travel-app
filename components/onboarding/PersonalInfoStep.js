import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const COUNTRIES = [
  'United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 
  'France', 'Spain', 'Italy', 'Japan', 'South Korea', 'India', 'Brazil',
  'Mexico', 'Netherlands', 'Sweden', 'Other'
];

export default function PersonalInfoStep({ data, updateData }) {
  const [showCountries, setShowCountries] = useState(false);

  return (
    <View>
      <Text style={styles.stepTitle}>Personal Information</Text>
      <Text style={styles.stepDescription}>
        Let's get to know you better! Please provide your basic information.
      </Text>

      <View style={styles.inputContainer}>
        <View style={styles.inputRow}>
          <Ionicons name="person" size={20} color="#6B7280" />
          <View style={styles.inputContent}>
            <Text style={styles.label}>Full Name *</Text>
            <TextInput
              style={styles.input}
              value={data.fullName}
              onChangeText={(text) => updateData({ fullName: text })}
              placeholder="Enter your full name"
              placeholderTextColor="#9CA3AF"
            />
          </View>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.inputRow}>
          <Ionicons name="call" size={20} color="#6B7280" />
          <View style={styles.inputContent}>
            <Text style={styles.label}>Phone Number *</Text>
            <TextInput
              style={styles.input}
              value={data.phone}
              onChangeText={(text) => updateData({ phone: text })}
              placeholder="+1 (555) 123-4567"
              placeholderTextColor="#9CA3AF"
              keyboardType="phone-pad"
            />
          </View>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.inputRow}>
          <Ionicons name="calendar" size={20} color="#6B7280" />
          <View style={styles.inputContent}>
            <Text style={styles.label}>Date of Birth *</Text>
            <TextInput
              style={styles.input}
              value={data.dateOfBirth}
              onChangeText={(text) => updateData({ dateOfBirth: text })}
              placeholder="MM/DD/YYYY"
              placeholderTextColor="#9CA3AF"
              keyboardType="numeric"
            />
          </View>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.inputRow}>
          <Ionicons name="location" size={20} color="#6B7280" />
          <View style={styles.inputContent}>
            <Text style={styles.label}>Nationality *</Text>
            <TouchableOpacity
              style={styles.dropdownButton}
              onPress={() => setShowCountries(!showCountries)}
            >
              <Text style={[styles.dropdownText, !data.nationality && styles.placeholder]}>
                {data.nationality || 'Select your country'}
              </Text>
              <Ionicons name="chevron-down" size={20} color="#6B7280" />
            </TouchableOpacity>
            
            {showCountries && (
              <View style={styles.dropdown}>
                {COUNTRIES.map((country) => (
                  <TouchableOpacity
                    key={country}
                    style={styles.dropdownItem}
                    onPress={() => {
                      updateData({ nationality: country });
                      setShowCountries(false);
                    }}
                  >
                    <Text style={styles.dropdownItemText}>{country}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  stepTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  stepDescription: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 32,
    lineHeight: 24,
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingTop: 12,
  },
  inputContent: {
    flex: 1,
    marginLeft: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  dropdownText: {
    fontSize: 16,
    color: '#111827',
  },
  placeholder: {
    color: '#9CA3AF',
  },
  dateButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  dateButtonText: {
    fontSize: 16,
    color: '#111827',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  closeButton: {
    padding: 4,
  },
  countriesList: {
    flex: 1,
  },
  countryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F9FAFB',
  },
  selectedCountry: {
    backgroundColor: '#EEF2FF',
  },
  countryText: {
    fontSize: 16,
    color: '#111827',
  },
  selectedCountryText: {
    color: '#4F46E5',
    fontWeight: '600',
  },
});