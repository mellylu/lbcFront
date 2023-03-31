import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"

import Button from "../../../components/body/button/button"
import Headerleft from "../../../components/header/headerleft/headerleft"
import Input from "../../../components/body/input/input"

import styles from "../index.module.scss"

const Index = () => {
    const router = useRouter()
    const [ad, setAd] = useState({})
    const [isNbSupCharacterMin, setIsSupNbCharacterMin] = useState(false)
    const [isNbInfCharacterMax, setIsNbInfCharacterMax] = useState(false)

    useEffect(() => {
        if (!router.isReady) {
        } else {
            setAd(router.query)
        }
    }, [router.isReady])

    useEffect(() => {
        if (ad.description && ad.description.length >= 100) {
            setIsSupNbCharacterMin(true)
        } else {
            setIsSupNbCharacterMin(false)
        }
        if (ad.description && ad.description.length <= 400) {
            setIsNbInfCharacterMax(true)
        } else {
            setIsNbInfCharacterMax(false)
        }
    })

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
                <br />
                <div className={`${styles.divform} bgcolor-grey`}>
                    <br />
                    <h3>Décrivez votre bien !</h3>
                    <Input
                        value={ad.name ? ad.name : ""}
                        onChange={e => {
                            setAd({ ...ad, name: e.target.value })
                        }}
                        label="Titre de l'annonce"
                        className="input input-form"
                    />
                    <br />
                    <label>{"Description de l'annonce"}</label>
                    <textarea
                        className="input input-form height-big"
                        onChange={e => {
                            setAd({ ...ad, description: e.target.value })
                        }}
                    ></textarea>

                    <br />
                    {isNbSupCharacterMin && isNbInfCharacterMax ? (
                        <div className={styles.button2}>
                            <Button
                                onClick={() =>
                                    router.push({
                                        pathname: "/ad/postadfinish",
                                        query: ad,
                                    })
                                }
                                title="Continuer"
                                className="btn-blue"
                            />
                        </div>
                    ) : (
                        <div>
                            <p className="color-red title-h6">
                                * La description doit contenir entre 100 et 00 caractères
                            </p>
                            <>
                                <Button className="btn-grey" title="Continuer" />
                            </>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Index
