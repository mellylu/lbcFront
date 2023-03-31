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
    const [oneCaracSpeMin, setOneCaracSpeMin] = useState(false)
    const [email, setEmail] = useState({})
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [isVisible1, setIsVisible1] = useState(true)
    const [isVisible2, setIsVisible2] = useState(false)
    const [isVisible3, setIsVisible3] = useState(false)
    const [isVisible4, setIsVisible4] = useState(false)
    const [isVisible5, setIsVisible5] = useState(false)
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
        if (randomNumber !== undefined && randomNumber !== null) {
            if (number.code !== undefined && number.code !== null) {
                if (number.code === randomNumber.toString()) {
                    setIsVisible1(false)
                    setIsVisible2(false)
                    setIsVisible3(true)
                }
            }
        }
    }, [number.code])

    useEffect(() => {
        if (user.password !== undefined) {
            var onenumber = /[0-9]+/
            var onecaracspe = /[^A-Za-z0-9_]/
            //var onenumber = /[a-z]+[0-9]+[a-z]+/
            if (user.password.length >= 8) {
                setEightcaracmin(true)
            } else {
                setEightcaracmin(false)
            }
            if (user.password.match(onenumber)) {
                setOneNumberMin(true)
            } else {
                setOneNumberMin(false)
            }
            if (user.password.match(onecaracspe)) {
                setOneCaracSpeMin(true)
            } else {
                setOneCaracSpeMin(false)
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

    const accountCreation = () => {
        userService
            .register(user)
            .then(data => {
                if (data.auth) {
                    setIsVisible4(false)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    const finishregister = () => {
        setIsVisible5(false)
        router.push("/auth/login")
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
                {isVisible3 ? (
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
                            <div>
                                <FiCheck color="grey" /> 8 caractères minimum
                            </div>
                        )}
                        {oneNumberMin ? (
                            <div>
                                <FiCheck color="green" /> 1 chiffre minimum
                            </div>
                        ) : (
                            <div>
                                <FiCheck color="grey" /> 1 chiffre minimum
                            </div>
                        )}
                        {oneCaracSpeMin ? (
                            <div>
                                <FiCheck color="green" /> 1 caractère spécial
                            </div>
                        ) : (
                            <div>
                                <FiCheck color="grey" /> 1 caractère spécial
                            </div>
                        )}
                        {eightcaracmin && oneNumberMin && oneCaracSpeMin ? (
                            <div>
                                <Button
                                    id="suivant"
                                    className="btn btn-orange"
                                    title="Suivant"
                                    onClick={() => {
                                        setIsVisible3(false)
                                        setIsVisible4(true)
                                    }}
                                />
                            </div>
                        ) : (
                            <div className={styles.divbutton}>
                                <Button id="suivant" className="btn btn-orange" title="Suivant" />
                            </div>
                        )}
                    </div>
                ) : (
                    ""
                )}

                {isVisible4 ? (
                    <div className={styles.divform}>
                        <p className="title-h1">Et pour finir, choisissez un nom d utilisateur</p>
                        <p className="title-h3">
                            Votre nom d utilisateur sera visible sur votre profil ainsi que sur vos
                            futures annonces. <br />
                            Vous pourrez le modifier quand vous le souhaitez !
                        </p>
                        <br />
                        <Input
                            label="Nom d'utilisateur"
                            className="input input-form"
                            required={true}
                            onChange={e => {
                                setUser({ ...user, username: e.target.value })
                            }}
                        />
                        <br />
                        <Button
                            className="btn btn-orange"
                            title="Créer un compte"
                            onClick={() => {
                                accountCreation()
                                setIsVisible4(false)
                                setIsVisible5(true)
                            }}
                        />
                    </div>
                ) : (
                    ""
                )}

                {isVisible5 ? (
                    <>
                        <div id="div1">ldsnldsnglsndkgn</div>
                        <div id="divtransient" className={styles.divform}>
                            <p className="title-h1 text-center">Création de compte réussi</p>
                            <br />
                            <p className="title-h3 text-center">
                                <FiCheck color="green" /> adresse mail vérifiée
                            </p>
                            <br />
                            <Button
                                className="btn-white"
                                title="ok"
                                onClick={() => {
                                    finishregister()
                                }}
                            />
                        </div>
                    </>
                ) : (
                    ""
                )}
            </div>
        </div>
    )
}

export default Index
