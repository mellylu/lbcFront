import React, { useContext } from "react"
import { useRouter } from "next/router"
import AuthContext from "../../contexts/AuthContext"

import userService from "../../services/user.service"

export const verifyToken = token => {
    const resp = console.log(token, "TTOOKKENN")
    userService
        .verifyToken(token)
        .then(data => {
            if (data.auth) {
                return true
            } else {
                return false
            }
        })
        .catch(() => {
            return false
        })
    return resp

    // const router = useRouter()
    // const { userContext } = useContext(AuthContext)

    // if (userContext && userContext.token) {
    //     userService
    //         .verifyToken(userContext.token)
    //         .then(data => {
    //             if (data.auth) {
    //                 return response.status === 200
    //             } else {
    //                 router.push("/auth/login")
    //             }
    //         })
    //         .catch(err => router.push("/auth/login"))
    // } else {
    //     router.push("/auth/login")
    // }
}

export const logout = () => {
    return localStorage.removeItem("user")
}
