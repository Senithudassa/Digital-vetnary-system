import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function ScannerScreen() {
    const [hasScanned, setHasScanned] = useState(false);

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
                            onPress={() => setHasScanned(true)}
                        >
                            <Text style={styles.primaryActionText}>Take Photo</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.secondaryActionBtn, { marginTop: 16 }]}>
                            <Text style={styles.secondaryActionText}>Upload from Gallery</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View>
                        <View style={styles.resultsCard}>
                            <View style={styles.resultsHeader}>
                                <Text style={styles.resultsTitle}>ANALYSIS COMPLETE</Text>
                                <IconSymbol name="checkmark.seal.fill" size={32} color="#2500fa" />
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
                                    <Text style={styles.severityLevelText}>MODERATE</Text>
                                </View>
                            </View>

                            <Text style={styles.diagnosisText}>
                                The AI has detected signs consistent with <Text style={{ fontWeight: '900' }}>Flea Allergy Dermatitis</Text>.
                                This is highly treatable but requires a veterinary consultation.
                            </Text>
                        </View>

                        <View style={styles.actionRow}>
                            <TouchableOpacity style={[styles.primaryActionBtn, { backgroundColor: '#D1FAE5', flex: 1, marginRight: 8 }]} onPress={() => setHasScanned(false)}>
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
        borderColor: '#2500fa',
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
