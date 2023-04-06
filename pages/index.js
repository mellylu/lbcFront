import React, { useEffect, useContext } from "react"
import { useRouter } from "next/router"

import AuthContext from "../contexts/AuthContext"

const Index = () => {
    const router = useRouter()
    const { setUserContext } = useContext(AuthContext)
    useEffect(() => {
        if (
            !localStorage.getItem("user") ||
            localStorage.getItem("user") === null ||
            localStorage.getItem("user") === ""
        ) {
            setUserContext("")
        }
        router.push("/home")
    }, [])

    return <div></div>
}

export default Index
