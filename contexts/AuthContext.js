import React, { createContext, useState, useEffect } from "react"
import jwtDecode from "jwt-decode"

const AuthContext = createContext({
    userContext: {},
    setUserContext: () => {},
})

export const AuthContextProvider = ({ children }) => {
    const [userContext, setUserContext] = useState(
        localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
    )

    //     useEffect(() => {
    //     const hydrateToken = () => {
    //         const tokenUser = localStorage.getItem("token")
    //         if (tokenUser) {
    //             const { token, username, id } = jwtDecode(tokenUser)

    //             setUserContext({
    //                 token,
    //                 username,
    //                 id,
    //             })
    //         }
    //     }

    //     hydrateToken()
    // }, [])

    const context = {
        userContext,
        setUserContext,
    }
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(userContext))
        return () => {
            localStorage.setItem("user", JSON.stringify(userContext))
        }
    }, [userContext])

    return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
}

export default AuthContext
