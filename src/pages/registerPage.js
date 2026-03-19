// registerPage.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../constants/theme';
import authService from '../services/authService';

// ---------------------------------------------------------------------------
// Componente principal
// ---------------------------------------------------------------------------
export default function RegisterPage({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmFocused, setConfirmFocused] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Enter a valid email.';
    if (!password) newErrors.password = 'Password is required.';
    else if (password.length < 6) newErrors.password = 'At least 6 characters.';
    if (!confirmPassword) newErrors.confirmPassword = 'Please confirm your password.';
    else if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleRegister = async () => {
    // 1. Validamos los campos primero
    if (validate()) {
      // 2. Llamamos al servicio con los datos reales del formulario
      const result = await authService.signUp(email, password, {
        // Aquí puedes agregar más campos si decides poner inputs de nombre o fono
        rol: 'cliente',
        fechaRegistro: new Date().toLocaleDateString(),
      });

      if (result.success) {
        alert("¡Cuenta creada con éxito!");
      } else {
        // Si hay error (ej: el correo ya existe), Firebase nos avisa
        alert("Error al registrar: " + result.error);
      }
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>

          {/* Logo + Marca */}
          <View style={styles.logoRow}>
            <MaterialCommunityIcons name="shield-check" size={26} color={theme.colors.brand} />
            <Text style={styles.brandName}>DuckIndustries</Text>
          </View>

          {/* Título */}
          <Text style={styles.title}>Crear cuenta</Text>
          <Text style={styles.subtitle}>Regístrate para empezar hoy mismo.</Text>

          {/* Campo Email */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Correo</Text>
            <TextInput
              style={[
                styles.input,
                emailFocused && styles.inputFocused,
                errors.email && styles.inputError,
              ]}
              placeholder="your@email.com"
              placeholderTextColor={theme.colors.textPlaceholder}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              onChangeText={(t) => { setEmail(t); setErrors((e) => ({ ...e, email: null })); }}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
            />
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
          </View>

          {/* Campo Password */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Contraseña</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={[
                  styles.inputWithIcon,
                  passwordFocused && styles.inputFocused,
                  errors.password && styles.inputError,
                ]}
                placeholder="••••••"
                placeholderTextColor={theme.colors.textPlaceholder}
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={(t) => { setPassword(t); setErrors((e) => ({ ...e, password: null })); }}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowPassword(!showPassword)}
                activeOpacity={0.7}
              >
                <MaterialCommunityIcons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color={theme.colors.textSecondary}
                />
              </TouchableOpacity>
            </View>
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
          </View>

          {/* Campo Confirmar Password */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Confirmar contraseña</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={[
                  styles.inputWithIcon,
                  confirmFocused && styles.inputFocused,
                  errors.confirmPassword && styles.inputError,
                ]}
                placeholder="••••••"
                placeholderTextColor={theme.colors.textPlaceholder}
                secureTextEntry={!showConfirm}
                value={confirmPassword}
                onChangeText={(t) => { setConfirmPassword(t); setErrors((e) => ({ ...e, confirmPassword: null })); }}
                onFocus={() => setConfirmFocused(true)}
                onBlur={() => setConfirmFocused(false)}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowConfirm(!showConfirm)}
                activeOpacity={0.7}
              >
                <MaterialCommunityIcons
                  name={showConfirm ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color={theme.colors.textSecondary}
                />
              </TouchableOpacity>
            </View>
            {errors.confirmPassword && (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            )}
          </View>

          {/* Botón Sign up */}
          <TouchableOpacity
            style={styles.buttonPrimary}
            onPress={handleRegister}
            activeOpacity={0.85}
          >
            <Text style={styles.buttonPrimaryText}>Registrarse</Text>
          </TouchableOpacity>

          {/* Divisor */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>o</Text>
            <View style={styles.dividerLine} />
          </View>

{/* Ya tienes cuenta */}
          <View style={styles.signInRow}>
            <Text style={styles.signInText}>¿Ya tienes una cuenta? </Text>
            {/* Cambiamos onBackToLogin por navigation.navigate('Login') */}
            <TouchableOpacity onPress={() => navigation.navigate('Login')} activeOpacity={0.7}>
              <Text style={styles.signInLink}>Iniciar sesión</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ---------------------------------------------------------------------------
// Estilos — consumen theme.js
// ---------------------------------------------------------------------------
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: theme.spacing.xl,
    paddingHorizontal: theme.spacing.md,
  },

  // Tarjeta
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    paddingTop: theme.spacing.xl,
    ...theme.shadows.card,
  },

  // Logo
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  brandName: {
    fontSize: theme.fontSizes.md,
    fontWeight: theme.fontWeights.semibold,
    color: theme.colors.textPrimary,
    letterSpacing: 0.2,
  },

  // Título
  title: {
    fontSize: theme.fontSizes.xxl,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.textPrimary,
    letterSpacing: -0.5,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.lg,
  },

  // Campos
  fieldGroup: {
    marginBottom: theme.spacing.md,
  },
  label: {
    fontSize: theme.fontSizes.sm,
    fontWeight: theme.fontWeights.medium,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: theme.colors.inputBorder,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    fontSize: theme.fontSizes.md,
    color: theme.colors.textPrimary,
    backgroundColor: theme.colors.inputBackground,
  },
  inputWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  inputWithIcon: {
    height: 48,
    borderWidth: 1,
    borderColor: theme.colors.inputBorder,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    paddingRight: 44,
    fontSize: theme.fontSizes.md,
    color: theme.colors.textPrimary,
    backgroundColor: theme.colors.inputBackground,
  },
  eyeButton: {
    position: 'absolute',
    right: theme.spacing.md,
    height: 48,
    justifyContent: 'center',
  },
  inputFocused: {
    borderColor: theme.colors.inputBorderFocused,
    borderWidth: 1.5,
  },
  inputError: {
    borderColor: theme.colors.error,
    borderWidth: 1.5,
  },
  errorText: {
    fontSize: theme.fontSizes.xs,
    color: theme.colors.error,
    marginTop: theme.spacing.xs,
  },

  // Botón primario
  buttonPrimary: {
    height: 50,
    backgroundColor: theme.colors.buttonPrimary,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.md,
    marginTop: theme.spacing.xs,
    ...theme.shadows.button,
  },
  buttonPrimaryText: {
    color: theme.colors.buttonPrimaryText,
    fontSize: theme.fontSizes.md,
    fontWeight: theme.fontWeights.semibold,
    letterSpacing: 0.3,
  },

  // Divisor
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.divider,
  },
  dividerText: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.dividerText,
  },

  // Sign in
  signInRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInText: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.textSecondary,
  },
  signInLink: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.textLink,
    fontWeight: theme.fontWeights.semibold,
    textDecorationLine: 'underline',
  },
});