import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const INTERESTS = [
  { id: 'adventure', label: 'Adventure Sports', icon: 'mountain' },
  { id: 'beaches', label: 'Beach & Relaxation', icon: 'sunny' },
  { id: 'photography', label: 'Photography', icon: 'camera' },
  { id: 'culinary', label: 'Culinary Experiences', icon: 'restaurant' },
  { id: 'cultural', label: 'Cultural Sites', icon: 'library' },
  { id: 'nature', label: 'Nature & Wildlife', icon: 'leaf' },
  { id: 'backpacking', label: 'Backpacking', icon: 'bag' },
  { id: 'wellness', label: 'Wellness & Spa', icon: 'heart' },
];

const ACCOMMODATIONS = [
  { id: 'luxury', label: 'Luxury Hotels' },
  { id: 'boutique', label: 'Boutique Hotels' },
  { id: 'hostels', label: 'Hostels' },
  { id: 'airbnb', label: 'Airbnb/Vacation Rentals' },
  { id: 'camping', label: 'Camping' },
  { id: 'mixed', label: 'Mix of Different Types' },
];

const BUDGETS = [
  { id: 'budget', label: 'Budget ($0-50/day)' },
  { id: 'mid-range', label: 'Mid-range ($51-150/day)' },
  { id: 'luxury', label: 'Luxury ($151-300/day)' },
  { id: 'ultra-luxury', label: 'Ultra-luxury ($300+/day)' },
];

export default function TravelInterestsStep({ data, updateData }) {
  const toggleInterest = (interestId) => {
    const current = data.travelInterests || [];
    const updated = current.includes(interestId)
      ? current.filter(id => id !== interestId)
      : [...current, interestId];
    
    updateData({ travelInterests: updated });
  };

  return (
    <View>
      <Text style={styles.stepTitle}>Travel Preferences</Text>
      <Text style={styles.stepDescription}>
        Tell us what excites you most about traveling! Select all that apply.
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Travel Interests *</Text>
        <View style={styles.interestsGrid}>
          {INTERESTS.map((interest) => {
            const isSelected = data.travelInterests?.includes(interest.id);
            
            return (
              <TouchableOpacity
                key={interest.id}
                style={[styles.interestCard, isSelected && styles.interestCardSelected]}
                onPress={() => toggleInterest(interest.id)}
              >
                <Ionicons 
                  name={interest.icon}
                  size={24} 
                  color={isSelected ? '#4F46E5' : '#6B7280'} 
                />
                <Text style={[
                  styles.interestLabel,
                  isSelected && styles.interestLabelSelected
                ]}>
                  {interest.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Accommodation Preference *</Text>
        <View style={styles.optionsContainer}>
          {ACCOMMODATIONS.map((accommodation) => (
            <TouchableOpacity
              key={accommodation.id}
              style={[
                styles.optionButton,
                data.accommodationPreference === accommodation.id && styles.optionButtonSelected
              ]}
              onPress={() => updateData({ accommodationPreference: accommodation.id })}
            >
              <Text style={[
                styles.optionText,
                data.accommodationPreference === accommodation.id && styles.optionTextSelected
              ]}>
                {accommodation.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Budget Range *</Text>
        <View style={styles.optionsContainer}>
          {BUDGETS.map((budget) => (
            <TouchableOpacity
              key={budget.id}
              style={[
                styles.optionButton,
                data.budgetRange === budget.id && styles.optionButtonSelected
              ]}
              onPress={() => updateData({ budgetRange: budget.id })}
            >
              <Ionicons 
                name="card"
                size={16} 
                color={data.budgetRange === budget.id ? '#FFFFFF' : '#6B7280'} 
              />
              <Text style={[
                styles.optionText,
                { marginLeft: 8 },
                data.budgetRange === budget.id && styles.optionTextSelected
              ]}>
                {budget.label}
              </Text>
            </TouchableOpacity>
          ))}
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
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 16,
  },
  interestsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  interestCard: {
    width: '48%',
    backgroundColor: '#F9FAFB',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  interestCardSelected: {
    borderColor: '#4F46E5',
    backgroundColor: '#EEF2FF',
  },
  interestLabel: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 8,
    fontWeight: '500',
  },
  interestLabelSelected: {
    color: '#4F46E5',
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  optionButtonSelected: {
    backgroundColor: '#4F46E5',
    borderColor: '#4F46E5',
  },
  optionText: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
  },
  optionTextSelected: {
    color: '#FFFFFF',
  },
});