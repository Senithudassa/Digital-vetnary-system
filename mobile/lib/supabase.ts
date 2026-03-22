import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
});

export type Profile = {
    id: string;
    account_number: string;
    full_name: string;
    email: string;
    phone_number: string | null;
    avatar_url: string | null;
    role: 'main_admin' | 'minor_admin' | 'vet' | 'customer';
    status: 'active' | 'suspended' | 'pending_approval';
    created_at: string;
};

export type Pet = {
    id: string;
    owner_uid: string;
    name: string;
    species: string;
    breed: string | null;
    gender: 'male' | 'female' | 'unknown' | null;
    date_of_birth: string | null;
    weight_kg: number | null;
    microchip_id: string | null;
    photo_url: string | null;
    notes: string | null;
    is_active: boolean;
    created_at: string;
};

export type MedicalRecord = {
    id: string;
    appointment_id: string | null;
    pet_id: string;
    vet_uid: string;
    clinic_id: string;
    diagnosis: string;
    treatment: string | null;
    prescriptions: string | null;
    follow_up_date: string | null;
    notes: string | null;
    created_at: string;
    // Joined fields
    clinics?: { name: string };
    profiles?: { full_name: string };
};

export type Vaccination = {
    id: string;
    pet_id: string;
    clinic_id: string | null;
    vaccine_name: string;
    batch_number: string | null;
    date_administered: string;
    next_due_date: string | null;
    notes: string | null;
    created_at: string;
    // Joined fields
    clinics?: { name: string };
};

export type Clinic = {
    id: string;
    name: string;
    address: string;
    contact: string;
    email: string | null;
    latitude: number | null;
    longitude: number | null;
    operating_hours: string;
    is_active: boolean;
};

export type SkinScan = {
    id: string;
    pet_id: string;
    scanned_by: string;
    image_url: string;
    ai_result: string | null;
    confidence_score: number | null;
    severity: 'low' | 'medium' | 'high' | 'critical' | null;
    vet_reviewed: boolean;
    vet_notes: string | null;
    created_at: string;
};
