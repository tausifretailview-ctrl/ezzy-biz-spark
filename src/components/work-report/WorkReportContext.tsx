import React, { createContext, useContext, useState, useCallback } from "react";

export interface WRUser {
  userId: string;
  name: string;
  role: string;
  department: string | null;
}

interface WorkReportContextType {
  user: WRUser | null;
  login: (user: WRUser) => void;
  logout: () => void;
  isAdmin: boolean;
}

const WorkReportContext = createContext<WorkReportContextType | null>(null);

export const WorkReportProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<WRUser | null>(null);

  const login = useCallback((u: WRUser) => setUser(u), []);
  const logout = useCallback(() => setUser(null), []);
  const isAdmin = user?.role === "admin";

  return (
    <WorkReportContext.Provider value={{ user, login, logout, isAdmin }}>
      {children}
    </WorkReportContext.Provider>
  );
};

export const useWorkReportAuth = () => {
  const ctx = useContext(WorkReportContext);
  if (!ctx) throw new Error("useWorkReportAuth must be used within WorkReportProvider");
  return ctx;
};
