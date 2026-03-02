import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function PetDashboard() {
  const pets = [
    { id: 1, name: 'Max', breed: 'Golden Retriever', age: '3 yrs', nextVax: 'Oct 12', bgColor: '#FEF08A' }, // Yellow
    { id: 2, name: 'Luna', breed: 'Persian Cat', age: '2 yrs', nextVax: 'Dec 01', bgColor: '#DBEAFE' }, // Blue
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>HELLO, SENITH</Text>
            <Text style={styles.subtitle}>Your Digital Vet Book</Text>
          </View>
          <TouchableOpacity style={styles.profileBtn}>
            <IconSymbol name="person.fill" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Quick Actions - Neobrutalism style buttons */}
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

        {/* Pet Cards */}
        {pets.map((pet) => (
          <TouchableOpacity key={pet.id} style={[styles.petCard, { backgroundColor: pet.bgColor }]}>
            <View style={styles.petCardHeader}>
              <View>
                <Text style={styles.petName}>{pet.name}</Text>
                <Text style={styles.petBreed}>{pet.breed} • {pet.age}</Text>
              </View>
              <View style={styles.iconCircle}>
                <IconSymbol name="pawprint.fill" size={20} color="#000" />
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.petCardFooter}>
              <View>
                <Text style={styles.footerLabel}>Next Vaccination</Text>
                <Text style={styles.footerValue}>{pet.nextVax}</Text>
              </View>
              <TouchableOpacity style={styles.viewBookBtn}>
                <Text style={styles.viewBookBtnText}>Open VetBook</Text>
                <IconSymbol name="chevron.right" size={16} color="#000" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}

        {/* Add New Pet Button */}
        <TouchableOpacity style={styles.addPetBtn}>
          <IconSymbol name="plus" size={20} color="#000" style={{ marginRight: 8 }} />
          <Text style={styles.addPetBtnText}>ADD NEW PET</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F6', // Off-white modern background
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
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
  profileBtn: {
    width: 48,
    height: 48,
    backgroundColor: '#fff',
    borderRadius: 24,
    borderWidth: 3,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    // Neobrutalism shadow
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },

  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  actionBtn: {
    flex: 1,
    height: 100,
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

  petCard: {
    borderWidth: 3,
    borderColor: '#000',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 5,
  },
  petCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  petName: {
    fontSize: 28,
    fontWeight: '900',
    color: '#000',
  },
  petBreed: {
    fontSize: 14,
    fontWeight: '700',
    color: '#444',
    marginTop: 4,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    height: 2,
    backgroundColor: '#000',
    opacity: 0.2,
    marginVertical: 16,
  },
  petCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  footerLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: '#444',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  footerValue: {
    fontSize: 16,
    fontWeight: '900',
    color: '#000',
  },
  viewBookBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#000',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  viewBookBtnText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#000',
    marginRight: 4,
  },

  addPetBtn: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderWidth: 3,
    borderColor: '#000',
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  addPetBtnText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#000',
  },
});
