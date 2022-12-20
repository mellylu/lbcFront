import React, { createContext, useState, useEffect } from "react"
import jwtDecode from "jwt-decode"

const AuthContext = createContext({
    userContext: {},
    setUserContext: () => {},
})

export const AuthContextProvider = ({ children }) => {
    const [userContext, setUserContext] = useState()

    useEffect(() => {
        const hydrateToken = () => {
            const tokenUser = localStorage.getItem("token")
            if (tokenUser) {
                const { token, username } = jwtDecode(tokenUser)

                setUserContext({
                    token,
                    username,
                })
            }
        }
        console.log("DANS LE CONTEXT PROVIDER")

        hydrateToken()
    }, [])

    const context = {
        userContext,
        setUserContext,
    }

    return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
}

export default AuthContext
