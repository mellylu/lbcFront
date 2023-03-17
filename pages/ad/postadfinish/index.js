import React, { useState, useEffect, useContext } from "react"
import { useRouter } from "next/router"
import Image from "next/image"

import Button from "../../../components/body/button/button"
import Headerleft from "../../../components/header/headerleft/headerleft"
import Input from "../../../components/body/input/input"

import adService from "../../../services/ad.service"
import userService from "../../../services/user.service"

import styles from "../index.module.scss"

import AuthContext from "../../../contexts/AuthContext"

const Index = () => {
    const router = useRouter()
    const [ad, setAd] = useState({})
    const [uploadFile, setUploadFile] = useState({})
    const { userContext } = useContext(AuthContext)
    const [cloudinaryImage, setCloudinaryImage] = useState("")
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        setAd(router.query)
    }, [])

    useEffect(() => {
        console.log(ad)
    }, [ad])

    const addAd = e => {
        e.preventDefault()
        adService
            .postAd(ad)
            .then(data => {
                console.log(data)
                getUserId(data.ad._id)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const getUserId = idAd => {
        const tab = []
        userService
            .getuser(userContext.id)
            .then(data => {
                console.log(data)
                data.user.announcement.forEach(element => {
                    tab.push({ ad: element.ad._id })
                })
                tab.push({ ad: idAd })
                addAdUser(tab)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const addAdUser = tab => {
        userService
            .updateuser(userContext.id, {
                announcement: tab,
            })
            .then(data => {
                console.log(data)
                router.push({
                    pathname: "/ad/postadsuccess",
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleSubmit = async e => {
        e.preventDefault()
        console.log(uploadFile, "file")
        const formData = new FormData()
        formData.append("file", uploadFile)
        formData.append("upload_preset", "ml_default")
        const response = await fetch(`http://localhost:5000/api/v1/upload/uploadfile`, {
            method: "POST",
            body: formData,
        })
        const data = await response.json()
        if (data.api_key) {
            console.log("l'image est possible")
            setCloudinaryImage(data)
            setAd({ ...ad, image: data.secure_url })
            setIsVisible(true)
        } else {
            console.log(data.message)
        }
        console.log(data)
    }

    const handleFileSelected = e => {
        setUploadFile(e.target.files[0])
    }

    const deleteImage = async () => {
        console.log(cloudinaryImage.public_id)
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
        }
    }

    return (
        <div className="width">
            <div className={styles.maindiv}>
                <Headerleft postAdd={true} />
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
                    <form onSubmit={handleSubmit}>
                        <input type="file" name="image" onChange={handleFileSelected} />
                        <button type="submit">Upload image</button>
                    </form>
                    {/* {cloudinaryImage && (
                        <Image
                            src={cloudinaryImage}
                            alt="image annonce"
                            className="image image-small"
                        />
                    )} */}
                    {cloudinaryImage.secure_url && <img src={cloudinaryImage.secure_url} />}
                    {isVisible ? (
                        <Button
                            title="Supprimer image"
                            onClick={() => {
                                deleteImage()
                            }}
                        />
                    ) : (
                        ""
                    )}
                    <br />
                    <Button
                        onClick={e => {
                            addAd(e)
                        }}
                        title="Ajouter l'annonce"
                        className="btn btn-blue"
                    />
                    <Button
                        onClick={() => {
                            router.push("ad/postad")
                        }}
                        title="Retour"
                        className="btn btn-blue"
                    />
                </div>
            </div>
        </div>
    )
}

export default Index
