import { useRouter } from "next/router"
import React, { useContext, useEffect, useState } from "react"
import Image from "next/image"

import AuthContext from "../../contexts/AuthContext"

import Button from "../../components/body/button/button"
import Input from "../../components/body/input/input"
import Header from "../../components/header/header"

import styles from "./index.module.scss"

import userService from "../../services/user.service"
import Token from "../../components/token/token"

const Profil = () => {
    const router = useRouter()
    const { setUserContext, userContext } = useContext(AuthContext)
    const [user, setUser] = useState({})
    const [uploadFile, setUploadFile] = useState({})

    useEffect(() => {
        console.log(userContext, "USERCONTEXT")
        if (userContext && userContext.token) {
            userService
                .verifyToken(userContext.token)
                .then(data => {
                    if (!data.auth) {
                        router.push("/auth/login")
                    }
                })
                .catch(() => {
                    router.push("/auth/login")
                })
        } else {
            router.push("/auth/login")
        }
    }, [])

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
                setUser({ ...user, username: data.user.username })
            })
            .catch(err => console.log(err))
    }

    const handleSubmitPhoto = async e => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("file", uploadFile)
        formData.append("upload_preset", "ml_default")
        const response = await fetch(`http://localhost:5000/api/v1/upload/uploadfile/users`, {
            method: "POST",
            body: formData,
        })
        const data = await response.json()
        if (data.api_key) {
            console.log("l'image est possible")
            userService
                .updateuser(userContext.id, { image: data.secure_url })
                .then(() => {
                    setUserContext({ ...userContext, image: data.secure_url })
                })
                .catch(err => console.log(err))
        } else {
            console.log(data.message)
        }
        console.log(data)
    }
    const handleFileSelected = e => {
        setUploadFile(e.target.files[0])
    }

    useEffect(() => {
        if (userContext && userContext.image) {
            setUser({ ...user, image: userContext.image })
        }
    }, [userContext])

    const logout = () => {
        // localStorage.removeItem("user")
        // localStorage.getItem("user").clear()
        // while (typeof window !== undefined) {
        //     localStorage.clear()
        // }
        // localStorage.clear()
        // localStorage.clear()

        localStorage.removeItem("user")
        setUserContext(null)
        router.push("/")
    }

    return (
        <div className="width">
            <Header />
            <div className={styles.divprincipal}>
                <div className={styles.div}>
                    <img className="image-profil" src={user.image} alt="photo utilisateur" />

                    <form onSubmit={handleSubmitPhoto}>
                        <input type="file" name="image" onChange={handleFileSelected} />
                        <button type="submit">Changer photo</button>
                    </form>
                    <div className={styles.divbutton}>
                        <Button
                            className="btn btn-blue"
                            title="Voir mon profil public"
                            onClick={() => {
                                router.push("/profilpublic")
                            }}
                        />
                    </div>
                </div>
                <br />
                <div className={styles.div}>
                    <div className={styles.left}>
                        <Input
                            label="Nom d'utilisateur"
                            className={`input input-form`}
                            value={userContext && userContext.username ? userContext.username : ""}
                            onChange={e => {
                                setUser({ ...user, username: e.target.value })
                            }}
                        />
                    </div>
                    <div className={styles.right}>
                        <Button
                            className={`btn btn-orange`}
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
