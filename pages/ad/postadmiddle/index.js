import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"

import Button from "../../../components/body/button/button"
import Headerleft from "../../../components/header/headerleft/headerleft"
import Input from "../../../components/body/input/input"

import styles from "../index.module.scss"

const Index = () => {
    const router = useRouter()
    const [ad, setAd] = useState({})

    useEffect(() => {
        setAd(router.query)
    }, [])

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
                    <Input
                        onChange={e => {
                            setAd({ ...ad, description: e.target.value })
                        }}
                        label="Description de l'annonce"
                        className="input input-form height-big"
                    />
                    <br />
                    <div className={styles.button1}>
                        <Button
                            title="Retour"
                            className="btn-blue"
                            onClick={() => router.push("/ad/postad")}
                        />
                    </div>
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
                </div>
            </div>
        </div>
    )
}

export default Index
