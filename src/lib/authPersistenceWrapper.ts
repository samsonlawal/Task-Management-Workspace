"use client";
import usePersistAppContext from "@/hooks/context/auth/usePersistAuthContext";

const AuthPersistenceWrapper = () => {
  usePersistAppContext();
  return null; 
};

export default AuthPersistenceWrapper;
