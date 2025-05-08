"use client";
import type { User } from "@prisma/client";
import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthState {
  user: User | null;
}

const AuthContext = createContext<AuthState>({
  user: null,
});

export const AuthProvider: React.FC<{
  children: React.ReactNode;
  user: User | null;
}> = ({ children, user }) => {
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
