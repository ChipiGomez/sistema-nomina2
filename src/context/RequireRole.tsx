import type { ReactNode } from 'react';
import { useAuth, type Role } from './AuthContext';

export default function RequireRole({ roles, children }: { roles: Role[]; children: ReactNode }) {
  const { auth } = useAuth();
  if (!auth.role || !roles.includes(auth.role)) {
    return <p>No autorizado</p>;
  }
  return <>{children}</>;
}
