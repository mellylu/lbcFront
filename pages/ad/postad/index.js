import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"

import Button from "../../../components/body/button/button"
import Headerleft from "../../../components/header/headerleft/headerleft"
import Input from "../../../components/body/input/input"

import styles from "../index.module.scss"

import filterService from "../../../services/filter.service"

const Index = () => {
    const router = useRouter()
    const [ad, setAd] = useState({})
    const [next, setNext] = useState(true)
    const [next1, setNext1] = useState(false)
    const [filter, setFilter] = useState([])

    const filterAd = () => {
        filterService
            .getElement(ad.category)
            .then(data => {
                setFilter(data.filter[0])
            })
            .catch(err => console.log(err))
    }
    const xx = () => {
        console.log(ad)
        router.push({
            pathname: "/ad/postAd2",
            query: filter,
        })
    }

    useEffect(() => {
        console.log(ad)
    }, [ad])

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
                                    <option value="Vêtement">Vêtement</option>
                                    <option value="Maison">Maison</option>
                                </select>
                                <br />
                                <Button
                                    title="Continuer"
                                    onClick={() => {
                                        filterAd()
                                    }}
                                    className="btn btn-blue"
                                />
                                <Button
                                    title="Envoyer"
                                    onClick={() => {
                                        xx()
                                    }}
                                    className="btn btn-blue"
                                />
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index
