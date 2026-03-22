"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase/config";

// ─── Types ────────────────────────────────────────────────────────────────────

type AppRole = "vet" | "minor_admin" | "main_admin" | "customer";

interface AuthContextType {
    user: User | null;
    role: AppRole | null;
    loading: boolean;
    getToken: () => Promise<string | null>;
    signIn: (email: string, password: string) => Promise<{ error: string | null }>;
    signOut: () => Promise<void>;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextType>({
    user: null,
    role: null,
    loading: true,
    getToken: async () => null,
    signIn: async () => ({ error: null }),
    signOut: async () => { },
});

export const useAuth = () => useContext(AuthContext);

// ─── Helper: fetch role from profiles table ───────────────────────────────────
// We intentionally read from public.profiles (not app_metadata) because:
// • app_metadata is only writable by the service role key
// • signUp() only sets raw_user_meta_data, which is user-controlled
// • The handle_new_user trigger always writes the correct role into profiles
async function fetchRoleFromProfile(userId: string): Promise<AppRole | null> {
    const { data, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", userId)
        .single();

    if (error || !data) return null;
    return data.role as AppRole;
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [role, setRole] = useState<AppRole | null>(null);
    const [loading, setLoading] = useState(true);

    // Called whenever the session changes (login, logout, token refresh)
    const syncSession = useCallback(async (session: Session | null) => {
        if (!session?.user) {
            setUser(null);
            setRole(null);
            setLoading(false);
            return;
        }

        setUser(session.user);

        // Fetch role from profiles — the only reliable source
        const profileRole = await fetchRoleFromProfile(session.user.id);
        setRole(profileRole);
        setLoading(false);
    }, []);

    useEffect(() => {
        // 1. Hydrate from existing session on mount
        supabase.auth.getSession().then(({ data: { session } }) => {
            syncSession(session);
        });

        // 2. Subscribe to all future auth state changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                syncSession(session);
            }
        );

        return () => subscription.unsubscribe();
    }, [syncSession]);

    // ─── signIn ───────────────────────────────────────────────────────────────
    // Returns { error: null } on success, or { error: "message" } on failure.
    // The caller does NOT need to manage session state — onAuthStateChange handles it.
    const signIn = async (email: string, password: string): Promise<{ error: string | null }> => {
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            setLoading(false);
            // Map Supabase raw errors to friendly messages
            if (error.message.includes("Invalid login credentials")) {
                return { error: "Incorrect email or password. Please try again." };
            }
            if (error.message.includes("Email not confirmed")) {
                return { error: "Your email is not confirmed. Please check your inbox or disable email confirmation in Supabase." };
            }
            return { error: error.message };
        }

        // onAuthStateChange will fire and call syncSession, which sets role + loading
        return { error: null };
    };

    // ─── signOut ──────────────────────────────────────────────────────────────
    const signOut = async () => {
        await supabase.auth.signOut();
        // onAuthStateChange fires with null session → syncSession clears state
    };

    // ─── getToken ─────────────────────────────────────────────────────────────
    // Used by API calls to attach the JWT Bearer token for Zero Trust validation
    const getToken = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        return session?.access_token ?? null;
    };

    return (
        <AuthContext.Provider value={{ user, role, loading, getToken, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};
