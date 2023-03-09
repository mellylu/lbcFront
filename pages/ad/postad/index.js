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

    useEffect(() => {
        console.log(ad)
    }, [ad])

    const filterAd = () => {
        filterService
            .getElement(ad.category)
            .then(data => {
                setFilter(data.filter[0])
            })
            .catch(err => console.log(err))
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
                                        <option value="Vêtement">Vêtement</option>
                                        <option value="Maison">Maison</option>
                                    </select>
                                    <br />
                                    <Button
                                        title="Continuer"
                                        onClick={() => {
                                            filterAd()
                                            setNext(false)
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

                                {filter.type !== undefined && filter.type.length > 0 ? (
                                    <div>
                                        <p>Type</p>
                                        <select
                                            onClick={e => {
                                                setAd({ ...ad, type: e.target.value })
                                            }}
                                            name="pets"
                                            id="pet-select"
                                        >
                                            <option value="">--Please choose an option--</option>
                                            {filter.type.map(element => (
                                                <option key={element} value={element}>
                                                    {element}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                ) : (
                                    ""
                                )}

                                {filter.univers !== undefined && filter.univers.length > 0 ? (
                                    <div>
                                        <p>Univers</p>
                                        <select
                                            onClick={e => {
                                                setAd({ ...ad, univers: e.target.value })
                                            }}
                                            name="pets"
                                            id="pet-select"
                                        >
                                            <option value="">--Please choose an option--</option>
                                            {filter.univers.map(element => (
                                                <option key={element} value={element}>
                                                    {element}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                ) : (
                                    ""
                                )}

                                {filter.brand !== undefined && filter.brand.length > 0 ? (
                                    <div>
                                        <p>Marque</p>
                                        <select
                                            onClick={e => {
                                                setAd({ ...ad, brand: e.target.value })
                                            }}
                                            name="pets"
                                            id="pet-select"
                                        >
                                            <option value="">--Please choose an option--</option>
                                            {filter.brand.map(element => (
                                                <option key={element} value={element}>
                                                    {element}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                ) : (
                                    ""
                                )}

                                {filter.material !== undefined && filter.material.length > 0 ? (
                                    <div>
                                        <p>Matière</p>
                                        <select
                                            onClick={e => {
                                                setAd({ ...ad, material: e.target.value })
                                            }}
                                            name="pets"
                                            id="pet-select"
                                        >
                                            <option value="">--Please choose an option--</option>
                                            {filter.material.map(element => (
                                                <option key={element} value={element}>
                                                    {element}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                ) : (
                                    ""
                                )}

                                {filter.color !== undefined && filter.color.length > 0 ? (
                                    <div>
                                        <p>Couleur</p>
                                        <select
                                            onClick={e => {
                                                setAd({ ...ad, color: e.target.value })
                                            }}
                                            name="pets"
                                            id="pet-select"
                                        >
                                            <option value="">--Please choose an option--</option>
                                            {filter.color.map(element => (
                                                <option key={element} value={element}>
                                                    {element}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                ) : (
                                    ""
                                )}

                                {filter.state !== undefined && filter.state.length > 0 ? (
                                    <div>
                                        <p>Etat</p>
                                        <select
                                            onClick={e => {
                                                setAd({ ...ad, state: e.target.value })
                                            }}
                                            name="pets"
                                            id="pet-select"
                                        >
                                            <option value="">--Please choose an option--</option>
                                            {filter.state.map(element => (
                                                <option key={element} value={element}>
                                                    {element}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                ) : (
                                    ""
                                )}

                                {filter.size !== undefined && filter.size.length > 0 ? (
                                    <div>
                                        <p>Taille</p>
                                        <select
                                            onClick={e => {
                                                setAd({ ...ad, size: e.target.value })
                                            }}
                                            name="pets"
                                            id="pet-select"
                                        >
                                            <option value="">--Please choose an option--</option>
                                            {filter.size.map(element => (
                                                <option key={element} value={element}>
                                                    {element}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                ) : (
                                    ""
                                )}

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
