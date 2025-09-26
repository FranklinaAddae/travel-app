import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DIETARY_OPTIONS = [
  { id: 'none', label: 'No Restrictions', icon: 'restaurant' },
  { id: 'vegetarian', label: 'Vegetarian', icon: 'leaf' },
  { id: 'vegan', label: 'Vegan', icon: 'leaf' },
  { id: 'gluten-free', label: 'Gluten-Free', icon: 'nutrition' },
  { id: 'dairy-free', label: 'Dairy-Free', icon: 'nutrition' },
  { id: 'halal', label: 'Halal', icon: 'restaurant' },
  { id: 'kosher', label: 'Kosher', icon: 'restaurant' },
  { id: 'pescatarian', label: 'Pescatarian', icon: 'fish' },
];

export default function DietaryNeedsStep({ data, updateData }) {
  const toggleDietaryRestriction = (restrictionId) => {
    const current = data.dietaryRestrictions || [];
    
    // If selecting "none", clear all others
    if (restrictionId === 'none') {
      updateData({ dietaryRestrictions: ['none'] });
      return;
    }
    
    // If selecting something else, remove "none" if it exists
    let updated = current.includes(restrictionId)
      ? current.filter(id => id !== restrictionId)
      : [...current.filter(id => id !== 'none'), restrictionId];
    
    updateData({ dietaryRestrictions: updated });
  };

  return (
    <View>
      <Text style={styles.stepTitle}>Dietary Preferences</Text>
      <Text style={styles.stepDescription}>
        Let us know about any dietary restrictions or preferences you have. This helps us recommend suitable restaurants and food experiences.
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dietary Restrictions (Optional)</Text>
        <Text style={styles.sectionSubtitle}>Select all that apply to you:</Text>
        
        <View style={styles.optionsGrid}>
          {DIETARY_OPTIONS.map((option) => {
            const isSelected = data.dietaryRestrictions?.includes(option.id);
            
            return (
              <TouchableOpacity
                key={option.id}
                style={[styles.optionCard, isSelected && styles.optionCardSelected]}
                onPress={() => toggleDietaryRestriction(option.id)}
              >
                <View style={styles.optionContent}>
                  <Ionicons 
                    name={option.icon}
                    size={24} 
                    color={isSelected ? '#4F46E5' : '#6B7280'} 
                  />
                  <Text style={[
                    styles.optionLabel,
                    isSelected && styles.optionLabelSelected
                  ]}>
                    {option.label}
                  </Text>
                </View>
                
                <View style={[
                  styles.checkbox,
                  isSelected && styles.checkboxSelected
                ]}>
                  {isSelected && <Ionicons name="checkmark" size={16} color="#FFFFFF" />}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View style={styles.infoBox}>
        <Ionicons name="information-circle" size={20} color="#0369A1" />
        <View style={styles.infoContent}>
          <Text style={styles.infoTitle}>Why we ask this</Text>
          <Text style={styles.infoText}>
            Dietary information helps us provide better recommendations for:
          </Text>
          <View style={styles.infoList}>
            <Text style={styles.infoItem}>• Restaurant suggestions</Text>
            <Text style={styles.infoItem}>• Food tours and cooking classes</Text>
            <Text style={styles.infoItem}>• Hotel meal plan options</Text>
            <Text style={styles.infoItem}>• Local market experiences</Text>
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
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  optionsGrid: {
    gap: 12,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F9FAFB',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
  },
  optionCardSelected: {
    borderColor: '#4F46E5',
    backgroundColor: '#EEF2FF',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionLabel: {
    fontSize: 16,
    color: '#374151',
    marginLeft: 12,
    fontWeight: '500',
  },
  optionLabelSelected: {
    color: '#4F46E5',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#4F46E5',
    borderColor: '#4F46E5',
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#F0F9FF',
    borderWidth: 1,
    borderColor: '#BAE6FD',
    borderRadius: 12,
    padding: 20,
  },
  infoContent: {
    marginLeft: 12,
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0369A1',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#075985',
    marginBottom: 12,
    lineHeight: 20,
  },
  infoList: {
    marginLeft: 8,
  },
  infoItem: {
    fontSize: 14,
    color: '#075985',
    marginBottom: 4,
    lineHeight: 20,
  },
});