import { createContext, useContext, useState } from "react"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null)
  const [admin, setAdmin] = useState(null)

  function login(tokenValue, adminData = null) {
    setToken(tokenValue)
    setAdmin(adminData)
  }

  function logout() {
    setToken(null)
    setAdmin(null)
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        admin,
        login,
        logout,
        isAuthenticated: Boolean(token),
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}