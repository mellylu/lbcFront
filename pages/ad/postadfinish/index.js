import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"

import Button from "../../../components/body/button/button"
import Headerleft from "../../../components/header/headerleft/headerleft"
import Input from "../../../components/body/input/input"

import adService from "../../../services/ad.service"

import styles from "../index.module.scss"

const Index = () => {
    const router = useRouter()
    const [ad, setAd] = useState({})

    useEffect(() => {
        setAd(router.query)
    }, [])

    useEffect(() => {
        console.log(ad)
    }, [ad])

    const addAd = e => {
        console.log("ppppppppp")
        e.preventDefault()
        adService
            .postAd(ad)
            .then(data => {
                console.log(data)
            })
            .catch(err => {
                console.log(err)
            })
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
