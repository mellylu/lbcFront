import React, { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/router"
import { FiCheck } from "react-icons/fi"

import userService from "../../../services/user.service"

import Input from "../../../components/body/input/input"
import Button from "../../../components/body/button/button"
import Headerform from "../../../components/header/headerform/headerform"

import styles from "../index.module.scss"

import ImgChangePassword from "../../../public/change-password.png"
import Verifpassword from "../../../components/body/verifpassword/verifpassword"

const Resetpassword = () => {
    const router = useRouter()
    const [password, setPassword] = useState({})
    const [validPassword, setValidPassword] = useState(false)
    const [message, setMessage] = useState()
    const [idToken, setIdToken] = useState()
    const [eightcaracmin, setEightcaracmin] = useState(false)
    const [oneNumberMin, setOneNumberMin] = useState(false)
    const [oneCaracSpeMin, setOneCaracSpeMin] = useState(false)

    useEffect(() => {
        const url = window.location.search
        const paramUrl = url.split("=")
        const token = paramUrl[1]
        userService
            .formResetPassword(token)
            .then(data => {
                setIdToken(data.data.userId)
            })
            .catch(err => {
                router.push("/")
                console.log(err)
            })
    })

    useEffect(() => {
        if (password.password !== undefined) {
            var onenumber = /[0-9]+/
            var onecaracspe = /[^A-Za-z0-9_]/
            //var onenumber = /[a-z]+[0-9]+[a-z]+/
            if (password.password.length >= 8) {
                setEightcaracmin(true)
            } else {
                setEightcaracmin(false)
            }
            if (password.password.match(onenumber)) {
                setOneNumberMin(true)
            } else {
                setOneNumberMin(false)
            }
            if (password.password.match(onecaracspe)) {
                setOneCaracSpeMin(true)
            } else {
                setOneCaracSpeMin(false)
            }
        }
    }, [password.password])

    const handleSubmit = e => {
        e.preventDefault()
        console.log(idToken)
        userService
            .update(idToken, password)
            .then(() => {
                router.push("/auth/login")
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div className="width">
            <Headerform title="Connexion" />
            <div className={styles.divtitle4}>
                <div>
                    <p className="title-h1">Modifier mon mot de passe</p>
                    <br />
                    <Input
                        label="Nouveau mot de passe"
                        required
                        type="password"
                        className="input input-form"
                        onChange={e => {
                            setPassword({ ...password, password: e.target.value })
                        }}
                    />
                    <br />
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
                        <Button
                            className="btn-orange"
                            title="Continuer"
                            onClick={e => handleSubmit(e)}
                        />
                    ) : (
                        <>
                            <Button className="btn-grey" title="Continuer" />
                        </>
                    )}
                </div>
                <div>
                    <Image
                        src={ImgChangePassword}
                        alt="Image mot de passe oublié"
                        className="image image-medium"
                    />
                </div>
            </div>
        </div>
    )
}

export default Resetpassword
