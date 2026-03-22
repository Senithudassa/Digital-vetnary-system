import React, { useState } from 'react';
import {
  StyleSheet, View, Text, ScrollView, TouchableOpacity,
  ActivityIndicator, Modal, TextInput, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useAuth } from '@/context/AuthContext';
import { usePets } from '@/hooks/usePets';
import { Pet } from '@/lib/supabase';

const PET_COLORS = ['#FEF08A', '#DBEAFE', '#D1FAE5', '#FCE7F3', '#FFEDD5', '#EDE9FE'];

export default function PetDashboard() {
  const { profile, signOut } = useAuth();
  const { pets, loading, addPet, refetch } = usePets();

  // Add Pet Modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPetName, setNewPetName] = useState('');
  const [newPetSpecies, setNewPetSpecies] = useState('');
  const [newPetBreed, setNewPetBreed] = useState('');
  const [addingPet, setAddingPet] = useState(false);

  const handleAddPet = async () => {
    if (!newPetName || !newPetSpecies) {
      Alert.alert('Required', 'Pet name and species are required.');
      return;
    }
    setAddingPet(true);
    const { error } = await addPet({
      name: newPetName,
      species: newPetSpecies,
      breed: newPetBreed || null,
    });

    if (error) {
      Alert.alert('Error', error);
    } else {
      setShowAddModal(false);
      setNewPetName('');
      setNewPetSpecies('');
      setNewPetBreed('');
    }
    setAddingPet(false);
  };

  const firstName = profile?.full_name?.split(' ')[0]?.toUpperCase() ?? 'THERE';

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>HELLO, {firstName}</Text>
            <Text style={styles.subtitle}>Your Digital Vet Book</Text>
          </View>
          <TouchableOpacity style={styles.profileBtn} onPress={signOut}>
            <IconSymbol name="person.fill" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#FCE7F3' }]}>
            <IconSymbol name="calendar" size={24} color="#000" style={{ marginBottom: 8 }} />
            <Text style={styles.actionBtnText}>Book Visit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#FFEDD5' }]}>
            <IconSymbol name="camera.fill" size={24} color="#000" style={{ marginBottom: 8 }} />
            <Text style={styles.actionBtnText}>Skin Scan</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#D1FAE5' }]}>
            <IconSymbol name="pill.fill" size={24} color="#000" style={{ marginBottom: 8 }} />
            <Text style={styles.actionBtnText}>Pharmacy</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>MY PETS</Text>

        {/* Loading State */}
        {loading ? (
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color="#818CF8" />
            <Text style={styles.loadingText}>Loading your pets...</Text>
          </View>
        ) : pets.length === 0 ? (
          <View style={styles.emptyBox}>
            <IconSymbol name="pawprint.fill" size={40} color="#ccc" />
            <Text style={styles.emptyText}>No pets yet. Add your first pet below!</Text>
          </View>
        ) : (
          pets.map((pet: Pet, index: number) => (
            <TouchableOpacity
              key={pet.id}
              style={[styles.petCard, { backgroundColor: PET_COLORS[index % PET_COLORS.length] }]}
            >
              <View style={styles.petCardHeader}>
                <View>
                  <Text style={styles.petName}>{pet.name}</Text>
                  <Text style={styles.petBreed}>
                    {pet.species}{pet.breed ? ` • ${pet.breed}` : ''}{pet.gender ? ` • ${pet.gender}` : ''}
                  </Text>
                </View>
                <View style={styles.iconCircle}>
                  <IconSymbol name="pawprint.fill" size={20} color="#000" />
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.petCardFooter}>
                <View>
                  <Text style={styles.footerLabel}>Weight</Text>
                  <Text style={styles.footerValue}>
                    {pet.weight_kg ? `${pet.weight_kg} kg` : 'Not set'}
                  </Text>
                </View>
                <TouchableOpacity style={styles.viewBookBtn}>
                  <Text style={styles.viewBookBtnText}>Open VetBook</Text>
                  <IconSymbol name="chevron.right" size={16} color="#000" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))
        )}

        {/* Add New Pet Button */}
        <TouchableOpacity style={styles.addPetBtn} onPress={() => setShowAddModal(true)}>
          <IconSymbol name="plus" size={20} color="#000" style={{ marginRight: 8 }} />
          <Text style={styles.addPetBtnText}>ADD NEW PET</Text>
        </TouchableOpacity>

      </ScrollView>

      {/* Add Pet Modal */}
      <Modal visible={showAddModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>ADD A PET</Text>

            <Text style={styles.label}>PET NAME *</Text>
            <TextInput style={styles.input} placeholder="e.g. Max" value={newPetName} onChangeText={setNewPetName} />

            <Text style={styles.label}>SPECIES *</Text>
            <TextInput style={styles.input} placeholder="Dog / Cat / Bird / etc." value={newPetSpecies} onChangeText={setNewPetSpecies} />

            <Text style={styles.label}>BREED (OPTIONAL)</Text>
            <TextInput style={styles.input} placeholder="e.g. Golden Retriever" value={newPetBreed} onChangeText={setNewPetBreed} />

            <TouchableOpacity style={styles.modalBtn} onPress={handleAddPet} disabled={addingPet}>
              {addingPet ? <ActivityIndicator color="#fff" /> : <Text style={styles.modalBtnText}>SAVE PET</Text>}
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelBtn} onPress={() => setShowAddModal(false)}>
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF9F6' },
  scrollContent: { padding: 20, paddingBottom: 40 },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: 32, marginTop: 10,
  },
  greeting: { fontSize: 28, fontWeight: '900', color: '#000', letterSpacing: -0.5 },
  subtitle: { fontSize: 16, fontWeight: '700', color: '#666', marginTop: 4 },
  profileBtn: {
    width: 48, height: 48, backgroundColor: '#fff', borderRadius: 24,
    borderWidth: 3, borderColor: '#000', justifyContent: 'center', alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 3, height: 3 }, shadowOpacity: 1, shadowRadius: 0, elevation: 4,
  },
  actionRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 32 },
  actionBtn: {
    flex: 1, height: 100, marginHorizontal: 4, borderWidth: 3, borderColor: '#000', borderRadius: 8,
    justifyContent: 'center', alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 4, height: 4 }, shadowOpacity: 1, shadowRadius: 0, elevation: 4,
  },
  actionBtnText: { fontWeight: '800', fontSize: 14, color: '#000' },
  sectionTitle: { fontSize: 20, fontWeight: '900', color: '#000', marginBottom: 16, letterSpacing: 0.5 },

  loadingBox: { alignItems: 'center', padding: 40 },
  loadingText: { marginTop: 12, fontWeight: '700', color: '#666' },
  emptyBox: { alignItems: 'center', padding: 40 },
  emptyText: { marginTop: 12, fontWeight: '700', color: '#666', textAlign: 'center' },

  petCard: {
    borderWidth: 3, borderColor: '#000', borderRadius: 12, padding: 20, marginBottom: 20,
    shadowColor: '#000', shadowOffset: { width: 6, height: 6 }, shadowOpacity: 1, shadowRadius: 0, elevation: 5,
  },
  petCardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  petName: { fontSize: 28, fontWeight: '900', color: '#000' },
  petBreed: { fontSize: 14, fontWeight: '700', color: '#444', marginTop: 4 },
  iconCircle: {
    width: 44, height: 44, borderRadius: 22, backgroundColor: '#fff',
    borderWidth: 2, borderColor: '#000', justifyContent: 'center', alignItems: 'center',
  },
  divider: { height: 2, backgroundColor: '#000', opacity: 0.2, marginVertical: 16 },
  petCardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  footerLabel: { fontSize: 12, fontWeight: '800', color: '#444', textTransform: 'uppercase', marginBottom: 4 },
  footerValue: { fontSize: 16, fontWeight: '900', color: '#000' },
  viewBookBtn: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff',
    borderWidth: 2, borderColor: '#000', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20,
  },
  viewBookBtnText: { fontSize: 12, fontWeight: '800', color: '#000', marginRight: 4 },
  addPetBtn: {
    flexDirection: 'row', backgroundColor: '#fff', borderWidth: 3, borderColor: '#000',
    borderStyle: 'dashed', borderRadius: 12, padding: 20, justifyContent: 'center',
    alignItems: 'center', marginTop: 8,
  },
  addPetBtnText: { fontSize: 16, fontWeight: '900', color: '#000' },

  // Modal styles
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalCard: {
    backgroundColor: '#FAF9F6', borderTopWidth: 4, borderTopColor: '#000',
    borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 24, paddingBottom: 40,
  },
  modalTitle: { fontSize: 24, fontWeight: '900', color: '#000', marginBottom: 20 },
  label: { fontSize: 12, fontWeight: '900', color: '#000', marginBottom: 8, letterSpacing: 0.5 },
  input: {
    borderWidth: 3, borderColor: '#000', borderRadius: 6, padding: 14,
    fontSize: 16, fontWeight: '600', color: '#000', backgroundColor: '#fff', marginBottom: 16,
  },
  modalBtn: {
    backgroundColor: '#818CF8', borderWidth: 3, borderColor: '#000', borderRadius: 8,
    padding: 16, alignItems: 'center', marginTop: 8,
    shadowColor: '#000', shadowOffset: { width: 4, height: 4 }, shadowOpacity: 1, shadowRadius: 0, elevation: 4,
  },
  modalBtnText: { color: '#fff', fontSize: 16, fontWeight: '900', letterSpacing: 0.5 },
  cancelBtn: { padding: 16, alignItems: 'center' },
  cancelBtnText: { fontSize: 16, fontWeight: '700', color: '#666' },
});
