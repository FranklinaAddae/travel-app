import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function TripsScreen() {
  const upcomingTrips = [
    {
      id: 1,
      destination: 'Paris, France',
      image: 'https://arzotravels.com/wp-content/uploads/2017/10/the-best-city-to-see-at-night-is-Paris.jpg',
      dates: 'Mar 15 - Mar 22, 2024',
      status: 'upcoming',
      travelers: 2,
    },
  ];

  const pastTrips = [
    {
      id: 2,
      destination: 'New York City, USA',
      image: 'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=800',
      dates: 'Dec 10 - Dec 15, 2023',
      status: 'completed',
      travelers: 1,
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#4F46E5', '#7C3AED']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>My Trips</Text>
          <TouchableOpacity style={styles.addButton}>
            <Ionicons name="add" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Upcoming Trips */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Trips</Text>
          {upcomingTrips.length > 0 ? (
            upcomingTrips.map((trip) => (
              <TouchableOpacity key={trip.id} style={styles.tripCard}>
                <Image source={{ uri: trip.image }} style={styles.tripImage} />
                <View style={styles.tripOverlay}>
                  <View style={styles.tripStatus}>
                    <Ionicons name="time" size={12} color="#FFFFFF" />
                    <Text style={styles.tripStatusText}>Upcoming</Text>
                  </View>
                </View>
                <View style={styles.tripInfo}>
                  <View style={styles.tripHeader}>
                    <Text style={styles.tripDestination}>{trip.destination}</Text>
                    <View style={styles.travelersInfo}>
                      <Ionicons name="people" size={16} color="#6B7280" />
                      <Text style={styles.travelersText}>{trip.travelers}</Text>
                    </View>
                  </View>
                  <View style={styles.tripDetails}>
                    <View style={styles.tripDetailItem}>
                      <Ionicons name="calendar" size={14} color="#6B7280" />
                      <Text style={styles.tripDetailText}>{trip.dates}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="airplane" size={48} color="#9CA3AF" />
              <Text style={styles.emptyTitle}>No upcoming trips</Text>
              <Text style={styles.emptyDescription}>
                Start planning your next adventure!
              </Text>
              <TouchableOpacity style={styles.planTripButton}>
                <Text style={styles.planTripButtonText}>Plan a Trip</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Past Trips */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Past Trips</Text>
          {pastTrips.length > 0 ? (
            pastTrips.map((trip) => (
              <TouchableOpacity key={trip.id} style={styles.tripCard}>
                <Image source={{ uri: trip.image }} style={styles.tripImage} />
                <View style={styles.tripOverlay}>
                  <View style={[styles.tripStatus, styles.completedStatus]}>
                    <Ionicons name="location" size={12} color="#FFFFFF" />
                    <Text style={styles.tripStatusText}>Completed</Text>
                  </View>
                </View>
                <View style={styles.tripInfo}>
                  <View style={styles.tripHeader}>
                    <Text style={styles.tripDestination}>{trip.destination}</Text>
                    <View style={styles.travelersInfo}>
                      <Ionicons name="people" size={16} color="#6B7280" />
                      <Text style={styles.travelersText}>{trip.travelers}</Text>
                    </View>
                  </View>
                  <View style={styles.tripDetails}>
                    <View style={styles.tripDetailItem}>
                      <Ionicons name="calendar" size={14} color="#6B7280" />
                      <Text style={styles.tripDetailText}>{trip.dates}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="location" size={48} color="#9CA3AF" />
              <Text style={styles.emptyTitle}>No past trips</Text>
              <Text style={styles.emptyDescription}>
                Your completed trips will appear here
              </Text>
            </View>
          )}
        </View>

        {/* Trip Planning Tips */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Planning Tips</Text>
          <View style={styles.tipsContainer}>
            <View style={styles.tipCard}>
              <Text style={styles.tipTitle}>📋 Create Itineraries</Text>
              <Text style={styles.tipDescription}>
                Plan your daily activities and make the most of your trip
              </Text>
            </View>
            <View style={styles.tipCard}>
              <Text style={styles.tipTitle}>💰 Budget Tracking</Text>
              <Text style={styles.tipDescription}>
                Keep track of your expenses and stay within budget
              </Text>
            </View>
            <View style={styles.tipCard}>
              <Text style={styles.tipTitle}>📱 Offline Maps</Text>
              <Text style={styles.tipDescription}>
                Download maps for offline access during your travels
              </Text>
            </View>
          </View>
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
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    marginTop: -16,
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
  tripCard: {
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
    marginBottom: 16,
    overflow: 'hidden',
  },
  tripImage: {
    width: '100%',
    height: 160,
  },
  tripOverlay: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  tripStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(79, 70, 229, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  completedStatus: {
    backgroundColor: 'rgba(16, 185, 129, 0.9)',
  },
  tripStatusText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 4,
  },
  tripInfo: {
    padding: 16,
  },
  tripHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  tripDestination: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
  },
  travelersInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  travelersText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
    fontWeight: '500',
  },
  tripDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tripDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  tripDetailText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 6,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
    paddingHorizontal: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#374151',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  planTripButton: {
    backgroundColor: '#4F46E5',
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  planTripButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  tipsContainer: {
    gap: 16,
  },
  tipCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#4F46E5',
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  tipDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
});