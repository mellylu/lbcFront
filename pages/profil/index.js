import { useRouter } from "next/router"
import React, { useContext, useEffect, useState } from "react"

import AuthContext from "../../contexts/AuthContext"

import Button from "../../components/body/button/button"
import Input from "../../components/body/input/input"
import Header from "../../components/header/header"

import styles from "./index.module.scss"

import userService from "../../services/user.service"

const Profil = () => {
    const router = useRouter()
    const { setUserContext, userContext } = useContext(AuthContext)
    const [user, setUser] = useState({})

    const handleSubmit = e => {
        e.preventDefault()
        console.log("verifie les infos envoyées")
        console.log(userContext.id)
        console.log(user)
        userService
            .updateuser(userContext.id, user)
            .then(data => {
                console.log(data)
                setUserContext({ ...userContext, username: data.user.username })
                setUser({ username: data.user.username })
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        setUser({ username: userContext.username })
        // userService
        //     .getuser(userContext.id)
        //     .then(data => {
        //         console.log(data)
        //     })
        //     .catch(err => console.log(err))
    }, [])

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
                    <Input
                        title="Nom d'utilisateur"
                        className="input input-form"
                        value={user.username || ""}
                        onChange={e => {
                            setUser({ ...user, username: e.target.value })
                        }}
                    />
                    <div>
                        <Button
                            className="btn btn-orange"
                            title="Enregistrer"
                            onClick={e => {
                                handleSubmit(e)
                            }}
                        />
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
