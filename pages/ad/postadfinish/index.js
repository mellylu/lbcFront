import React, { useState, useEffect, useContext } from "react"
import { useRouter } from "next/router"
import { AiOutlineClose } from "react-icons/ai"

import Button from "../../../components/body/button/button"
import Headerleft from "../../../components/header/headerleft/headerleft"
import Input from "../../../components/body/input/input"
import Geobis from "../../../components/body/geobis/geobis"

import adService from "../../../services/ad.service"
import userService from "../../../services/user.service"

import styles from "../index.module.scss"

import AuthContext from "../../../contexts/AuthContext"
import Message from "../../../components/body/message/message"

const Index = () => {
    const router = useRouter()
    const [ad, setAd] = useState({})
    const [uploadFile, setUploadFile] = useState({})
    const { userContext } = useContext(AuthContext)
    const [cloudinaryImage, setCloudinaryImage] = useState("")
    const [isVisible, setIsVisible] = useState(false)
    const [isError, setIsError] = useState(false)
    const [message, setMessage] = useState("")
    const [isVisible2, setIsVisible2] = useState(true)
    const [isChangeUploadFile, setIsChangeUploadFile] = useState(false)
    const idUser = []

    // useEffect(() => {
    //     setAd(router.query)
    //     console.log(ad)
    // }, [])

    useEffect(() => {
        if (!router.isReady) {
        } else {
            setAd(router.query)
        }
    }, [router.isReady])

    const addAd = e => {
        e.preventDefault()
        console.log(ad)
        adService
            .postAd(ad)
            .then(data => {
                setIsError(true)
                setMessage(data.message)
                getUserId(data.ad._id)
                addUserAd(data.ad._id)
            })
            .catch(err => {
                console.log(err, "err")
            })
    }

    const getUserId = idAd => {
        const tab = []
        userService
            .getuser(userContext.id)
            .then(data => {
                console.log(data)
                data.user.announcement.forEach(element => {
                    console.log(element)
                    tab.push({ ad: { _id: element.ad._id } })
                })
                tab.push({ ad: idAd })
                addAdUser(tab)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const addAdUser = tab => {
        console.log(tab)
        userService
            .updateuser(userContext.id, {
                announcement: tab,
            })
            .then(data => {
                console.log(data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const addUserAd = id => {
        console.log(id, "idAd")
        const obj = { user: { _id: userContext.id } }
        idUser.push(obj)
        adService
            .updateAd(id, { userad: idUser })
            .then(() => {
                router.push({
                    pathname: "/ad/postadsuccess",
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleSubmit = async () => {
        console.log(uploadFile, "file")
        const formData = new FormData()
        formData.append("file", uploadFile)
        formData.append("upload_preset", "ml_default")
        const response = await fetch(`http://localhost:5000/api/v1/upload/uploadfile/annonces`, {
            method: "POST",
            body: formData,
        })
        const data = await response.json()
        if (data.api_key) {
            setCloudinaryImage(data)
            setAd({ ...ad, image: data.secure_url })
            setIsVisible(true)
            setIsVisible2(false)
        } else {
            console.log(data.message)
        }
        console.log(data)
    }

    const handleFileSelected = e => {
        setIsChangeUploadFile(true)
        setUploadFile(e.target.files[0])
    }

    useEffect(() => {
        if (isChangeUploadFile) {
            handleSubmit()
        }
    }, [uploadFile])

    const deleteImage = async () => {
        const response = await fetch(
            `http://localhost:5000/api/v1/upload/` + cloudinaryImage.public_id,
            {
                method: "DELETE",
                headers: {
                    "content-type": "application/json",
                },
            },
        )
        const data = await response.json()
        if (data.message) {
            setCloudinaryImage("")
            setAd({ ...ad, image: "" })
            setIsVisible(false)
            setIsVisible2(true)
        }
    }

    return (
        <div className="width">
            <div className={styles.maindiv}>
                <Headerleft postAdd={true} title="Déposer un annonce" />
                <div className={styles.maindiv2}>
                    <Button
                        onClick={() => router.push("/")}
                        className="btn-white"
                        title="Quitter"
                    />
                </div>
            </div>
            <div className={styles.divform2}>
                <div className={styles.divform}>
                    <h3>Quel est votre prix ?</h3>
                    <br />
                    <Input
                        label="Votre prix de vente"
                        className="input input-form"
                        onChange={e => {
                            setAd({ ...ad, price: e.target.value })
                        }}
                    />
                    <br />
                    {isVisible2 ? (
                        <div>
                            <h3>Ajouter une image</h3>
                            <div className={`${styles.fileupload} ${styles.file}`}>
                                <link
                                    href="https://fonts.googleapis.com/icon?family=Material+Icons"
                                    rel="stylesheet"
                                ></link>
                                <input
                                    id="file"
                                    //className={styles.inputfile}
                                    type="file"
                                    onChange={e => handleFileSelected(e)}
                                />{" "}
                                <label for="file" className={`${styles.label} btn btn-grey1`}>
                                    <i class="material-icons">backup</i>
                                    <strong className={styles.strong}>{"Choisir une image"}</strong>
                                </label>
                            </div>
                        </div>
                    ) : (
                        ""
                    )}

                    <div>
                        {isVisible ? (
                            <div className={styles.buttonCroix}>
                                <Button
                                    onClick={() => {
                                        deleteImage()
                                    }}
                                    className={`btn btn-link `}
                                >
                                    <AiOutlineClose size={20} />
                                </Button>
                            </div>
                        ) : (
                            ""
                        )}
                        {cloudinaryImage.secure_url && <img src={cloudinaryImage.secure_url} />}
                    </div>

                    {/* <br />
                    <Button
                        title="Next"
                        onClick={() => {
                            setIsVisible2(true)
                        }}
                    />
                    {isVisible2 ? ( */}
                    <div>
                        <h3>Localisation</h3>
                        <Geobis setAd={setAd} ad={ad} />
                    </div>
                    <br />
                    {isError ? <Message type="error" mess={message} /> : ""}

                    <Button
                        onClick={e => {
                            addAd(e)
                        }}
                        title="Ajouter l'annonce"
                        className="btn btn-blue"
                    />
                </div>
            </div>
        </div>
    )
}

export default Index
