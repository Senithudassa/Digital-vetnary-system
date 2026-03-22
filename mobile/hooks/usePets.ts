import { useState, useEffect, useCallback } from 'react';
import { supabase, Pet } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';

export function usePets() {
    const { user } = useAuth();
    const [pets, setPets] = useState<Pet[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPets = useCallback(async () => {
        if (!user) {
            setPets([]);
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
            .from('pets')
            .select('*')
            .eq('owner_uid', user.id)
            .eq('is_active', true)
            .order('created_at', { ascending: true });

        if (fetchError) {
            setError(fetchError.message);
        } else {
            setPets(data as Pet[]);
        }
        setLoading(false);
    }, [user]);

    useEffect(() => {
        fetchPets();
    }, [fetchPets]);

    const addPet = async (petData: Partial<Pet>) => {
        if (!user) return { error: 'Not logged in' };

        const { error: insertError } = await supabase.from('pets').insert({
            ...petData,
            owner_uid: user.id,
        });

        if (insertError) {
            console.error("addPet error:", insertError);
            return { error: insertError.message };
        }
        await fetchPets();
        return { error: null };
    };

    return { pets, loading, error, refetch: fetchPets, addPet };
}
