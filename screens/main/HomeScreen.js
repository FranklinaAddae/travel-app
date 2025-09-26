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
import { useAuth } from '../../contexts/AuthContext';

export default function HomeScreen() {
  const { user } = useAuth();

  const featuredDestinations = [
    {
      id: 1,
      name: 'Santorini, Greece',
      image: 'https://rtwin30days.com/wp-content/uploads/2025/02/Amazing-Hotels-Santorini-Greece-1024x683.jpg',
      rating: 4.8,
      price: '$89/night',
    },
    {
      id: 2,
      name: 'Tokyo, Japan',
      image: 'https://images.pexels.com/photos/248195/pexels-photo-248195.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.9,
      price: '$125/night',
    },
    {
      id: 3,
      name: 'Bali, Indonesia',
      image: 'https://www.outlooktravelmag.com/media/bali-1-1679062958.profileImage.2x-scaled-webp.webp',
      rating: 4.7,
      price: '$99/night',
    },
    {
      id: 4,
      name: 'Paris, France',
      image: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.9,
      price: '$150/night',
    },
    {
      id: 5,
      name: 'Dubai, UAE',
      image: 'https://images.pexels.com/photos/1652353/pexels-photo-1652353.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.8,
      price: '$180/night',
    },
    {
      id: 6,
      name: 'Kyoto, Japan',
      image: 'https://www.hertz.com/content/dam/hertz/global/blog-articles/planning-a-trip/kyoto-japan/kyoto-header.rendition.medium.jpg',
      rating: 4.7,
      price: '$110/night',
    },
    {
      id: 7,
      name: 'New York City, USA',
      image: 'https://images.pexels.com/photos/313782/pexels-photo-313782.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.8,
      price: '$200/night',
    },
    {
      id: 8,
      name: 'Cape Town, South Africa',
      image: 'https://images.pexels.com/photos/259447/pexels-photo-259447.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.6,
      price: '$95/night',
    },
    {
      id: 9,
      name: 'Rome, Italy',
      image: 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.8,
      price: '$120/night',
    },
  ];

  // Helper component for the new stat cards
  const StatCard = ({ iconName, number, label, colors }) => {
    return (
      <LinearGradient
        colors={colors}
        style={styles.statCard}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Ionicons name={iconName} size={28} color="#FFFFFF" style={styles.statIcon} />
        <Text style={styles.statNumber}>{number}</Text>
        <Text style={styles.statLabel}>{label}</Text>
      </LinearGradient>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#4F46E5', '#7C3AED']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>Welcome back,</Text>
            <Text style={styles.userName}>{user?.profile?.fullName || 'Traveler'}!</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications" size={24} color="#FFFFFF" />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.actionIcon}>
                <Ionicons name="location" size={24} color="#4F46E5" />
              </View>
              <Text style={styles.actionText}>Find Trips</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.actionIcon}>
                <Ionicons name="calendar" size={24} color="#EC4899" />
              </View>
              <Text style={styles.actionText}>My Bookings</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.actionIcon}>
                <Ionicons name="camera" size={24} color="#10B981" />
              </View>
              <Text style={styles.actionText}>Memories</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.actionIcon}>
                <Ionicons name="trending-up" size={24} color="#F59E0B" />
              </View>
              <Text style={styles.actionText}>Trending</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Travel Stats - UPDATED SECTION */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Travel Journey</Text>
          <View style={styles.statsContainer}>
            <StatCard
              iconName="earth-sharp"
              number="0"
              label="Countries Visited"
              colors={['#4F46E5', '#7C3AED']}
            />
            <StatCard
              iconName="airplane-sharp"
              number="0"
              label="Trips Completed"
              colors={['#EC4899', '#F43F5E']}
            />
            <StatCard
              iconName="images-sharp"
              number="0"
              label="Photos Shared"
              colors={['#10B981', '#06B6D4']}
            />
          </View>
        </View>

        {/* Featured Destinations */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Destinations</Text>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>See All</Text>
              <Ionicons name="chevron-forward" size={16} color="#4F46E5" />
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.destinationsContainer}>
              {featuredDestinations.map((destination) => (
                <TouchableOpacity key={destination.id} style={styles.destinationCard}>
                  <Image
                    source={{ uri: destination.image }}
                    style={styles.destinationImage}
                  />
                  <View style={styles.destinationInfo}>
                    <Text style={styles.destinationName}>{destination.name}</Text>
                    <View style={styles.destinationDetails}>
                      <View style={styles.rating}>
                        <Ionicons name="star" size={12} color="#F59E0B" />
                        <Text style={styles.ratingText}>{destination.rating}</Text>
                      </View>
                      <Text style={styles.price}>{destination.price}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Recommendations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommended for You</Text>
          <View style={styles.recommendationCard}>
            <Text style={styles.recommendationTitle}>Based on your interests</Text>
            <Text style={styles.recommendationDescription}>
              {user?.profile?.travelInterests?.length > 0
                ? `We found amazing ${user.profile.travelInterests[0]} experiences just for you!`
                : 'Complete your profile to get personalized recommendations!'
              }
            </Text>
            <TouchableOpacity style={styles.recommendationButton}>
              <Text style={styles.recommendationButtonText}>Explore Now</Text>
            </TouchableOpacity>
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
  greeting: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 4,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    position: 'absolute',
    top: 8,
    right: 8,
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
    marginBottom: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 24,
    marginBottom: 15,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    fontSize: 14,
    color: '#4F46E5',
    fontWeight: '600',
    marginRight: 4,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    alignItems: 'center',
    flex: 1,
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  actionText: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '500',
    textAlign: 'center',
  },
  // START OF NEW STAT CARD STYLES
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: -6,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 12,
  },
  statIcon: {
    marginBottom: 10,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  statLabel: {
    fontSize: 13,
    color: '#E5E7EB',
    textAlign: 'center',
    fontWeight: '500',
  },
  // END OF NEW STAT CARD STYLES
  destinationsContainer: {
    flexDirection: 'row',
    paddingLeft: 0,
  },
  destinationCard: {
    width: 200,
    marginRight: 16,
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
  },
  destinationImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  destinationInfo: {
    padding: 16,
  },
  destinationName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  destinationDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
    fontWeight: '500',
  },
  price: {
    fontSize: 14,
    color: '#4F46E5',
    fontWeight: '600',
  },
  recommendationCard: {
    backgroundColor: '#EEF2FF',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  recommendationTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4F46E5',
    marginBottom: 8,
  },
  recommendationDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 16,
  },
  recommendationButton: {
    backgroundColor: '#4F46E5',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  recommendationButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});