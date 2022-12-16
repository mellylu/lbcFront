import { useRouter } from "next/router"
import React, { useState, useEffect } from "react"
import Image from "next/image"
import { FiCheck } from "react-icons/fi"

import Button from "../../../components/body/button/button"
import Input from "../../../components/body/input/input"
import Headerform from "../../../components/header/headerform/headerform"

import Background from "../../../public/login-illustration.png"

import userService from "../../../services/user.service"

import styles from "../index.module.scss"
import Message from "../../../components/body/message/message"

const Index = () => {
    const router = useRouter()
    const [user, setUser] = useState({})
    const [validEmail, setValidEmail] = useState(false)
    const [eightcaracmin, setEightcaracmin] = useState(false)
    const [oneNumberMin, setOneNumberMin] = useState(false)
    const [email, setEmail] = useState({})
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [isVisible1, setIsVisible1] = useState(true)
    const [isVisible2, setIsVisible2] = useState(false)
    const [isVisible3, setIsVisible3] = useState(false)
    const [isVisible4, setIsVisible4] = useState(false)
    const [number, setNumber] = useState({})
    const [randomNumber, setRandomNumber] = useState()
    const [newSendEmail, setNewSendEmail] = useState(false)

    useEffect(() => {
        console.log("Dans le useEffect")
        setIsVisible1(true)
        setIsVisible2(false)
        setIsVisible3(false)
        setIsVisible4(false)
    }, [])

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

    useEffect(() => {
        console.log(randomNumber)
        console.log(number.code)
        console.log(randomNumber === number.code)
        if (randomNumber !== undefined && randomNumber !== null) {
            console.log("1111111")
            if (number.code !== undefined && number.code !== null) {
                console.log("222222222")
                if (number.code === randomNumber) {
                    console.log("3333333333")
                    setIsVisible1(false)
                    setIsVisible2(false)
                    setIsVisible3(true)
                }
            }
        }
    }, [number.code])

    useEffect(() => {
        if (user.password !== undefined) {
            var onenumber = /[a-z]+[0-9]+[a-z]+/
            if (user.password.length >= 8) {
                setEightcaracmin(true)
                console.log("11111111111")
            } else {
                setEightcaracmin(false)
            }
            if (user.password.match(onenumber)) {
                setOneNumberMin(true)
                console.log("2222222222")
            } else {
                setOneNumberMin(false)
            }
        }
    }, [user.password])

    const sendCode = () => {
        console.log("DANS LE SEND CODE")
        userService
            .verifyemail(email)
            .then(data => {
                setRandomNumber(data.number)
            })
            .catch(err => {
                console.log(err)
            })
    }

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
                    sendCode()
                    setIsVisible1(false)
                    setIsVisible2(true)
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
                {isVisible1 ? (
                    <div className={styles.divform}>
                        <p className="title-h1">Commençons par un email</p>
                        <form>
                            <Input
                                label="E-mail"
                                className="input input-form"
                                required={true}
                                onChange={e => {
                                    setEmail({ ...email, email: e.target.value })
                                    console.log(email)
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
                ) : (
                    ""
                )}
                {isVisible2 ? (
                    <div className={styles.divform}>
                        <p className="title-h1">Vérifions ensemble votre email</p>
                        <p className="title-h3">Saisissez le code reçu à l adresse email :</p>
                        <p className="title-h3">{user.email}</p>
                        <br />
                        <Input
                            className="input input-form"
                            required={true}
                            onChange={e => {
                                setNumber({ ...number, code: e.target.value })
                            }}
                        />
                        <div>
                            Je n ai rien reçu :
                            <Button
                                title="me renvoyer le code"
                                className="btn btn-link"
                                onClick={() => {
                                    sendCode()
                                }}
                            />
                        </div>
                        {newSendEmail ? <Message type="valid" mess="Un mail a été renvoyé" /> : ""}
                    </div>
                ) : (
                    ""
                )}
                {isVisible3 && isVisible1 === false && isVisible2 === false ? (
                    <div className={styles.divform}>
                        <p className="title-h1">Définissez votre mot de passe</p>
                        <p className="title-h3">
                            Choisissez un mot de passe que vous n utilisez nulle part ailleurs
                        </p>
                        <Input
                            label="Mot de passe"
                            type="password"
                            className="input input-form"
                            required={true}
                            onChange={e => {
                                setUser({ ...user, password: e.target.value })
                            }}
                        />
                        {eightcaracmin ? (
                            <div>
                                <FiCheck color="green" /> 8 caractères minimum
                            </div>
                        ) : (
                            ""
                        )}
                        {oneNumberMin ? (
                            <div>
                                <FiCheck color="green" /> 1 chiffre minimum
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                ) : (
                    ""
                )}

                {isVisible4 ? (
                    <div className={styles.divform}>
                        <p className="title-h1">Nom d utilisateur</p>
                        <p className="title-h3">
                            Votre nom d utilisateur sera visible sur votre profil ainsi que sur vos
                            futures annonces. Vous pourrez le modifier quand vous le souhaitez !
                        </p>
                    </div>
                ) : (
                    ""
                )}
            </div>
        </div>
    )
}

export default Index
