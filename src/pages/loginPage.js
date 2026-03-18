// loginPage.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Pressable,
} from 'react-native';
import theme from '../constants/theme';

// ---------------------------------------------------------------------------
// Íconos SVG inline usando react-native-svg (asegúrate de tenerlo instalado)
// Si prefieres, reemplaza con tus propios íconos o una librería como @expo/vector-icons
// ---------------------------------------------------------------------------
import Svg, { Path, Circle, G, Rect } from 'react-native-svg';

const SitemarkLogo = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.35C17.5 22.15 21 17.25 21 12V6L12 2z" fill={theme.colors.brand} />
    <Path d="M9 12l2 2 4-4" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const GoogleIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24">
    <Path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <Path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <Path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
    <Path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </Svg>
);

const FacebookIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24">
    <Circle cx={12} cy={12} r={12} fill="#1877F2" />
    <Path d="M16.5 8H14c-.3 0-.5.2-.5.5V10H16l-.3 2H13.5v6H11v-6H9v-2h2V8.5C11 6.6 12.1 5.5 14 5.5h2.5V8z" fill="#fff" />
  </Svg>
);

// ---------------------------------------------------------------------------
// Componente principal
// ---------------------------------------------------------------------------
export default function LoginPage({ onLogin, onForgotPassword, onSignUp, onGoogleLogin, onFacebookLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const handleLogin = () => {
    if (onLogin) onLogin({ email, password, rememberMe });
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
            <SitemarkLogo />
            <Text style={styles.brandName}>Sitemark</Text>
          </View>

          {/* Título */}
          <Text style={styles.title}>Iniciar sesión</Text>

          {/* Campo Email */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Correo</Text>
            <TextInput
              style={[
                styles.input,
                emailFocused && styles.inputFocused,
              ]}
              placeholder="your@email.com"
              placeholderTextColor={theme.colors.textPlaceholder}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              onChangeText={setEmail}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
            />
          </View>

          {/* Campo Password */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Contraseña</Text>
            <TextInput
              style={[
                styles.input,
                passwordFocused && styles.inputFocused,
              ]}
              placeholder="••••••"
              placeholderTextColor={theme.colors.textPlaceholder}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
            />
          </View>

          {/* Remember me */}
          <TouchableOpacity
            style={styles.rememberRow}
            onPress={() => setRememberMe(!rememberMe)}
            activeOpacity={0.7}
          >
            <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
              {rememberMe && (
                <Svg width={10} height={10} viewBox="0 0 10 10">
                  <Path d="M1.5 5l2.5 2.5L8.5 2.5" stroke="#fff" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
                </Svg>
              )}
            </View>
            <Text style={styles.rememberText}>Recordar</Text>
          </TouchableOpacity>

          {/* Botón Sign in */}
          <TouchableOpacity
            style={styles.buttonPrimary}
            onPress={handleLogin}
            activeOpacity={0.85}
          >
            <Text style={styles.buttonPrimaryText}>Iniciar sesión</Text>
          </TouchableOpacity>

          {/* Forgot password */}
          <TouchableOpacity
            onPress={onForgotPassword}
            style={styles.forgotContainer}
            activeOpacity={0.7}
          >
            <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>

          {/* Divisor */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>o</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Sign in with Google */}
          <TouchableOpacity
            style={styles.buttonSocial}
            onPress={onGoogleLogin}
            activeOpacity={0.8}
          >
            <GoogleIcon />
            <Text style={styles.buttonSocialText}>Iniciar con Google</Text>
          </TouchableOpacity>

          {/* Sign in with Facebook */}
          <TouchableOpacity
            style={styles.buttonSocial}
            onPress={onFacebookLogin}
            activeOpacity={0.8}
          >
            <FacebookIcon />
            <Text style={styles.buttonSocialText}>Iniciar con Facebook</Text>
          </TouchableOpacity>

          {/* Sign up */}
          <View style={styles.signUpRow}>
            <Text style={styles.signUpText}>¿No tienes una cuenta? </Text>
            <TouchableOpacity onPress={onSignUp} activeOpacity={0.7}>
              <Text style={styles.signUpLink}>Registrate</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ---------------------------------------------------------------------------
// Estilos — usan theme.js para todos los colores y tokens
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
    marginBottom: theme.spacing.lg,
    letterSpacing: -0.5,
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
  inputFocused: {
    borderColor: theme.colors.inputBorderFocused,
    borderWidth: 1.5,
  },

  // Remember me
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: theme.borderRadius.sm,
    borderWidth: 1.5,
    borderColor: theme.colors.checkboxBorder,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.card,
  },
  checkboxChecked: {
    backgroundColor: theme.colors.checkboxChecked,
    borderColor: theme.colors.checkboxChecked,
  },
  rememberText: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.textSecondary,
    fontWeight: theme.fontWeights.regular,
  },

  // Botón primario
  buttonPrimary: {
    height: 50,
    backgroundColor: theme.colors.buttonPrimary,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.md,
    ...theme.shadows.button,
  },
  buttonPrimaryText: {
    color: theme.colors.buttonPrimaryText,
    fontSize: theme.fontSizes.md,
    fontWeight: theme.fontWeights.semibold,
    letterSpacing: 0.3,
  },

  // Forgot password
  forgotContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  forgotText: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.textLink,
    fontWeight: theme.fontWeights.medium,
    textDecorationLine: 'underline',
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
    fontWeight: theme.fontWeights.regular,
  },

  // Botones sociales
  buttonSocial: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.buttonSocialBorder,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.buttonSocial,
    marginBottom: theme.spacing.sm,
  },
  buttonSocialText: {
    fontSize: theme.fontSizes.sm,
    fontWeight: theme.fontWeights.medium,
    color: theme.colors.buttonSocialText,
  },

  // Sign up
  signUpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing.sm,
  },
  signUpText: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.textSecondary,
  },
  signUpLink: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.textLink,
    fontWeight: theme.fontWeights.semibold,
    textDecorationLine: 'underline',
  },
});