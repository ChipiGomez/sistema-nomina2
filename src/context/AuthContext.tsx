import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

export type Role = 'Administrador' | 'Gerente/RRHH' | 'Asistente de RRHH' | 'Empleado';

interface AuthState {
  token: string | null;
  role: Role | null;
}

interface AuthContextValue {
  auth: AuthState;
  login: (token: string, role: Role) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue>({
  auth: { token: null, role: null },
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthState>({ token: null, role: null });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role') as Role | null;
    if (token && role) {
      setAuth({ token, role });
    }
  }, []);

  const login = (token: string, role: Role) => {
    setAuth({ token, role });
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
  };

  const logout = () => {
    setAuth({ token: null, role: null });
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
