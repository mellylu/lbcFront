import React, { useState, useEffect, useContext } from "react"
import { useRouter } from "next/router"

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
    const [file, setfile] = useState([])
    const { userContext } = useContext(AuthContext)

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

    useEffect(() => {
        console.log(file)
    }, [file])

    const handleSubmit = async e => {
        e.preventDefault()
        // upload image
    }

    const handleFileSelected = e => {
        setfile(e.target.files[0])
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
                    {/* https://stacklima.com/telecharger-et-recuperer-une-image-sur-mongodb-a-l-aide-de-mongoose/ */}
                    <form onSubmit={handleSubmit}>
                        <input type="file" name="image" onChange={handleFileSelected} />
                        <button type="submit">Upload image</button>
                    </form>
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
