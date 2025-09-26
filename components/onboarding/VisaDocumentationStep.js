import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const VISA_STATUS_OPTIONS = [
  { id: 'us-citizen', label: 'US Citizen' },
  { id: 'permanent-resident', label: 'US Permanent Resident' },
  { id: 'student-visa', label: 'Student Visa (F-1/M-1)' },
  { id: 'work-visa', label: 'Work Visa (H-1B/L-1/O-1)' },
  { id: 'tourist-visa', label: 'Tourist Visa (B-1/B-2)' },
  { id: 'other', label: 'Other Visa Status' },
  { id: 'no-visa', label: 'No US Visa Required' },
];

export default function VisaDocumentationStep({ data, updateData }) {
  const handleMockUpload = () => {
    Alert.alert(
      'Document Upload',
      'In a production app, this would open a document picker to upload passport/visa documents. For this demo, we\'ll simulate a successful upload.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Simulate Upload', onPress: () => {
          Alert.alert('Success', 'Document uploaded successfully! (Mock)');
        }}
      ]
    );
  };

  return (
    <View>
      <Text style={styles.stepTitle}>Visa & Emergency Information</Text>
      <Text style={styles.stepDescription}>
        Help us understand your travel documentation status and provide emergency contact information for your safety.
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Visa Status *</Text>
        <Text style={styles.sectionSubtitle}>
          Select your current visa/citizenship status:
        </Text>
        
        <View style={styles.optionsContainer}>
          {VISA_STATUS_OPTIONS.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.optionButton,
                data.visaStatus === option.id && styles.optionButtonSelected
              ]}
              onPress={() => updateData({ visaStatus: option.id })}
            >
              <View style={styles.optionContent}>
                <Ionicons 
                  name="document-text"
                  size={20} 
                  color={data.visaStatus === option.id ? '#FFFFFF' : '#6B7280'} 
                />
                <Text style={[
                  styles.optionText,
                  data.visaStatus === option.id && styles.optionTextSelected
                ]}>
                  {option.label}
                </Text>
              </View>
              
              <View style={[
                styles.radio,
                data.visaStatus === option.id && styles.radioSelected
              ]}>
                {data.visaStatus === option.id && <View style={styles.radioDot} />}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Document Upload (Mock)</Text>
        <Text style={styles.sectionSubtitle}>
          Upload a copy of your passport or relevant travel documents
        </Text>
        
        <TouchableOpacity style={styles.uploadButton} onPress={handleMockUpload}>
          <Ionicons name="cloud-upload" size={24} color="#4F46E5" />
          <View style={styles.uploadContent}>
            <Text style={styles.uploadTitle}>Upload Documents</Text>
            <Text style={styles.uploadSubtitle}>
              Passport, Visa, or ID (JPG, PNG, PDF)
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.securityNote}>
          <Ionicons name="shield-checkmark" size={16} color="#059669" />
          <Text style={styles.securityText}>
            Your documents are encrypted and stored securely
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Emergency Contact *</Text>
        <Text style={styles.sectionSubtitle}>
          Provide a trusted contact in case of emergency during travel
        </Text>
        
        <View style={styles.inputContainer}>
          <Ionicons name="call" size={20} color="#6B7280" />
          <TextInput
            style={styles.input}
            value={data.emergencyContact}
            onChangeText={(text) => updateData({ emergencyContact: text })}
            placeholder="Name and phone number (e.g., John Doe - +1-555-0123)"
            placeholderTextColor="#9CA3AF"
            multiline={true}
            numberOfLines={2}
          />
        </View>
      </View>

      <View style={styles.warningBox}>
        <Ionicons name="warning" size={20} color="#DC2626" />
        <View style={styles.warningContent}>
          <Text style={styles.warningTitle}>Important Notice</Text>
          <Text style={styles.warningText}>
            Ensure your travel documents are valid for at least 6 months beyond your planned travel dates. Check visa requirements for your destination countries.
          </Text>
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
    lineHeight: 20,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F9FAFB',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
  },
  optionButtonSelected: {
    backgroundColor: '#4F46E5',
    borderColor: '#4F46E5',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionText: {
    fontSize: 16,
    color: '#374151',
    marginLeft: 12,
    fontWeight: '500',
  },
  optionTextSelected: {
    color: '#FFFFFF',
  },
  radio: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: '#FFFFFF',
  },
  radioDot: {
    width: 10,
    height: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F9FF',
    borderWidth: 2,
    borderColor: '#BAE6FD',
    borderRadius: 12,
    padding: 20,
    borderStyle: 'dashed',
  },
  uploadContent: {
    marginLeft: 16,
    flex: 1,
  },
  uploadTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4F46E5',
    marginBottom: 4,
  },
  uploadSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  securityNote: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#BBF7D0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 12,
  },
  securityText: {
    fontSize: 12,
    color: '#059669',
    marginLeft: 8,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
    marginLeft: 12,
    textAlignVertical: 'top',
  },
  warningBox: {
    flexDirection: 'row',
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: 12,
    padding: 16,
  },
  warningContent: {
    marginLeft: 12,
    flex: 1,
  },
  warningTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#DC2626',
    marginBottom: 4,
  },
  warningText: {
    fontSize: 12,
    color: '#991B1B',
    lineHeight: 18,
  },
});