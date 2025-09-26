import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';

// Import step components
import PersonalInfoStep from '../components/onboarding/PersonalInfoStep';
import TravelInterestsStep from '../components/onboarding/TravelInterestsStep';
import DietaryNeedsStep from '../components/onboarding/DietaryNeedsStep';
import VisaDocumentationStep from '../components/onboarding/VisaDocumentationStep';

const STEPS = [
  { title: 'Personal Information', key: 'personal' },
  { title: 'Travel Interests', key: 'interests' },
  { title: 'Dietary Preferences', key: 'dietary' },
  { title: 'Visa Documentation', key: 'visa' },
];

export default function OnboardingScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const { updateProfile } = useAuth();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    dateOfBirth: '',
    nationality: '',
    travelInterests: [],
    dietaryRestrictions: [],
    accommodationPreference: '',
    budgetRange: '',
    visaStatus: '',
    emergencyContact: '',
  });

  const updateFormData = (data) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return formData.fullName && formData.phone && formData.dateOfBirth && formData.nationality;
      case 1:
        return formData.travelInterests.length > 0 && formData.accommodationPreference && formData.budgetRange;
      case 2:
        return true; // Dietary restrictions are optional
      case 3:
        return formData.visaStatus && formData.emergencyContact;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (!validateCurrentStep()) {
      Alert.alert('Incomplete Information', 'Please fill in all required fields before continuing.');
      return;
    }

    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await updateProfile(formData);
      Alert.alert(
        'Profile Complete!', 
        'Welcome to TravelMate! Your profile has been created successfully.',
        [{ text: 'Continue' }]
      );
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <PersonalInfoStep
            data={formData}
            updateData={updateFormData}
          />
        );
      case 1:
        return (
          <TravelInterestsStep
            data={formData}
            updateData={updateFormData}
          />
        );
      case 2:
        return (
          <DietaryNeedsStep
            data={formData}
            updateData={updateFormData}
          />
        );
      case 3:
        return (
          <VisaDocumentationStep
            data={formData}
            updateData={updateFormData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <LinearGradient
      colors={['#4F46E5', '#7C3AED', '#EC4899']}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Complete Your Profile</Text>
        
        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          {STEPS.map((step, index) => (
            <View key={step.key} style={styles.progressItem}>
              <View style={[
                styles.progressDot,
                index <= currentStep && styles.progressDotActive,
                index < currentStep && styles.progressDotCompleted,
              ]}>
                {index < currentStep ? (
                  <Ionicons name="checkmark" size={12} color="#FFFFFF" />
                ) : (
                  <Text style={[
                    styles.progressDotText,
                    index <= currentStep && styles.progressDotTextActive,
                  ]}>
                    {index + 1}
                  </Text>
                )}
              </View>
              <Text style={[
                styles.progressLabel,
                index <= currentStep && styles.progressLabelActive,
              ]}>
                {step.title}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.stepContainer}>
          {renderStep()}
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.backButton, currentStep === 0 && styles.buttonDisabled]}
          onPress={handleBack}
          disabled={currentStep === 0}
        >
          <Ionicons name="chevron-back" size={20} color={currentStep === 0 ? '#9CA3AF' : '#374151'} />
          <Text style={[styles.backButtonText, currentStep === 0 && styles.buttonTextDisabled]}>
            Back
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.nextButton, loading && styles.buttonDisabled]}
          onPress={handleNext}
          disabled={loading || !validateCurrentStep()}
        >
          <Text style={styles.nextButtonText}>
            {loading ? 'Saving...' : currentStep === STEPS.length - 1 ? 'Complete' : 'Next'}
          </Text>
          {currentStep < STEPS.length - 1 && (
            <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />
          )}
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 32,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressItem: {
    flex: 1,
    alignItems: 'center',
  },
  progressDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressDotActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  progressDotCompleted: {
    backgroundColor: '#10B981',
  },
  progressDotText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  progressDotTextActive: {
    color: '#4F46E5',
  },
  progressLabel: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    lineHeight: 12,
  },
  progressLabelActive: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  content: {
    flex: 1,
  },
  stepContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    margin: 24,
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 16,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    marginHorizontal: 8,
  },
  backButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  nextButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginLeft: 4,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4F46E5',
    marginRight: 4,
  },
  buttonTextDisabled: {
    color: '#9CA3AF',
  },
});