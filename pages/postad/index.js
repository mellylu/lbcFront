import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"

import Button from "../../components/body/button/button"
import Headerleft from "../../components/header/headerleft/headerleft"

import styles from "./index.module.scss"
import Input from "../../components/body/input/input"

const Index = () => {
    const router = useRouter()
    const [ad, setAd] = useState({})
    const [next1, setNext1] = useState(false)

    useEffect(() => {}, [next1])

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
                    <h3>Commençons par l essentiel !</h3>
                    <br />
                    <Input
                        label="Quel est le titre de l'annonce ?"
                        className="input input-form"
                        onChange={e => {
                            setAd({ ...ad, name: e.target.value })
                        }}
                    />
                    {ad.name && !next1 ? (
                        <Button
                            className="btn-orange"
                            title="Continuer"
                            onClick={() => {
                                setNext1(true)
                            }}
                        />
                    ) : (
                        <>
                            <Button className="btn-grey" title="Continuer" />
                        </>
                    )}

                    {next1 ? (
                        <div>
                            <br />
                            <hr></hr>
                            <br />
                            <h3>Choisissez une catégorie suggérée</h3>
                            <select name="pets" id="pet-select">
                                <option value="">--Please choose an option--</option>
                                <option value="dog">Dog</option>
                                <option value="cat">Cat</option>
                                <option value="hamster">Hamster</option>
                                <option value="parrot">Parrot</option>
                                <option value="spider">Spider</option>
                                <option value="goldfish">Goldfish</option>
                            </select>
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </div>
    )
}

export default Index
