import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { supabase, Clinic } from '@/lib/supabase';

const CLINIC_COLORS = ['#baffc9', '#ffb3ba', '#bae1ff', '#FEF08A', '#FCE7F3'];

export default function DiscoverScreen() {
    const [allClinics, setAllClinics] = useState<Clinic[]>([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClinics = async () => {
            const { data, error } = await supabase
                .from('clinics')
                .select('*')
                .eq('is_active', true)
                .order('name', { ascending: true });
            if (!error && data) setAllClinics(data as Clinic[]);
            setLoading(false);
        };
        fetchClinics();
    }, []);

    const clinics = allClinics.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.address.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <SafeAreaView style={styles.container} edges={['top']}>

            {/* Fixed Header & Search */}
            <View style={styles.headerBlock}>
                <Text style={styles.headerTitle}>FIND A CLINIC</Text>
                <View style={styles.searchBar}>
                    <IconSymbol name="magnifyingglass" size={20} color="#000" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search by name or location..."
                        placeholderTextColor="#666"
                    />
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
                    <TouchableOpacity style={[styles.filterChip, { backgroundColor: '#000' }]}><Text style={[styles.filterText, { color: '#fff' }]}>All</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.filterChip}><Text style={styles.filterText}>Open Now</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.filterChip}><Text style={styles.filterText}>Top Rated</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.filterChip}><Text style={styles.filterText}>Emergency</Text></TouchableOpacity>
                    <View style={{ width: 20 }} />
                </ScrollView>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Mock Map View */}
                <View style={styles.mapContainer}>
                    <View style={styles.mapGraphic}>
                        <IconSymbol name="map.fill" size={64} color="#000" style={{ opacity: 0.1, position: 'absolute' }} />
                        <View style={styles.mapPin}>
                            <IconSymbol name="mappin.and.ellipse" size={32} color="#818CF8" />
                        </View>
                    </View>
                    <TouchableOpacity style={styles.mapActionBtn}>
                        <Text style={styles.mapActionText}>View Full Map</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.sectionTitle}>NEARBY HOSPITALS</Text>

                {/* Clinic Cards */}
                {loading ? (
                    <View style={{ alignItems: 'center', padding: 40 }}>
                        <ActivityIndicator size="large" color="#818CF8" />
                        <Text style={{ marginTop: 12, fontWeight: '700', color: '#666' }}>Loading clinics...</Text>
                    </View>
                ) : clinics.length === 0 ? (
                    <View style={{ alignItems: 'center', padding: 40 }}>
                        <Text style={{ fontWeight: '700', color: '#666' }}>
                            {search ? 'No clinics match your search.' : 'No clinics registered yet.'}
                        </Text>
                    </View>
                ) : clinics.map((clinic, index) => (
                    <TouchableOpacity key={clinic.id} style={[styles.clinicCard, { backgroundColor: CLINIC_COLORS[index % CLINIC_COLORS.length] }]}>
                        <View style={styles.clinicHeader}>
                            <Text style={styles.clinicName}>{clinic.name}</Text>
                        </View>

                        <View style={styles.clinicDetailsRow}>
                            <View style={styles.detailItem}>
                                <IconSymbol name="location.fill" size={14} color="#000" />
                                <Text style={styles.detailText}>{clinic.address}</Text>
                            </View>
                            <View style={styles.detailItem}>
                                <IconSymbol name="clock.fill" size={14} color="#000" />
                                <Text style={styles.detailText}>{clinic.operating_hours}</Text>
                            </View>
                        </View>

                        <View style={styles.clinicActions}>
                            <TouchableOpacity style={styles.primaryActionBtn}>
                                <Text style={styles.primaryActionText}>Book Now</Text>
                            </TouchableOpacity>
                            {clinic.contact ? (
                                <TouchableOpacity style={styles.secondaryActionBtn} onPress={() => Linking.openURL(`tel:${clinic.contact}`)}>
                                    <IconSymbol name="phone.fill" size={16} color="#000" />
                                </TouchableOpacity>
                            ) : null}
                        </View>
                    </TouchableOpacity>
                ))}


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
        backgroundColor: '#fff',
        borderBottomWidth: 4,
        borderColor: '#000',
        zIndex: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 4,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '900',
        color: '#000',
        letterSpacing: -0.5,
        marginBottom: 16,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 3,
        borderColor: '#000',
        height: 50,
        paddingHorizontal: 12,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 1,
        shadowRadius: 0,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        fontWeight: '800',
        color: '#000',
        fontFamily: 'Courier',
        height: '100%',
    },
    filterScroll: {
        flexDirection: 'row',
    },
    filterChip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#000',
        borderRadius: 20,
        marginRight: 8,
    },
    filterText: {
        fontSize: 12,
        fontWeight: '800',
        color: '#000',
    },

    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },

    mapContainer: {
        borderWidth: 4,
        borderColor: '#000',
        backgroundColor: '#e8e8e8',
        height: 180,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 6, height: 6 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 5,
        overflow: 'hidden',
    },
    mapGraphic: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mapPin: {
        backgroundColor: '#fff',
        padding: 8,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: '#000',
    },
    mapActionBtn: {
        backgroundColor: '#000',
        padding: 12,
        alignItems: 'center',
    },
    mapActionText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '900',
        textTransform: 'uppercase',
    },

    sectionTitle: {
        fontSize: 20,
        fontWeight: '900',
        color: '#000',
        marginBottom: 16,
        letterSpacing: 0.5,
    },

    clinicCard: {
        borderWidth: 4,
        borderColor: '#000',
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 6, height: 6 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 5,
    },
    clinicHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    clinicName: {
        flex: 1,
        fontSize: 20,
        fontWeight: '900',
        color: '#000',
        paddingRight: 8,
    },
    ratingBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#000',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    ratingText: {
        fontSize: 12,
        fontWeight: '900',
        color: '#000',
        marginLeft: 4,
    },
    clinicDetailsRow: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#000',
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginRight: 8,
    },
    detailText: {
        fontSize: 12,
        fontWeight: '800',
        color: '#000',
        marginLeft: 6,
    },
    clinicActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    primaryActionBtn: {
        flex: 1,
        backgroundColor: '#fff',
        borderWidth: 3,
        borderColor: '#000',
        paddingVertical: 12,
        alignItems: 'center',
        marginRight: 8,
        shadowColor: '#000',
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 1,
        shadowRadius: 0,
    },
    primaryActionText: {
        fontSize: 14,
        fontWeight: '900',
        color: '#000',
        textTransform: 'uppercase',
    },
    secondaryActionBtn: {
        width: 48,
        backgroundColor: '#fff',
        borderWidth: 3,
        borderColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 1,
        shadowRadius: 0,
    },
});
