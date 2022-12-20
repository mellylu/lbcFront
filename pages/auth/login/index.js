import { useRouter } from "next/router"
import React, { useState, useContext } from "react"
import Image from "next/image"
import jwtDecode from "jwt-decode"

import Button from "../../../components/body/button/button"
import Input from "../../../components/body/input/input"
import Headerform from "../../../components/header/headerform/headerform"

import Background from "../../../public/login-illustration.png"

import userService from "../../../services/user.service"

import styles from "../index.module.scss"
import Message from "../../../components/body/message/message"
import AuthContext from "../../../contexts/AuthContext"

const Index = () => {
    const router = useRouter()

    const [user, setUser] = useState({})
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const { setUserContext } = useContext(AuthContext)

    const handleSubmit = e => {
        e.preventDefault()
        userService
            .login(user)
            .then(data => {
                if (data.auth === true) {
                    setError(false)
                    localStorage.setItem("token", data.token)
                    setUserContext({
                        token: data.token,
                        username: data.username,
                    })
                    router.push("/")
                } else {
                    setError(true)
                    setErrorMessage("Erreur d'email ou de mot de passe")
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div className={styles.divtitle}>
            <Headerform title="Connexion" />
            <div className={styles.divbody}>
                <div className={styles.divimage}>
                    <Image
                        src={Background}
                        alt="background image login"
                        className="image image-big"
                    />
                </div>
                <div className={styles.divform}>
                    <p className="title title-h1 text text-center">Bonjour !</p>
                    <p className="title title-h3 text text-center">
                        Connectez-vous pour découvrir toutes nos fonctionnalités.
                    </p>
                    <form>
                        <Input
                            label="E-mail"
                            className="input input-form"
                            onChange={e => {
                                setUser({ ...user, email: e.target.value })
                            }}
                        />
                        <br />
                        <Input
                            label="Mot de passe"
                            type="password"
                            className="input input-form"
                            onChange={e => {
                                setUser({ ...user, password: e.target.value })
                            }}
                        />
                        <Button
                            className="btn btn-link color color-blue"
                            onClick={() => {
                                router.push("/auth/forgotpassword")
                            }}
                            title="Mot de passe oublié ?"
                        />
                        <Button
                            className="btn btn-blue"
                            onClick={e => handleSubmit(e)}
                            title="Se connecter"
                        />
                    </form>
                    {error ? <Message mess={errorMessage} type="error" /> : ""}
                    <br />
                    <div className="text-center">
                        Envie de nous rejoindre :{" "}
                        <Button
                            className="btn btn-link color-blue"
                            onClick={() => router.push("/auth/register")}
                            title="Créer un compte"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index
