'use client';

import type { ReactNode, Dispatch, SetStateAction } from 'react';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, updateProfile, type User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Spinner } from '@/components/ui/spinner';

interface CustomUser extends User {
  type?: 'psychologist' | 'user' | 'admin';
}

interface AuthContextType {
  user: CustomUser | null;
  loading: boolean;
  setUser: Dispatch<SetStateAction<CustomUser | null>>;
  updateUserProfile: (updates: { displayName?: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<CustomUser | null>(null);
  const [loading, setLoading] = useState(true);

  const updateUserProfile = async (updates: { displayName?: string }) => {
    if (user) {
      try {
        await updateProfile(user, updates);
        setUser({ ...user, ...updates });
      } catch (error) {
        console.error("Error updating user profile:", error);
        throw error;
      }
    } else {
      throw new Error("No user logged in to update profile.");
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          // Force refresh the ID token to get the latest custom claims
          const idTokenResult = await currentUser.getIdTokenResult(true);
          const userRole = (idTokenResult.claims.role || 'user') as 'user' | 'psychologist' | 'admin';
          
          const customUser: CustomUser = {
            ...currentUser,
            type: userRole,
          };
          setUser(customUser);
          // Optionally, redirect based on role after successful authentication
          // This can be handled in individual pages or a central routing logic
        } catch (error) {
          console.error("Error fetching ID token or custom claims:", error);
          setUser(currentUser); // Fallback to user without custom type
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Spinner size={48} />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, loading, setUser, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
