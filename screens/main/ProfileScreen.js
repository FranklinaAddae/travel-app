import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/AuthContext';

export default function ProfileScreen() {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    fullName: user?.profile?.fullName || '',
    phone: user?.profile?.phone || '',
    nationality: user?.profile?.nationality || '',
    emergencyContact: user?.profile?.emergencyContact || '',
  });

  const handleSaveProfile = async () => {
    try {
      await updateProfile(editForm);
      setIsEditing(false);
      Alert.alert('Success', 'Profile updated successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile. Please try again.');
    }
  };

  const handleCancelEdit = () => {
    setEditForm({
      fullName: user?.profile?.fullName || '',
      phone: user?.profile?.phone || '',
      nationality: user?.profile?.nationality || '',
      emergencyContact: user?.profile?.emergencyContact || '',
    });
    setIsEditing(false);
  };

  const formatTravelInterests = (interests) => {
    if (!interests || interests.length === 0) return 'No interests selected';
    return interests.map(interest => {
      return interest.charAt(0).toUpperCase() + interest.slice(1).replace('-', ' ');
    }).join(', ');
  };

  const formatDietaryRestrictions = (restrictions) => {
    if (!restrictions || restrictions.length === 0) return 'No dietary restrictions';
    return restrictions.map(restriction => {
      return restriction.charAt(0).toUpperCase() + restriction.slice(1).replace('-', ' ');
    }).join(', ');
  };

  const formatBudgetRange = (budget) => {
    const budgetMap = {
      'budget': '$0-50/day',
      'mid-range': '$51-150/day',
      'luxury': '$151-300/day',
      'ultra-luxury': '$300+/day',
    };
    return budget ? budgetMap[budget] || budget : 'Not specified';
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#4F46E5', '#7C3AED']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>My Profile</Text>
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => isEditing ? handleCancelEdit() : setIsEditing(true)}
          >
            <Ionicons 
              name={isEditing ? 'close' : 'create'} 
              size={24} 
              color="#FFFFFF" 
            />
          </TouchableOpacity>
        </View>
        
        <View style={styles.profileSummary}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={32} color="#FFFFFF" />
          </View>
          <Text style={styles.profileName}>
            {user?.profile?.fullName || 'Your Name'}
          </Text>
          <Text style={styles.profileEmail}>{user?.email}</Text>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Personal Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Ionicons name="person" size={20} color="#4F46E5" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Full Name</Text>
                {isEditing ? (
                  <TextInput
                    style={styles.editInput}
                    value={editForm.fullName}
                    onChangeText={(text) => setEditForm({...editForm, fullName: text})}
                    placeholder="Enter your full name"
                  />
                ) : (
                  <Text style={styles.infoValue}>
                    {user?.profile?.fullName || 'Not provided'}
                  </Text>
                )}
              </View>
            </View>
            
            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Ionicons name="mail" size={20} color="#4F46E5" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Email</Text>
                <Text style={styles.infoValue}>{user?.email}</Text>
              </View>
            </View>
            
            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Ionicons name="call" size={20} color="#4F46E5" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Phone</Text>
                {isEditing ? (
                  <TextInput
                    style={styles.editInput}
                    value={editForm.phone}
                    onChangeText={(text) => setEditForm({...editForm, phone: text})}
                    placeholder="Enter your phone number"
                    keyboardType="phone-pad"
                  />
                ) : (
                  <Text style={styles.infoValue}>
                    {user?.profile?.phone || 'Not provided'}
                  </Text>
                )}
              </View>
            </View>
            
            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Ionicons name="location" size={20} color="#4F46E5" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Nationality</Text>
                {isEditing ? (
                  <TextInput
                    style={styles.editInput}
                    value={editForm.nationality}
                    onChangeText={(text) => setEditForm({...editForm, nationality: text})}
                    placeholder="Enter your nationality"
                  />
                ) : (
                  <Text style={styles.infoValue}>
                    {user?.profile?.nationality || 'Not provided'}
                  </Text>
                )}
              </View>
            </View>
            
            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Ionicons name="calendar" size={20} color="#4F46E5" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Date of Birth</Text>
                <Text style={styles.infoValue}>
                  {user?.profile?.dateOfBirth || 'Not provided'}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Travel Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Travel Preferences</Text>
          
          <View style={styles.preferenceCard}>
            <View style={styles.preferenceHeader}>
              <Ionicons name="heart" size={20} color="#EC4899" />
              <Text style={styles.preferenceTitle}>Travel Interests</Text>
            </View>
            <Text style={styles.preferenceValue}>
              {formatTravelInterests(user?.profile?.travelInterests)}
            </Text>
          </View>
          
          <View style={styles.preferenceCard}>
            <View style={styles.preferenceHeader}>
              <Text style={styles.preferenceIcon}>🍽️</Text>
              <Text style={styles.preferenceTitle}>Dietary Restrictions</Text>
            </View>
            <Text style={styles.preferenceValue}>
              {formatDietaryRestrictions(user?.profile?.dietaryRestrictions)}
            </Text>
          </View>
          
          <View style={styles.preferenceCard}>
            <View style={styles.preferenceHeader}>
              <Text style={styles.preferenceIcon}>💰</Text>
              <Text style={styles.preferenceTitle}>Budget Range</Text>
            </View>
            <Text style={styles.preferenceValue}>
              {formatBudgetRange(user?.profile?.budgetRange)}
            </Text>
          </View>
          
          <View style={styles.preferenceCard}>
            <View style={styles.preferenceHeader}>
              <Text style={styles.preferenceIcon}>🏨</Text>
              <Text style={styles.preferenceTitle}>Accommodation Preference</Text>
            </View>
            <Text style={styles.preferenceValue}>
              {user?.profile?.accommodationPreference 
                ? user.profile.accommodationPreference.charAt(0).toUpperCase() + 
                  user.profile.accommodationPreference.slice(1).replace('-', ' ')
                : 'Not specified'
              }
            </Text>
          </View>
        </View>

        {/* Emergency Contact */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Emergency Contact</Text>
          
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Ionicons name="call" size={20} color="#EF4444" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Emergency Contact</Text>
                {isEditing ? (
                  <TextInput
                    style={styles.editInput}
                    value={editForm.emergencyContact}
                    onChangeText={(text) => setEditForm({...editForm, emergencyContact: text})}
                    placeholder="Name and phone number"
                    multiline
                  />
                ) : (
                  <Text style={styles.infoValue}>
                    {user?.profile?.emergencyContact || 'Not provided'}
                  </Text>
                )}
              </View>
            </View>
          </View>
        </View>

        {isEditing && (
          <View style={styles.editActions}>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSaveProfile}
            >
              <Ionicons name="save" size={20} color="#FFFFFF" />
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
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
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  editButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileSummary: {
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  content: {
    flex: 1,
    marginTop: -20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: '#FFFFFF',
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 24,
    marginBottom: 16,
  },
  infoCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  infoIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '500',
  },
  editInput: {
    fontSize: 16,
    color: '#111827',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
  },
  preferenceCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  preferenceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  preferenceIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  preferenceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  preferenceValue: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginLeft: 32,
  },
  editActions: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4F46E5',
    borderRadius: 12,
    paddingVertical: 16,
    shadowColor: '#4F46E5',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 8,
  },
});