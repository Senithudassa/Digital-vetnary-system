import React, { useState } from 'react';
import {
    StyleSheet, View, Text, TextInput, TouchableOpacity,
    KeyboardAvoidingView, Platform, ActivityIndicator, ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { supabase } from '@/lib/supabase';

export default function RegisterScreen() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleRegister = async () => {
        if (!fullName || !email || !password) {
            setError('Name, email, and password are required.');
            return;
        }
        setError('');
        setLoading(true);

        try {
            // Pass user data in signUp metadata.
            // The DB trigger on auth.users reads raw_user_meta_data and creates
            // the profiles row automatically — this bypasses the RLS INSERT policy
            // which requires an active session (not yet available during signUp).
            const { error: signUpError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: fullName,
                        phone_number: phone || null,
                        role: 'customer',
                    },
                },
            });

            if (signUpError) throw signUpError;
            // AuthContext listener picks up the new session and routes to tabs
        } catch (err: any) {
            setError(err.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };


    return (
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView contentContainerStyle={styles.inner} keyboardShouldPersistTaps="handled">

                    <View style={styles.header}>
                        <Text style={styles.logo}>VetNary<Text style={styles.logoDot}>.io</Text></Text>
                        <Text style={styles.subtitle}>Create your free pet owner account.</Text>
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>CREATE ACCOUNT</Text>

                        {error ? (
                            <View style={styles.errorBox} accessibilityRole="alert">
                                <Text style={styles.errorText}>{error}</Text>
                            </View>
                        ) : null}

                        <View style={styles.field}>
                            <Text style={styles.label}>FULL NAME</Text>
                            <TextInput style={styles.input} placeholder="e.g. Senithu Silva" placeholderTextColor="#999"
                                value={fullName} onChangeText={setFullName} autoCorrect={false} 
                                textContentType="name" autoComplete="name" accessibilityLabel="Full name input field" />
                        </View>

                        <View style={styles.field}>
                            <Text style={styles.label}>EMAIL</Text>
                            <TextInput style={styles.input} placeholder="your@email.com" placeholderTextColor="#999"
                                value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" autoCorrect={false} 
                                textContentType="emailAddress" autoComplete="email" accessibilityLabel="Email input field" />
                        </View>

                        <View style={styles.field}>
                            <Text style={styles.label}>PHONE (OPTIONAL)</Text>
                            <TextInput style={styles.input} placeholder="07X XXX XXXX" placeholderTextColor="#999"
                                value={phone} onChangeText={setPhone} keyboardType="phone-pad" 
                                textContentType="telephoneNumber" autoComplete="tel" accessibilityLabel="Phone number input field" />
                        </View>

                        <View style={styles.field}>
                            <Text style={styles.label}>PASSWORD</Text>
                            <TextInput style={styles.input} placeholder="Min. 8 characters" placeholderTextColor="#999"
                                value={password} onChangeText={setPassword} secureTextEntry 
                                textContentType="newPassword" autoComplete="new-password" accessibilityLabel="Password input field" />
                        </View>

                        <TouchableOpacity
                            style={[styles.btn, loading && { opacity: 0.7 }]}
                            onPress={handleRegister}
                            disabled={loading}
                        >
                            {loading
                                ? <ActivityIndicator color="#fff" />
                                : <Text style={styles.btnText}>CREATE ACCOUNT</Text>
                            }
                        </TouchableOpacity>
                    </View>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Already have an account? </Text>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Text style={styles.footerLink}>Sign In</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FAF9F6' },
    inner: { flexGrow: 1, justifyContent: 'center', padding: 24 },
    header: { alignItems: 'center', marginBottom: 32 },
    logo: { fontSize: 40, fontWeight: '900', color: '#000', letterSpacing: -1 },
    logoDot: { color: '#818CF8' },
    subtitle: { fontSize: 16, fontWeight: '600', color: '#666', marginTop: 8, textAlign: 'center' },

    card: {
        backgroundColor: '#fff',
        borderWidth: 3,
        borderColor: '#000',
        borderRadius: 12,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 6, height: 6 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 6,
    },
    cardTitle: { fontSize: 24, fontWeight: '900', color: '#000', marginBottom: 20, letterSpacing: 0.5 },

    errorBox: {
        backgroundColor: '#FEE2E2',
        borderWidth: 2,
        borderColor: '#EF4444',
        padding: 12,
        borderRadius: 6,
        marginBottom: 16,
    },
    errorText: { color: '#B91C1C', fontWeight: '700', fontSize: 14 },

    field: { marginBottom: 16 },
    label: { fontSize: 12, fontWeight: '900', color: '#000', marginBottom: 8, letterSpacing: 0.5 },
    input: {
        borderWidth: 3,
        borderColor: '#000',
        borderRadius: 6,
        padding: 14,
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
        backgroundColor: '#FAF9F6',
    },

    btn: {
        backgroundColor: '#818CF8',
        borderWidth: 3,
        borderColor: '#000',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
        marginTop: 8,
        shadowColor: '#000',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 4,
    },
    btnText: { color: '#fff', fontSize: 16, fontWeight: '900', letterSpacing: 0.5 },

    footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 24 },
    footerText: { fontSize: 14, color: '#666', fontWeight: '600' },
    footerLink: { fontSize: 14, color: '#818CF8', fontWeight: '900' },
});
