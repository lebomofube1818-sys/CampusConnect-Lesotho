import React, { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { setUser, setLoading } = useAuthStore();

  useEffect(() => {
    // Mock user for UI presentation if desired, or skip
    // setUser({ email: 'student@lesotho.edu.ls', displayName: 'Student User' } as any);
    setUser(null);
    setLoading(false);
  }, [setUser, setLoading]);

  return <>{children}</>;
};
