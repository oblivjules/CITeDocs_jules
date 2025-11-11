import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [error, setError] = useState(null);

  // Mock users — replace this with your API or Supabase integration later
  const users = [
    {
      email: "student@cit.edu",
      password: "12345",
      role: "student",
      name: "John Doe",
    },
    {
      email: "registrar@cit.edu",
      password: "12345",
      role: "registrar",
      name: "Registrar Jane",
    },
  ];

  const login = async (email, password, expectedRole) => {
    setError(null);
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!foundUser) {
      setError("Invalid email or password.");
      return null;
    }

    // ✅ Enforce role check
    if (foundUser.role !== expectedRole) {
      setError(
        `Unauthorized: Please use the ${
          foundUser.role === "registrar" ? "Registrar" : "Student"
        } login page.`
      );
      return null;
    }

    setUser(foundUser);
    localStorage.setItem("user", JSON.stringify(foundUser));
    return foundUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
