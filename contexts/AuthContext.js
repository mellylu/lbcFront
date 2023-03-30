import React, { createContext, useState, useEffect } from "react"
import jwtDecode from "jwt-decode"

const AuthContext = createContext({
    userContext: {},
    setUserContext: () => {},
})

export const AuthContextProvider = ({ children }) => {
    const [userContext, setUserContext] = useState()
    // {},
    useEffect(() => {
        setUserContext(
            localStorage.getItem("user") !== "undefined"
                ? JSON.parse(localStorage.getItem("user"))
                : {},
        )
    }, [])

    // useEffect(() => {
    //     // setUserContext(JSON.parse(localStorage.getItem("user")))
    //     const hydrateToken = () => {
    //         const tokenUser = localStorage.getItem("token")
    //         // if (tokenUser) {
    //         //     const { token, username, id } = jwtDecode(tokenUser)

    //         //     setUserContext({
    //         //         token,
    //         //         username,
    //         //         id,
    //         //     })
    //         // }
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
