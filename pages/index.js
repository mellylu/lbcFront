import React, { useContext, useEffect } from "react"

import Header from "../components/header/header"

import AuthContext from "../contexts/AuthContext"

export default function Home() {
    const { userContext } = useContext(AuthContext)
    useEffect(() => console.log(userContext))

    return (
        <div>
            <Header />
        </div>
    )
}
