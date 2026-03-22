import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import { usePets } from '@/hooks/usePets';

// Simulated AI result until the model endpoint is live
const MOCK_RESULT = {
    diagnosis: 'Flea Allergy Dermatitis',
    confidence: 0.78,
    severity: 'medium' as const,
};

export default function ScannerScreen() {
    const { user } = useAuth();
    const { pets } = usePets();
    const [hasScanned, setHasScanned] = useState(false);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    const handleScan = () => {
        // In production: open camera/gallery and upload image to Supabase Storage
        // For now, simulate a scan and proceed to the result screen
        setHasScanned(true);
        setSaved(false);
    };

    const handleSaveResult = async () => {
        if (!user) { Alert.alert('Error', 'Please log in first.'); return; }
        if (pets.length === 0) { Alert.alert('No Pets', 'Add a pet first before saving a scan.'); return; }

        setSaving(true);
        // Save the scan result to Supabase — using first pet for now
        const { error } = await supabase.from('skin_scans').insert({
            pet_id: pets[0].id,
            scanned_by: user.id,
            image_url: 'placeholder://scan', // real URL comes from Storage upload
            ai_result: MOCK_RESULT.diagnosis,
            confidence_score: MOCK_RESULT.confidence,
            severity: MOCK_RESULT.severity,
            vet_reviewed: false,
        });

        setSaving(false);
        if (error) {
            Alert.alert('Save Failed', error.message);
        } else {
            setSaved(true);
            Alert.alert('Saved', 'Scan result saved to your pet\'s record!');
        }
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>

            <View style={styles.headerBlock}>
                <Text style={styles.headerTitle}>AI SKIN SCANNER</Text>
                <Text style={styles.headerSubtitle}>Upload a photo of your pet's rash or skin issue for an instant AI assessment.</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {!hasScanned ? (
                    <View style={styles.uploadCard}>
                        <View style={styles.cameraGraphic}>
                            <IconSymbol name="camera.viewfinder" size={80} color="#000" />
                        </View>
                        <TouchableOpacity
                            style={[styles.primaryActionBtn, { backgroundColor: '#FFEDD5' }]}
                            onPress={handleScan}
                        >
                            <Text style={styles.primaryActionText}>Take Photo</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.secondaryActionBtn, { marginTop: 16 }]} onPress={handleScan}>
                            <Text style={styles.secondaryActionText}>Upload from Gallery</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View>
                        <View style={styles.resultsCard}>
                            <View style={styles.resultsHeader}>
                                <Text style={styles.resultsTitle}>ANALYSIS COMPLETE</Text>
                                <IconSymbol name="checkmark.seal.fill" size={32} color="#818CF8" />
                            </View>

                            <View style={styles.imagePreviewBox}>
                                <View style={styles.mockImage} />
                                <View style={styles.scanOverlay}>
                                    <View style={styles.scanTarget} />
                                </View>
                            </View>

                            <View style={styles.severityBlock}>
                                <Text style={styles.severityLabel}>Risk Level</Text>
                                <View style={styles.severityBadge}>
                                    <Text style={styles.severityLevelText}>{MOCK_RESULT.severity.toUpperCase()}</Text>
                                </View>
                            </View>

                            <Text style={styles.diagnosisText}>
                                The AI has detected signs consistent with <Text style={{ fontWeight: '900' }}>{MOCK_RESULT.diagnosis}</Text>.
                                This is highly treatable but requires a veterinary consultation.
                            </Text>

                            {/* Save to Record button */}
                            <TouchableOpacity
                                style={[styles.primaryActionBtn, { backgroundColor: saved ? '#D1FAE5' : '#FEF08A', marginTop: 20 }]}
                                onPress={handleSaveResult}
                                disabled={saving || saved}
                            >
                                {saving
                                    ? <ActivityIndicator color="#000" />
                                    : <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                                        {saved && <IconSymbol name="checkmark" size={18} color="#000" />}
                                        <Text style={styles.primaryActionText}>{saved ? 'Saved to Record' : 'Save to Pet Record'}</Text>
                                      </View>
                                }
                            </TouchableOpacity>
                        </View>

                        <View style={styles.actionRow}>
                            <TouchableOpacity style={[styles.primaryActionBtn, { backgroundColor: '#D1FAE5', flex: 1, marginRight: 8 }]} onPress={() => { setHasScanned(false); setSaved(false); }}>
                                <Text style={styles.primaryActionText}>Scan Again</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.primaryActionBtn, { backgroundColor: '#FEF08A', flex: 1 }]}>
                                <Text style={styles.primaryActionText}>Book Vet</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

                <View style={styles.disclaimerBlock}>
                    <IconSymbol name="exclamationmark.triangle.fill" size={24} color="#ffbe0a" style={{ marginRight: 12 }} />
                    <Text style={styles.disclaimerText}>
                        This AI tool is for preliminary guidance only and does not replace professional veterinary diagnosis.
                    </Text>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAF9F6',
    },
    headerBlock: {
        padding: 20,
        marginBottom: 10,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '900',
        color: '#000',
        letterSpacing: -0.5,
        marginBottom: 8,
    },
    headerSubtitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#666',
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },

    uploadCard: {
        backgroundColor: '#ffb3ba', // Pastel pink
        borderWidth: 4,
        borderColor: '#000',
        padding: 32,
        alignItems: 'center',
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 6, height: 6 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 5,
    },
    cameraGraphic: {
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: '#fff',
        borderWidth: 4,
        borderColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 32,
        borderStyle: 'dashed',
    },

    primaryActionBtn: {
        width: '100%',
        backgroundColor: '#fff',
        borderWidth: 3,
        borderColor: '#000',
        paddingVertical: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 4,
    },
    primaryActionText: {
        fontSize: 16,
        fontWeight: '900',
        color: '#000',
        textTransform: 'uppercase',
    },
    secondaryActionBtn: {
        width: '100%',
        backgroundColor: 'transparent',
        borderWidth: 3,
        borderColor: '#000',
        paddingVertical: 16,
        alignItems: 'center',
    },
    secondaryActionText: {
        fontSize: 16,
        fontWeight: '900',
        color: '#000',
    },

    resultsCard: {
        backgroundColor: '#fff',
        borderWidth: 4,
        borderColor: '#000',
        padding: 20,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 6, height: 6 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 5,
    },
    resultsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        borderBottomWidth: 3,
        borderColor: '#000',
        paddingBottom: 12,
    },
    resultsTitle: {
        fontSize: 20,
        fontWeight: '900',
        color: '#000',
    },
    imagePreviewBox: {
        width: '100%',
        height: 200,
        backgroundColor: '#e8e8e8',
        borderWidth: 3,
        borderColor: '#000',
        marginBottom: 20,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mockImage: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#D1FAE5',
    },
    scanOverlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scanTarget: {
        width: 60,
        height: 60,
        borderWidth: 4,
        borderColor: '#818CF8',
        borderRadius: 8,
    },
    severityBlock: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    severityLabel: {
        fontSize: 16,
        fontWeight: '900',
        color: '#000',
        marginRight: 12,
    },
    severityBadge: {
        backgroundColor: '#ffbe0a',
        borderWidth: 2,
        borderColor: '#000',
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    severityLevelText: {
        fontSize: 14,
        fontWeight: '900',
        color: '#000',
    },
    diagnosisText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#222',
        lineHeight: 24,
    },

    actionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 32,
    },

    disclaimerBlock: {
        flexDirection: 'row',
        backgroundColor: '#000',
        padding: 16,
        alignItems: 'center',
    },
    disclaimerText: {
        flex: 1,
        fontSize: 12,
        fontWeight: '700',
        color: '#fff',
        lineHeight: 18,
    },
});
