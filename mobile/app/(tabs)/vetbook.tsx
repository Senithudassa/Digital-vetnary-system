import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { supabase, MedicalRecord, Vaccination } from '@/lib/supabase';
import { usePets } from '@/hooks/usePets';
import { Pet } from '@/lib/supabase';

// Merge medical records and vaccinations into a single sorted timeline
type TimelineItem = {
    id: string;
    date: string;
    type: string;
    vet: string;
    clinic: string;
    status: string;
    color: string;
};

export default function VetbookScreen() {
    const { pets, loading: petsLoading } = usePets();
    const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
    const [timeline, setTimeline] = useState<TimelineItem[]>([]);
    const [loadingRecords, setLoadingRecords] = useState(false);

    // Auto-select first pet
    useEffect(() => {
        if (pets.length > 0 && !selectedPet) {
            setSelectedPet(pets[0]);
        }
    }, [pets]);

    const fetchTimeline = useCallback(async () => {
        if (!selectedPet) return;
        setLoadingRecords(true);

        try {
            // Fetch medical records and vaccinations in parallel
            const [recordsRes, vacsRes] = await Promise.all([
                supabase
                    .from('medical_records')
                    .select('*, clinics(name), profiles(full_name)')
                    .eq('pet_id', selectedPet.id)
                    .order('created_at', { ascending: false }),
                supabase
                    .from('vaccinations')
                    .select('*, clinics(name)')
                    .eq('pet_id', selectedPet.id)
                    .order('date_administered', { ascending: false }),
            ]);

            if (recordsRes.error) console.error("recordsRes error:", recordsRes.error);
            if (vacsRes.error) console.error("vacsRes error:", vacsRes.error);

            const rawTimeline = [
                ...(recordsRes.data || []).map(r => ({ ...r, _rawDate: r.created_at, _isRecord: true })),
                ...(vacsRes.data || []).map(v => ({ ...v, _rawDate: v.date_administered, _isRecord: false }))
            ];
            
            rawTimeline.sort((a, b) => new Date(b._rawDate).getTime() - new Date(a._rawDate).getTime());

            const formattedTimeline: TimelineItem[] = rawTimeline.map((item: any) => {
                if (item._isRecord) {
                    return {
                        id: item.id,
                        date: new Date(item.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
                        type: item.diagnosis,
                        vet: item.profiles?.full_name ?? 'Unknown Vet',
                        clinic: item.clinics?.name ?? 'Unknown Clinic',
                        status: item.follow_up_date ? 'Requires Follow-up' : 'Completed',
                        color: item.follow_up_date ? '#FFEDD5' : '#D1FAE5',
                    };
                } else {
                    return {
                        id: item.id,
                        date: new Date(item.date_administered).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
                        type: `Vaccination: ${item.vaccine_name}`,
                        vet: 'Vet on Duty',
                        clinic: item.clinics?.name ?? 'Unknown Clinic',
                        status: item.next_due_date ? `Next due: ${new Date(item.next_due_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}` : 'Completed',
                        color: '#DBEAFE',
                    };
                }
            });

            setTimeline(formattedTimeline);
        } finally {
            setLoadingRecords(false);
        }
    }, [selectedPet]);

    useEffect(() => { fetchTimeline(); }, [fetchTimeline]);

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                <View style={styles.header}>
                    <Text style={styles.greeting}>DIGITAL VETBOOK</Text>
                    <Text style={styles.subtitle}>Medical History & Records</Text>
                </View>

                {/* Pet Selector */}
                {petsLoading ? (
                    <ActivityIndicator style={{ marginBottom: 24 }} color="#818CF8" />
                ) : pets.length === 0 ? (
                    <View style={styles.emptyBox}>
                        <Text style={styles.emptyText}>Add a pet from the Home tab first.</Text>
                    </View>
                ) : (
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 24 }}>
                        {pets.map((pet: Pet) => (
                            <TouchableOpacity
                                key={pet.id}
                                style={[styles.petChip, selectedPet?.id === pet.id && styles.petChipActive]}
                                onPress={() => setSelectedPet(pet)}
                            >
                                <Text style={[styles.petChipText, selectedPet?.id === pet.id && styles.petChipTextActive]}>
                                    {pet.name}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                )}

                <Text style={styles.sectionTitle}>TIMELINE</Text>

                {loadingRecords ? (
                    <View style={styles.loadingBox}>
                        <ActivityIndicator size="large" color="#818CF8" />
                        <Text style={styles.loadingText}>Loading records...</Text>
                    </View>
                ) : timeline.length === 0 ? (
                    <View style={styles.emptyBox}>
                        <IconSymbol name="doc.text" size={40} color="#ccc" />
                        <Text style={styles.emptyText}>No medical records yet for {selectedPet?.name ?? 'this pet'}.</Text>
                    </View>
                ) : (
                    <View style={styles.timelineContainer}>
                        {timeline.map((record, index) => (
                            <View key={record.id} style={styles.timelineRow}>
                                <View style={styles.timelineGraphic}>
                                    <View style={styles.timelineDot} />
                                    {index !== timeline.length - 1 && <View style={styles.timelineLine} />}
                                </View>
                                <TouchableOpacity 
                                    style={[styles.recordCard, { backgroundColor: record.color }]}
                                    onPress={() => console.log(`Viewing details for ${record.id}`)}
                                >
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
                )}

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FAF9F6' },
    scrollContent: { padding: 20, paddingBottom: 40 },
    header: { marginBottom: 24, marginTop: 10 },
    greeting: { fontSize: 28, fontWeight: '900', color: '#000', letterSpacing: -0.5 },
    subtitle: { fontSize: 16, fontWeight: '700', color: '#666', marginTop: 4 },

    petChip: {
        paddingHorizontal: 16, paddingVertical: 10, borderWidth: 3, borderColor: '#000',
        borderRadius: 20, marginRight: 8, backgroundColor: '#fff',
    },
    petChipActive: { backgroundColor: '#818CF8' },
    petChipText: { fontSize: 14, fontWeight: '900', color: '#000' },
    petChipTextActive: { color: '#fff' },

    sectionTitle: { fontSize: 20, fontWeight: '900', color: '#000', marginBottom: 16, letterSpacing: 0.5 },
    loadingBox: { alignItems: 'center', padding: 40 },
    loadingText: { marginTop: 12, fontWeight: '700', color: '#666' },
    emptyBox: { alignItems: 'center', padding: 40 },
    emptyText: { marginTop: 12, fontWeight: '700', color: '#666', textAlign: 'center' },

    timelineContainer: { marginLeft: 8 },
    timelineRow: { flexDirection: 'row', marginBottom: 20 },
    timelineGraphic: { width: 30, alignItems: 'center', marginRight: 10 },
    timelineDot: { width: 16, height: 16, borderRadius: 8, backgroundColor: '#818CF8', borderWidth: 3, borderColor: '#000', zIndex: 2 },
    timelineLine: { width: 3, flex: 1, backgroundColor: '#000', marginTop: -2, marginBottom: -22, zIndex: 1 },

    recordCard: { flex: 1, borderWidth: 3, borderColor: '#000', borderRadius: 8, padding: 16, shadowColor: '#000', shadowOffset: { width: 4, height: 4 }, shadowOpacity: 1, shadowRadius: 0, elevation: 4 },
    recordHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
    recordDate: { fontSize: 12, fontWeight: '800', color: '#000' },
    statusBadge: { backgroundColor: '#fff', borderWidth: 2, borderColor: '#000', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10 },
    statusText: { fontSize: 10, fontWeight: '900', color: '#000', textTransform: 'uppercase' },
    recordType: { fontSize: 18, fontWeight: '900', color: '#000', marginBottom: 12 },
    recordDetails: { marginBottom: 16 },
    detailRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
    detailIcon: { marginRight: 6 },
    detailText: { fontSize: 14, fontWeight: '700', color: '#444' },
    viewNotesBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', borderTopWidth: 2, borderColor: 'rgba(0,0,0,0.2)', paddingTop: 12 },
    viewNotesText: { fontSize: 12, fontWeight: '800', color: '#000', marginRight: 4 },
});
