import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { Ionicons, AntDesign } from '@expo/vector-icons';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Login to continue your journey ✈️</Text>

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

      <Button
        mode="contained"
        onPress={() => console.log('Login pressed')}
        style={styles.loginButton}
      >
        Login
      </Button>

      <Text style={styles.orText}>or continue with</Text>

      <View style={styles.socialRow}>
        <Button
          mode="outlined"
          icon={() => <AntDesign name="google" size={20} color="#DB4437" />}
          style={styles.socialButton}
          onPress={() => console.log('Google Login')}
        >
          Google
        </Button>
        <Button
          mode="outlined"
          icon={() => <Ionicons name="logo-apple" size={20} color="#000" />}
          style={styles.socialButton}
          onPress={() => console.log('Apple Login')}
        >
          Apple
        </Button>
      </View>

      <Text style={styles.signupText}>
        Don’t have an account?{' '}
        <Text style={styles.link} onPress={() => navigation.navigate('Signup')}>
          Sign up
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
  loginButton: {
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
  signupText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#475569',
  },
  link: {
    color: '#2563eb',
    fontWeight: 'bold',
  },
});
