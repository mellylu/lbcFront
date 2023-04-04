import React, { useState, useEffect, useContext } from "react"
import { useRouter } from "next/router"

import FilterContext from "../../../../contexts/FilterContext"
import AuthContext from "../../../../contexts/AuthContext"

import adService from "../../../../services/ad.service"
import filterService from "../../../../services/filter.service"

import styles from "./index.module.scss"

import Announcement from "../../../../components/body/announcement/announcement"
import Modal from "../../../../components/body/modal/modal"
import Header from "../../../../components/header/header"
import Button from "../../../../components/body/button/button"
import Secondfilter from "../../../../components/body/filter/secondfilter/secondfilter"
import Footer from "../../../../components/footer/footer"

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

    const prepareFiltreUseEffect = (routerQueryElement, setStateEl, stateEl, isTrue) => {
        tab = []
        if (isTrue) {
            if (routerQueryElement) {
                setStateEl([routerQueryElement])
            }
        }
        if (routerQueryElement) {
            let TypeSplit = routerQueryElement.split(",")
            if (TypeSplit.length === 1) {
                setStateEl([routerQueryElement])
            } else if (TypeSplit.length > 1) {
                TypeSplit.forEach(element => {
                    if (stateEl.indexOf(element) === -1) {
                        tab.push(element)
                    }
                })
                setStateEl(tab)
            }
        }
    }

    useEffect(() => {
        if (!router.isReady) {
        } else {
            prepareFiltreUseEffect(router.query.type, setType, type, true)
            prepareFiltreUseEffect(router.query.material, setMaterial, material, true)
            prepareFiltreUseEffect(router.query.color, setColor, color, true)
            prepareFiltreUseEffect(router.query.state, setState, state, true)
            prepareFiltreUseEffect(router.query.univers, setUnivers, univers, true)
            prepareFiltreUseEffect(router.query.size, setSize, size, true)
            prepareFiltreUseEffect(router.query.brand, setBrand, brand, true)
            setSort(router.query.sort)
            adService
                .getAllFilter(
                    filter.category || "",
                    filter.search || "",
                    filter.lat || "",
                    filter.lng || "",
                    filter.page || "",
                    router.query.sort || "",
                    router.query.type || "",
                    router.query.material || "",
                    router.query.color || "",
                    router.query.state || "",
                    router.query.univers || "",
                    router.query.size || "",
                    router.query.brand || "",
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
        if (isVisibleSecondFilter) {
            setIsVisibleSecondFilter(false)
        } else {
            filterService
                .getElement(filter.category || "")
                .then(data => {
                    setSecondFilter(data.filter)
                    setIsVisibleSecondFilter(true)
                })
                .catch(err => {})
        }
    }

    const searchFilter = () => {
        if (type.length !== 0) {
            router.query.type = type.filter(element => element !== undefined).toString()
        } else {
            if (router.query.type) {
                if (type.length === 0) {
                    delete router.query.type
                }
            }
        }
        prepareFiltreUseEffect(router.query.type, setType, type, false)
        if (material.length !== 0) {
            router.query.material = material.filter(element => element !== undefined).toString()
        } else {
            if (router.query.material) {
                if (material.length === 0) {
                    delete router.query.material
                }
            }
        }
        prepareFiltreUseEffect(router.query.material, setMaterial, material, false)
        if (color.length !== 0) {
            router.query.color = color.filter(element => element !== undefined).toString()
        } else {
            if (router.query.color) {
                if (color.length === 0) {
                    delete router.query.color
                }
            }
        }
        prepareFiltreUseEffect(router.query.color, setColor, color, false)
        if (state.length !== 0) {
            router.query.state = state.filter(element => element !== undefined).toString()
        } else {
            if (router.query.state) {
                if (state.length === 0) {
                    delete router.query.state
                }
            }
        }
        prepareFiltreUseEffect(router.query.state, setState, state, false)
        if (univers.length !== 0) {
            router.query.univers = univers.filter(element => element !== undefined).toString()
        } else {
            if (router.query.univers) {
                if (univers.length === 0) {
                    delete router.query.univers
                }
            }
        }
        prepareFiltreUseEffect(router.query.univers, setUnivers, univers, false)
        if (size.length !== 0) {
            router.query.size = size.filter(element => element !== undefined).toString()
        } else {
            if (router.query.size) {
                if (size.length === 0) {
                    delete router.query.size
                }
            }
        }
        prepareFiltreUseEffect(router.query.size, setSize, size, false)
        if (brand.length !== 0) {
            router.query.brand = brand.filter(element => element !== undefined).toString()
        } else {
            if (router.query.brand) {
                if (brand.length === 0) {
                    delete router.query.brand
                }
            }
        }
        prepareFiltreUseEffect(router.query.brand, setBrand, brand, false)
        router.push(router)
        setIsVisibleSecondFilter(false)
    }

    return (
        <div className="width">
            <Header />

            <Modal
                title={true}
                text="Des millions de petites annonces et autant d'occasions de se faire plaisir"
            >
                <div className={styles.maindiv}>
                    {/* <div className={styles.div}> */}
                    <div className={`${styles.searchdiv}`}>
                        <br />

                        <div>
                            <h2 className="title-h1">
                                Votre recherche
                                {filter.category ? ` est ${filter.category}` : ""}
                                {filter.search ? ` est ${filter.search}` : ""}
                                {filter.lat ? ` à ville` : ""}
                            </h2>
                        </div>
                        <div className={styles.divmaintrifilter}>
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
                            <div>
                                <Button
                                    title="Choix des filtres"
                                    onClick={() => {
                                        choiceFilter()
                                    }}
                                    className="btn btn-grey2"
                                />
                            </div>
                        </div>
                        {isVisibleSecondFilter ? (
                            <div className={styles.divfilter}>
                                <div className={styles.secondfilter}>
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
                                </div>
                                <div className={styles.button}>
                                    <div>
                                        <Button
                                            className="btn btn-grey2"
                                            title="Rechercher"
                                            onClick={() => searchFilter()}
                                        />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            ""
                        )}
                        <Announcement stateElement={ad.ad} />
                        <br />
                        <div>
                            {ad.top && !ad.bottom ? (
                                <Button
                                    className={`btn btn-orange ${styles.buttonleft}`}
                                    title="page précédente"
                                    onClick={() => previousPage()}
                                />
                            ) : ad.bottom && !ad.top ? (
                                <div>
                                    <Button
                                        className={`btn btn-orange ${styles.buttonright}`}
                                        title="page suivante"
                                        onClick={() => nextPage()}
                                    />
                                </div>
                            ) : ad.top && ad.bottom ? (
                                <div></div>
                            ) : (
                                <div className={styles.buttonrightleft}>
                                    <Button
                                        className={`btn btn-orange ${styles.buttonleft}`}
                                        title="page précédente"
                                        onClick={() => previousPage()}
                                    />
                                    <Button
                                        className={`btn btn-orange ${styles.buttonright}`}
                                        title="page suivante"
                                        onClick={() => nextPage()}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default Index
