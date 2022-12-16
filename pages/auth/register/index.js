import { useRouter } from "next/router"
import React, { useState, useEffect } from "react"
import Image from "next/image"

import Button from "../../../components/body/button/button"
import Input from "../../../components/body/input/input"
import Headerform from "../../../components/header/headerform/headerform"

import Background from "../../../public/login-illustration.png"

import userService from "../../../services/user.service"

import styles from "../index.module.scss"

const Index = () => {
    const router = useRouter()
    const [user, setUser] = useState({})
    const [validEmail, setValidEmail] = useState(false)
    const [email, setEmail] = useState({})
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        var validate = /[a-z0-9_\-\.]+@[a-z0-9_\-\.]+\.[a-z]+/
        if (email.email !== undefined) {
            if (email.email.match(validate)) {
                setValidEmail(true)
            } else {
                setValidEmail(false)
            }
        }
    }, [email])

    const handleSubmit = e => {
        e.preventDefault()
        userService
            .emailexist(email)
            .then(data => {
                console.log(data)
                if (data.register === false) {
                    setError(true)
                    setErrorMessage(data.message)
                } else {
                    setError(false)
                    setUser({ ...user, email: data.email })
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div className={styles.divtitle}>
            <Headerform title="Création de compte" />
            <div className={styles.divbody}>
                <div className={styles.divimage}>
                    <Image
                        src={Background}
                        alt="background image login"
                        className="image image-big"
                    />
                </div>
                <div className={styles.divform}>
                    <p className="title-h1">Commençons par un email</p>
                    <form>
                        <Input
                            label="E-mail"
                            className="input input-form"
                            required={true}
                            onChange={e => {
                                setEmail({ ...email, email: e.target.value })
                            }}
                        />
                        {error ? <div className="color-red title-h6">{errorMessage}</div> : ""}
                        <br />
                        {validEmail ? (
                            <Button
                                id="suivant"
                                className="btn btn-orange"
                                title="Suivant"
                                onClick={e => handleSubmit(e)}
                            />
                        ) : (
                            <>
                                <p className="color-red title-h6">
                                    * désolé l adresse de format est incorrect
                                </p>
                                <div className={styles.divbutton}>
                                    <Button
                                        id="suivant"
                                        className="btn btn-orange"
                                        title="Suivant"
                                    />
                                </div>
                            </>
                        )}
                    </form>
                    {
                        //error ? <Message mess={errorMessage} type="error" /> : ""
                    }
                    <br />
                </div>
            </div>
        </div>
    )
}

export default Index
