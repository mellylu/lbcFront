import { useRouter } from "next/router"
import React, { useContext, useEffect, useState } from "react"

import AuthContext from "../../contexts/AuthContext"

import Button from "../../components/body/button/button"
import Input from "../../components/body/input/input"
import Header from "../../components/header/header"

import PhotoProfil from "../../public/photoProfil.jpg"

import styles from "./index.module.scss"

import userService from "../../services/user.service"
import Image from "next/image"

const Profil = () => {
    const router = useRouter()
    const { setUserContext, userContext } = useContext(AuthContext)
    const [user, setUser] = useState({ username: userContext?.username || "" })
    const [uploadFile, setUploadFile] = useState({})
    const [isChangeUploadFile, setIsChangeUploadFile] = useState(false)
    const [isUserImage, setIsUserImage] = useState(false)
    let cpt = 0
    useEffect(() => {
        if (userContext && userContext.token) {
            userService
                .verifyToken(userContext.token)
                .then(data => {
                    if (!data.auth) {
                        router.push("/auth/login")
                    } else {
                        if (userContext.image) {
                            setIsUserImage(true)
                        } else {
                            setIsUserImage(false)
                        }
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
        userService
            .updateuser(userContext.id, user)
            .then(data => {
                setUserContext({ ...userContext, username: data.user.username })
                setUser({ ...user, username: data.user.username })
            })
            .catch(err => console.log(err))
    }

    const deleteImage = publicid => {
        console.log(publicid, "publicidSSS")
        fetch(`http://localhost:5000/api/v1/upload/` + publicid, {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
            },
        })
            .then(() => {})
            .catch(err => console.log(err))
    }

    const handleSubmitPhoto = async () => {
        let publicid = ""
        if (userContext && userContext.image) {
            let imgdelete = userContext.image.split("/users/")[1]
            publicid = "users/" + imgdelete.split(".")[0]
            console.log(publicid, "publicid")
        }
        const formData = new FormData()
        formData.append("file", uploadFile)
        formData.append("upload_preset", "ml_default")
        const response = await fetch(`http://localhost:5000/api/v1/upload/uploadfile/users`, {
            method: "POST",
            body: formData,
        })
        const data = await response.json()
        if (data.api_key) {
            userService
                .updateuser(userContext.id, { image: data.secure_url })
                .then(() => {
                    setUserContext({ ...userContext, image: data.secure_url })
                })
                .catch(err => console.log(err))
        } else {
        }
        if (userContext && userContext.image) {
            deleteImage(publicid)
        }
    }
    const handleFileSelected = e => {
        cpt = 0
        setIsChangeUploadFile(true)
        setUploadFile(e.target.files[0])
    }

    useEffect(() => {
        if (isChangeUploadFile) {
            handleSubmitPhoto()
            setIsChangeUploadFile(false)
        }
    }, [uploadFile])

    useEffect(() => {
        if (userContext && userContext.image) {
            setUser({ ...user, image: userContext.image })
        }
    }, [userContext])

    const logout = () => {
        localStorage.removeItem("user")
        // localStorage.setItem("user", null)
        // setUserContext()
        router.push("/home")
    }

    return (
        <div className="width">
            <Header />
            <div className={styles.divprincipal}>
                <div>
                    <input
                        id="file"
                        className={styles.inputfile}
                        type="file"
                        onChange={e => handleFileSelected(e)}
                    />
                    {/* <Input title="+" type="file" onChange={e => handleFileSelected(e)} /> */}

                    {isUserImage ? (
                        <div>
                            <div className={styles.imageProfil}>
                                <img
                                    className="image-profil"
                                    src={user.image}
                                    alt="photo utilisateur"
                                />
                            </div>
                            <br />
                            <div>
                                <label for="file" className={`${styles.labelfile} btn btn-white`}>
                                    {"Changer d'image"}
                                </label>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div className={styles.imageProfil}>
                                <Image
                                    className="image-profil"
                                    src={PhotoProfil}
                                    alt="pas de photo utilisateur"
                                />
                            </div>
                            <br />
                            <div>
                                <label for="file" className={`${styles.labelfile} btn btn-white`}>
                                    {"Changer d'image"}
                                </label>
                            </div>
                        </div>
                    )}
                </div>
                <br />
                <div className={styles.div}>
                    <div>
                        <Input
                            className={`input input-profil`}
                            value={(user && user.username) || ""}
                            onChange={e => {
                                setUser({ ...user, username: e.target.value })
                            }}
                        />
                    </div>

                    <div className={styles.btnChangeUserName}>
                        <Button
                            className={`btn btn-blue`}
                            title="Changer nom du profil"
                            onClick={e => {
                                handleSubmit(e)
                            }}
                        />
                    </div>
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
