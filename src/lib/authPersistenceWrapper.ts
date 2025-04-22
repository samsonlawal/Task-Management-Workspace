"use client";
import usePersistAppContext from "@/hooks/context/auth/usePersistAuthContext";

const AuthPersistenceWrapper = () => {
  usePersistAppContext(); // ✅ just call the hook
  return null; // no UI
};

export default AuthPersistenceWrapper;
