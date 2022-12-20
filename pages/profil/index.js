import { useRouter } from "next/router"
import React, { useContext } from "react"

import Button from "../../components/body/button/button"
import Header from "../../components/header/header"
import AuthContext from "../../contexts/AuthContext"

const Profil = () => {
    const router = useRouter()
    const { setUserContext } = useContext(AuthContext)

    const logout = () => {
        localStorage.clear()
        setUserContext(null)
        router.push("/")
    }

    return (
        <div>
            <Header />
            <div>
                <Button
                    onClick={() => {
                        logout()
                    }}
                    className="color-grey"
                    title="Me déconnecter"
                />
            </div>
        </div>
    )
}

export default Profil
