import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"

import adService from "../../services/ad.service"

import Geobis from "../../components/body/geobis/geobis"
import Headerleft from "../../components/header/headerleft/headerleft"

import styles from "./index.module.scss"

const Index = () => {
    const router = useRouter()
    const [ad, setAd] = useState()

    useEffect(() => {
        adService.getAd(router.query.id).then(data => {
            setAd(data.ad)
        })
    }, [])

    return (
        <div className="width">
            <Headerleft postAdd={true} title="Détail du produit" />
            <Geobis />

            {ad ? (
                <div>
                    <h1 className="title-h0 text-center py-t">{ad.name}</h1>
                    <div className={styles.maindiv}>
                        <div className={styles.div}></div>
                        <img src={ad.image} alt="image product" />
                        <p>Prix : {ad.price}</p>
                        <p>Description : {ad.description}</p>
                        <p>Localisation : {ad.localization}</p>
                    </div>
                </div>
            ) : (
                ""
            )}
        </div>
    )
}

export default Index
