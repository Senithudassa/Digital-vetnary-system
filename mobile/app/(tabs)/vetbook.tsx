import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function VetbookScreen() {
    const records = [
        { id: 1, date: '04 Jan 2026', type: 'Vaccination', vet: 'Dr. Silva', clinic: 'River Edge', status: 'Completed', color: '#D1FAE5' },
        { id: 2, date: '15 Nov 2025', type: 'Checkup', vet: 'Dr. Perera', clinic: 'Pet Care Center', status: 'Completed', color: '#DBEAFE' },
        { id: 3, date: '10 Aug 2025', type: 'Surgery', vet: 'Dr. Silva', clinic: 'River Edge', status: 'Requires Follow-up', color: '#FFEDD5' },
    ];

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.greeting}>DIGITAL VETBOOK</Text>
                        <Text style={styles.subtitle}>Medical History & Records</Text>
                    </View>
                </View>

                {/* Pet Selector (Simplified) */}
                <View style={styles.petSelectorBlock}>
                    <Text style={styles.selectorLabel}>CURRENT RECORD:</Text>
                    <TouchableOpacity style={styles.selectorDropdown}>
                        <Text style={styles.selectorText}>Max (Golden Retriever)</Text>
                        <IconSymbol name="chevron.down" size={20} color="#000" />
                    </TouchableOpacity>
                </View>

                {/* Action Row */}
                <View style={styles.actionRow}>
                    <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#FEF08A' }]}>
                        <IconSymbol name="arrow.down.doc.fill" size={24} color="#000" style={{ marginBottom: 8 }} />
                        <Text style={styles.actionBtnText}>Export PDF</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#FCE7F3' }]}>
                        <IconSymbol name="doc.text.magnifyingglass" size={24} color="#000" style={{ marginBottom: 8 }} />
                        <Text style={styles.actionBtnText}>Filter</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.sectionTitle}>TIMELINE</Text>

                {/* Timeline Records */}
                <View style={styles.timelineContainer}>
                    {records.map((record, index) => (
                        <View key={record.id} style={styles.timelineRow}>
                            {/* Timeline Line & Dot */}
                            <View style={styles.timelineGraphic}>
                                <View style={styles.timelineDot} />
                                {index !== records.length - 1 && <View style={styles.timelineLine} />}
                            </View>

                            {/* Record Card */}
                            <TouchableOpacity style={[styles.recordCard, { backgroundColor: record.color }]}>
                                <View style={styles.recordHeader}>
                                    <Text style={styles.recordDate}>{record.date}</Text>
                                    <View style={styles.statusBadge}>
                                        <Text style={styles.statusText}>{record.status}</Text>
                                    </View>
                                </View>

                                <Text style={styles.recordType}>{record.type}</Text>

                                <View style={styles.recordDetails}>
                                    <View style={styles.detailRow}>
                                        <IconSymbol name="person.crop.circle" size={14} color="#444" style={styles.detailIcon} />
                                        <Text style={styles.detailText}>{record.vet}</Text>
                                    </View>
                                    <View style={styles.detailRow}>
                                        <IconSymbol name="building.2.fill" size={14} color="#444" style={styles.detailIcon} />
                                        <Text style={styles.detailText}>{record.clinic}</Text>
                                    </View>
                                </View>

                                <View style={styles.viewNotesBtn}>
                                    <Text style={styles.viewNotesText}>View Details</Text>
                                    <IconSymbol name="chevron.right" size={16} color="#000" />
                                </View>
                            </TouchableOpacity>
                        </View>
                    ))}
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
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
    header: {
        marginBottom: 24,
        marginTop: 10,
    },
    greeting: {
        fontSize: 28,
        fontWeight: '900',
        color: '#000',
        letterSpacing: -0.5,
    },
    subtitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#666',
        marginTop: 4,
    },

    petSelectorBlock: {
        backgroundColor: '#fff',
        borderWidth: 3,
        borderColor: '#000',
        padding: 16,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 4,
    },
    selectorLabel: {
        fontSize: 12,
        fontWeight: '800',
        color: '#000',
        marginBottom: 8,
    },
    selectorDropdown: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#000',
        padding: 12,
        backgroundColor: '#fff',
    },
    selectorText: {
        fontSize: 16,
        fontWeight: '800',
        color: '#2500fa',
    },

    actionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 32,
    },
    actionBtn: {
        flex: 1,
        height: 90,
        marginHorizontal: 4,
        borderWidth: 3,
        borderColor: '#000',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 4,
    },
    actionBtnText: {
        fontWeight: '800',
        fontSize: 14,
        color: '#000',
    },

    sectionTitle: {
        fontSize: 20,
        fontWeight: '900',
        color: '#000',
        marginBottom: 16,
        letterSpacing: 0.5,
    },

    timelineContainer: {
        marginLeft: 8,
    },
    timelineRow: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    timelineGraphic: {
        width: 30,
        alignItems: 'center',
        marginRight: 10,
    },
    timelineDot: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: '#2500fa',
        borderWidth: 3,
        borderColor: '#000',
        zIndex: 2,
    },
    timelineLine: {
        width: 3,
        flex: 1,
        backgroundColor: '#000',
        marginTop: -2,
        marginBottom: -22,
        zIndex: 1,
    },

    recordCard: {
        flex: 1,
        borderWidth: 3,
        borderColor: '#000',
        borderRadius: 8,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 4,
    },
    recordHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    recordDate: {
        fontSize: 12,
        fontWeight: '800',
        color: '#000',
    },
    statusBadge: {
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#000',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 10,
    },
    statusText: {
        fontSize: 10,
        fontWeight: '900',
        color: '#000',
        textTransform: 'uppercase',
    },
    recordType: {
        fontSize: 20,
        fontWeight: '900',
        color: '#000',
        marginBottom: 12,
    },
    recordDetails: {
        marginBottom: 16,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    detailIcon: {
        marginRight: 6,
    },
    detailText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#444',
    },
    viewNotesBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        borderTopWidth: 2,
        borderColor: 'rgba(0,0,0,0.2)',
        paddingTop: 12,
    },
    viewNotesText: {
        fontSize: 12,
        fontWeight: '800',
        color: '#000',
        marginRight: 4,
    },
});
