import { useRouter } from "next/router"
import React, { useContext } from "react"

import AuthContext from "../../contexts/AuthContext"

import Button from "../../components/body/button/button"
import Input from "../../components/body/input/input"
import Header from "../../components/header/header"

import styles from "./index.module.scss"

const Profil = () => {
    const router = useRouter()
    const { setUserContext } = useContext(AuthContext)

    const logout = () => {
        localStorage.clear()
        setUserContext(null)
        router.push("/")
    }

    return (
        <div className="width">
            <Header />
            <div className={styles.divprincipal}>
                <div className={styles.div}>
                    <p>IMAGE DE L UTILISATEUR</p>
                    <div className={styles.divbutton}>
                        <Button
                            className="btn btn-blue"
                            title="Voir mon profil public"
                            onClick={() => {}}
                        />
                    </div>
                </div>
                <br />
                <div className={styles.div}>
                    <Input title="Nom d'utilisateur" onChange={() => {}} />
                    <div>
                        <Button className="btn btn-orange" title="Enregistrer" onClick={() => {}} />
                    </div>
                </div>
                <br />
                <div className={styles.div}>
                    <Button
                        onClick={() => {
                            logout()
                        }}
                        className="color-grey btn btn-grey"
                        title="Me déconnecter"
                    />
                </div>
            </div>
        </div>
    )
}

export default Profil
