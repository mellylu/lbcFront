import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"

import adService from "../../../services/ad.service"

import Geo from "../../../components/body/geo/geo"
import Header from "../../../components/header/header"
import Button from "../../../components/body/button/button"

import styles from "./index.module.scss"

const Index = () => {
    const router = useRouter()
    const [ad, setAd] = useState()
    const {
        query: { id },
    } = router

    useEffect(() => {
        if (!router.isReady) {
            console.log("FFFFFFFFFFFF")
        } else {
            adService.getAd(id).then(data => {
                setAd(data.ad)
            })
        }
    }, [router.isReady])

    return (
        <div className="width">
            <Header />
            <h1>{id}</h1>
            <div className={styles.div}>
                {ad ? (
                    <div className={styles.div1}>
                        <div>
                            <img className="image-medium" src={ad.image} alt="image product" />

                            <h1 className="title-h0 text-left py-l py-t">{ad.name}</h1>
                            <p className="text-left py-l title-h3">Ville</p>
                            <p className="text-left py-l title-h2">Prix : {ad.price}</p>
                            <p className="text-left py-l title-h4">Date xx/xx/xxxx à xx:xx</p>
                            <p>_____________________________________________________________</p>
                            <p>_____________________________________________________________</p>
                            <p className="text-left py-l title-h3">
                                Description <br />
                                {ad.description}
                                <br />
                            </p>
                        </div>
                        {/* <p>Localisation : {ad.localization}</p> */}
                    </div>
                ) : (
                    ""
                )}

                <div className={styles.div2}>
                    <div className={styles.div3}>
                        <p>Propriétaire</p>
                        <Button
                            title="Envoyer un message"
                            className="btn btn-blue"
                            onClick={() => {}}
                        />
                    </div>
                </div>
            </div>
            <br />
            {ad ? <Geo localization={ad.localization} /> : <Geo />}
        </div>
    )
}

export default Index
