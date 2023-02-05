import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"

import Button from "../../../components/body/button/button"
import Headerleft from "../../../components/header/headerleft/headerleft"

import styles from "../index.module.scss"
import Input from "../../../components/body/input/input"

const Index = () => {
    const router = useRouter()
    const [ad, setAd] = useState({})
    const [next, setNext] = useState(true)
    const [next1, setNext1] = useState(false)
    const [next2, setNext2] = useState(false)

    useEffect(() => {
        console.log(ad)
    }, [ad])
    useEffect(() => {
        console.log("dans useEffect")
    }, [ad.category])

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
                    {next ? (
                        <div>
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
                                    <select
                                        onClick={e => {
                                            setAd({ ...ad, category: e.target.value })
                                        }}
                                        name="pets"
                                        id="pet-select"
                                    >
                                        <option value="">--Please choose an option--</option>
                                        <option value="dog">Dog</option>
                                        <option value="cat">Cat</option>
                                        <option value="hamster">Hamster</option>
                                        <option value="parrot">Parrot</option>
                                        <option value="spider">Spider</option>
                                        <option value="goldfish">Goldfish</option>
                                    </select>
                                    <br />
                                    <Button
                                        title="Continuer"
                                        onClick={() => {
                                            setNext(false)
                                            setNext2(true)
                                        }}
                                        className="btn btn-blue"
                                    />
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                    ) : (
                        <div>
                            <div>
                                <br />
                                <h3>Dites nous en plus</h3>
                                <p>Univers</p>
                                <select
                                    onClick={e => {
                                        setAd({ ...ad, univers: e.target.value })
                                    }}
                                    name="pets"
                                    id="pet-select"
                                >
                                    <option value="">--Please choose an option--</option>
                                    <option value="dog">Dog</option>
                                    <option value="cat">Cat</option>
                                    <option value="hamster">Hamster</option>
                                    <option value="parrot">Parrot</option>
                                    <option value="spider">Spider</option>
                                    <option value="goldfish">Goldfish</option>
                                </select>
                                <br />
                                <p>Type</p>
                                <select
                                    onClick={e => {
                                        setAd({ ...ad, type: e.target.value })
                                    }}
                                    name="pets"
                                    id="pet-select"
                                >
                                    <option value="">--Please choose an option--</option>
                                    <option value="dog">Dog</option>
                                    <option value="cat">Cat</option>
                                    <option value="hamster">Hamster</option>
                                    <option value="parrot">Parrot</option>
                                    <option value="spider">Spider</option>
                                    <option value="goldfish">Goldfish</option>
                                </select>
                                <br />
                                <p>Marque</p>
                                <select
                                    onClick={e => {
                                        setAd({ ...ad, brand: e.target.value })
                                    }}
                                    name="pets"
                                    id="pet-select"
                                >
                                    <option value="">--Please choose an option--</option>
                                    <option value="dog">Dog</option>
                                    <option value="cat">Cat</option>
                                    <option value="hamster">Hamster</option>
                                    <option value="parrot">Parrot</option>
                                    <option value="spider">Spider</option>
                                    <option value="goldfish">Goldfish</option>
                                </select>
                                <br />
                                <p>Matière</p>
                                <select
                                    onClick={e => {
                                        setAd({ ...ad, material: e.target.value })
                                    }}
                                    name="pets"
                                    id="pet-select"
                                >
                                    <option value="">--Please choose an option--</option>
                                    <option value="dog">Dog</option>
                                    <option value="cat">Cat</option>
                                    <option value="hamster">Hamster</option>
                                    <option value="parrot">Parrot</option>
                                    <option value="spider">Spider</option>
                                    <option value="goldfish">Goldfish</option>
                                </select>
                                <br />
                                <p>Couleur</p>
                                <select
                                    onClick={e => {
                                        setAd({ ...ad, color: e.target.value })
                                    }}
                                    name="pets"
                                    id="pet-select"
                                >
                                    <option value="">--Please choose an option--</option>
                                    <option value="dog">Dog</option>
                                    <option value="cat">Cat</option>
                                    <option value="hamster">Hamster</option>
                                    <option value="parrot">Parrot</option>
                                    <option value="spider">Spider</option>
                                    <option value="goldfish">Goldfish</option>
                                </select>
                                <br />
                                <p>Etat</p>
                                <select
                                    onClick={e => {
                                        setAd({ ...ad, state: e.target.value })
                                    }}
                                    name="pets"
                                    id="pet-select"
                                >
                                    <option value="">--Please choose an option--</option>
                                    <option value="dog">Dog</option>
                                    <option value="cat">Cat</option>
                                    <option value="hamster">Hamster</option>
                                    <option value="parrot">Parrot</option>
                                    <option value="spider">Spider</option>
                                    <option value="goldfish">Goldfish</option>
                                </select>
                                <br />
                                <Button
                                    onClick={() => {
                                        setNext(true)
                                    }}
                                    className="btn-blue"
                                    title="Retour"
                                />
                                <Button
                                    onClick={() => {
                                        router.push({
                                            pathname: "/ad/postadmiddle",
                                            query: ad,
                                        })
                                    }}
                                    className="btn-blue"
                                    title="Suivant"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Index
