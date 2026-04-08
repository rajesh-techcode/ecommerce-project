"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User, signOut as firebaseSignOut } from "firebase/auth";
import { auth, db } from "../lib/firebase/config";
import { doc, getDoc, setDoc } from "firebase/firestore";

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAdmin: false,
  loading: true,
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        // Check if user is admin
        const isSuperAdmin = firebaseUser.email === "superadmin123@gmail.com";
        const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
        
        if (userDoc.exists()) {
          setIsAdmin(isSuperAdmin || userDoc.data()?.role === "admin");
          
          // Ensure the role is "admin" in DB for the super admin
          if (isSuperAdmin && userDoc.data()?.role !== "admin") {
            await setDoc(doc(db, "users", firebaseUser.uid), { role: "admin" }, { merge: true });
          }
        } else {
          // If no user doc, create a standard one
          await setDoc(doc(db, "users", firebaseUser.uid), {
            email: firebaseUser.email,
            role: isSuperAdmin ? "admin" : "user",
            createdAt: new Date().toISOString(),
          });
          setIsAdmin(isSuperAdmin);
        }
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await firebaseSignOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
