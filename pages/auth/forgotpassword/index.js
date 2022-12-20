import React, { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/router"

import userService from "../../../services/user.service"

import Input from "../../../components/body/input/input"
import Button from "../../../components/body/button/button"
import Headerform from "../../../components/header/headerform/headerform"
import Message from "../../../components/body/message/message"

import styles from "../index.module.scss"

import ImgForgotPassword from "../../../public/forgot-password.svg"

const Forgotpassword = () => {
    const router = useRouter()
    const [email, setEmail] = useState({})
    const [validEmail, setValidEmail] = useState(false)
    const [message, setMessage] = useState(false)

    const handleSubmit = e => {
        e.preventDefault()
        userService
            .sendEmailToResetPassword(email)
            .then(data => {
                setMessage(true)
            })
            .catch(err => {
                console.log(err)
            })
    }

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

    return (
        <div className="width">
            <Headerform title="Connexion" />
            <div className={styles.divtitle4}>
                <div>
                    <p className="title-h1">Mot de passe oublié</p>
                    <p className="title-h3">Entrez l adresse e-mail associée à votre compte</p>
                    <br />
                    <Input
                        label="E-mail"
                        required
                        className="input input-form"
                        onChange={e => {
                            setEmail({ ...email, email: e.target.value })
                        }}
                    />
                    <br />
                    {validEmail ? (
                        <Button
                            className="btn-orange"
                            title="Continuer"
                            onClick={e => handleSubmit(e)}
                        />
                    ) : (
                        <>
                            <p className="color-red title-h6">
                                * Vérifiez l adresse email, son format n est pas valide
                            </p>
                            <Button className="btn-grey" title="Continuer" />
                        </>
                    )}
                    {message ? <Message type="valid" mess="Email envoyé" /> : ""}
                </div>
                <div>
                    <Image
                        src={ImgForgotPassword}
                        alt="Image mot de passe oublié"
                        className="image image-medium"
                    />
                </div>
            </div>
        </div>
    )
}

export default Forgotpassword
