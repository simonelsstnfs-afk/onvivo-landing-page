import React, { createContext, useContext, useEffect, useState } from "react";
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  User,
  getIdTokenResult
} from "firebase/auth";
import { auth } from "../config/firebase";

export type UserRole = "partner" | "admin" | null;

interface AuthContextType {
  user: User | null;
  role: UserRole;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  getToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      if (currentUser) {
        setUser(currentUser);
        try {
          // Obtener claims personalizados del token
          const tokenResult = await getIdTokenResult(currentUser, true);
          const userRole = tokenResult.claims.role as UserRole;
          
          setRole(userRole || null);
        } catch (error) {
          console.error("Error al obtener claims de Firebase Auth:", error);
          setRole(null);
        }
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, pass: string) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, pass);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
    } finally {
      setLoading(false);
    }
  };

  const getToken = async () => {
    if (!auth.currentUser) return null;
    try {
      return await auth.currentUser.getIdToken(true);
    } catch (error) {
      console.error("Error al refrescar token JWT:", error);
      return null;
    }
  };

  return (
    <AuthContext.Provider value={{ user, role, loading, login, logout, getToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};
