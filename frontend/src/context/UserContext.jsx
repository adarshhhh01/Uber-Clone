import React, { useState } from 'react'
export const UserDataContext = React.createContext();

const UserContext = ({children}) => {
   const [User, setUser] = useState({
    email: '',
    fullName: {
      firstName: '',
      lastName: ''
    }
   })

  return (
    <div>
        <UserDataContext.Provider value={[User, setUser]}>
          {children}
        </UserDataContext.Provider>
    </div>
  )
}

export default UserContext