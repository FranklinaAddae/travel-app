import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen({ navigation }) {
  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
      }}
      style={styles.container}
      resizeMode="cover"
    >
      <LinearGradient
        colors={['rgba(0,0,0,0.6)', 'rgba(50,50,50,0.4)', 'rgba(0,0,0,0.2)']}
        style={styles.overlay}
      >
        <View style={styles.content}>
          {/* Travel Icons */}
          <View style={styles.iconContainer}>
            <View style={styles.iconWrapper}>
              <Ionicons name="airplane" size={35} color="#FFFFFF" />
            </View>
            <View style={[styles.iconWrapper, styles.iconOffset1]}>
              <Ionicons name="earth" size={25} color="#FFFFFF" />
            </View>
            <View style={[styles.iconWrapper, styles.iconOffset2]}>
              <Ionicons name="location" size={25} color="#FFFFFF" />
            </View>
          </View>

          {/* Title & Subtitle */}
          <View style={styles.textContainer}>
            <Text style={styles.title}>TravelMate</Text>
            <Text style={styles.subtitle}>
              Your personalized travel companion for unforgettable journeys
            </Text>
          </View>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.primaryButton]}
              onPress={() => navigation.navigate('Register')}
            >
              <Text style={styles.primaryButtonText}>Get Started</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.secondaryButton]}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.secondaryButtonText}>Sign In</Text>
            </TouchableOpacity>

            {/* Social Buttons */}
            <View style={styles.socialButtonsContainer}>
              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="logo-google" size={20} color="#FFFFFF" />
                <Text style={styles.socialButtonText}>Continue with Google</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="logo-apple" size={20} color="#FFFFFF" />
                <Text style={styles.socialButtonText}>Continue with Apple</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.disclaimer}>
              Google and Apple ID integration available in production build
            </Text>
          </View>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: height * 0.15,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 10,
    height: 120,
  },
  iconWrapper: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 50,
    padding: 25,
  },
  iconOffset1: {
    top: 30,
    left: -35,
    transform: [{ scale: 0.8 }],
  },
  iconOffset2: {
    top: 30,
    right: -30,
    transform: [{ scale: 0.9 }],
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 80,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.95)',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 50,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#FFFFFF',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.8)',
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4F46E5',
  },
  secondaryButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  socialButtonsContainer: {
    marginTop: 20,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    marginLeft: 12,
  },
  disclaimer: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    marginTop: 16,
    fontStyle: 'italic',
  },
});
