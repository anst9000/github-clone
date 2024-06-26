import { createContext, useContext, useEffect, useState } from "react"
import toast from "react-hot-toast"

export const AuthContext = createContext()

export const useAuthContext = () => {
  return useContext(AuthContext)
}

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      setIsLoading(true)

      try {
        const response = await fetch("/api/auth/check", {
          credentials: "include",
        })

        const data = await response.json()
        setAuthUser(data.user)
      } catch (error) {
        toast.error(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    checkUserLoggedIn()
  }, [])

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}
