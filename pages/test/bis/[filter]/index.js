import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"

import adService from "../../../../services/ad.service"

import styles from "./index.module.scss"
import Announcement from "../../../../components/body/announcement/announcement"
import Modal from "../../../../components/body/modal/modal"
import Header from "../../../../components/header/header"
import Button from "../../../../components/body/button/button"
import filterService from "../../../../services/filter.service"
import Secondfilter from "../../../../components/body/filter/secondfilter/secondfilter"

const Index = () => {
    const router = useRouter()
    const [ad, setAd] = useState({})
    const [sort, setSort] = useState("")
    const [secondFilter, setSecondFilter] = useState([])
    const [isVisibleSecondFilter, setIsVisibleSecondFilter] = useState(false)
    const [univers, setUnivers] = useState([])
    const [size, setSize] = useState([])
    const [type, setType] = useState([])
    const [brand, setBrand] = useState([])
    const [material, setMaterial] = useState([])
    const [color, setColor] = useState([])
    const [state, setState] = useState([])

    const filter = router.query
    let tab = []

    useEffect(() => {
        if (!router.isReady) {
        } else {
            console.log(router)
            console.log(type, "type")
            adService
                .getAllFilter(
                    filter.category || "",
                    filter.search || "",
                    filter.lat || "",
                    filter.lng || "",
                    filter.page || "",
                    sort || router.query.sort || "",
                    type.toString() || router.query.type || "",
                )
                .then(data => {
                    setAd(data)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }, [router || router.isReady])

    useEffect(() => {
        if (sort && sort !== "") {
            router.query.sort = sort
            router.push(router)
        }
    }, [sort])

    const nextPage = () => {
        filter.page = parseInt(filter.page)
        filter.page = filter.page + 1
        router.query.page = filter.page
        router.push(router)
    }

    const previousPage = () => {
        filter.page = parseInt(filter.page)
        filter.page = filter.page - 1
        router.query.page = filter.page
        router.push(router)
    }

    const choiceFilter = () => {
        filterService
            .getElement(filter.category || "")
            .then(data => {
                setSecondFilter(data.filter)
                setIsVisibleSecondFilter(true)
            })
            .catch(err => {})
    }

    const searchFilter = () => {
        if (type) {
            router.query.type = type.toString()
            router.push(router)
        }
        if (univers) {
            router.query.univers = univers.toString()
            router.push(router)
        }
        if (size) {
            router.query.size = size.toString()
            router.push(router)
        }
        if (color) {
            router.query.color = color.toString()
            router.push(router)
        }
        if (brand) {
            router.query.brand = brand.toString()
            router.push(router)
        }
        if (material) {
            router.query.material = material.toString()
            router.push(router)
        }
        if (state) {
            router.query.state = state.toString()
            router.push(router)
        }
        setIsVisibleSecondFilter(false)
    }

    return (
        <div className="width">
            <Header />

            <Modal
                title={true}
                text="Des millions de petites annonces et autant d occasions de se faire plaisir"
            >
                <div className={styles.maindiv}>
                    <div className={styles.div}>
                        <div className={`${styles.searchdiv}`}>
                            <div>
                                <h2>Votre recherche est .... à ....</h2>
                            </div>
                            <select
                                onChange={e => {
                                    setSort(e.target.value)
                                }}
                                name="pets"
                                id="pet-select"
                                className={`input input-form ${styles.select}`}
                            >
                                <option value="" disabled selected hidden>
                                    Choix du tri
                                </option>
                                <option value="name">Titre</option>
                                <option value="price">Prix</option>
                            </select>
                            <Button
                                title="Choix des filtres"
                                onClick={() => {
                                    choiceFilter()
                                }}
                            />
                            {isVisibleSecondFilter ? (
                                <div className="bg bg-grey">
                                    <Secondfilter
                                        secondFilter={secondFilter}
                                        type={type}
                                        setType={setType}
                                        color={color}
                                        setColor={setColor}
                                        univers={univers}
                                        setUnivers={setUnivers}
                                        size={size}
                                        setSize={setSize}
                                        brand={brand}
                                        setBrand={setBrand}
                                        material={material}
                                        setMaterial={setMaterial}
                                        state={state}
                                        setState={setState}
                                    />
                                    <Button
                                        className="btn btn-orange"
                                        title="Rechercher"
                                        onClick={() => searchFilter()}
                                    />
                                </div>
                            ) : (
                                ""
                            )}
                            <Announcement stateElement={ad.ad} />
                            <br />
                            {ad.top && !ad.bottom ? (
                                <Button
                                    className="btn btn-orange"
                                    title="page précédente"
                                    onClick={() => previousPage()}
                                />
                            ) : ad.bottom && !ad.top ? (
                                <Button
                                    className="btn btn-orange"
                                    title="page suivante"
                                    onClick={() => nextPage()}
                                />
                            ) : ad.top && ad.bottom ? (
                                <div></div>
                            ) : (
                                <div>
                                    <Button
                                        className="btn btn-orange"
                                        title="page précédente"
                                        onClick={() => previousPage()}
                                    />
                                    <Button
                                        className="btn btn-orange"
                                        title="page suivante"
                                        onClick={() => nextPage()}
                                    />
                                </div>
                            )}
                            <Button title="Nouvelle recherche" onClick={() => {}} />
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default Index
