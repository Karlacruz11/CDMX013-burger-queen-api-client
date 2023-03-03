import { createContext, useState } from 'react'
export const userContext = createContext(null)

function UserProvider({ children }) {
  const [user, setUser] = useState({ role: null })

  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  )
}

export default UserProvider
