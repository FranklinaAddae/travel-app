import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { Ionicons, AntDesign } from '@expo/vector-icons';

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>
        Join us and set your travel preferences 🌍
      </Text>

      <TextInput
        label="Full Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        mode="outlined"
        secureTextEntry
      />
      <TextInput
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={styles.input}
        mode="outlined"
        secureTextEntry
      />

      <Button
        mode="contained"
        onPress={() => console.log('Signup pressed')}
        style={styles.signupButton}
      >
        Sign Up
      </Button>

      <Text style={styles.orText}>or sign up with</Text>

      <View style={styles.socialRow}>
        <Button
          mode="outlined"
          icon={() => <AntDesign name="google" size={20} color="#DB4437" />}
          style={styles.socialButton}
          onPress={() => console.log('Google Signup')}
        >
          Google
        </Button>
        <Button
          mode="outlined"
          icon={() => <Ionicons name="logo-apple" size={20} color="#000" />}
          style={styles.socialButton}
          onPress={() => console.log('Apple Signup')}
        >
          Apple
        </Button>
      </View>

      <Text style={styles.loginText}>
        Already have an account?{' '}
        <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
          Log in
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f9fafb',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 6,
    color: '#1e293b',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#64748b',
  },
  input: {
    marginBottom: 12,
  },
  signupButton: {
    marginTop: 8,
    paddingVertical: 6,
  },
  orText: {
    textAlign: 'center',
    marginVertical: 14,
    color: '#94a3b8',
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  socialButton: {
    marginHorizontal: 5,
  },
  loginText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#475569',
  },
  link: {
    color: '#2563eb',
    fontWeight: 'bold',
  },
});
