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
    const [type, setType] = useState([router.query.type || ""])
    const [brand, setBrand] = useState([])
    const [material, setMaterial] = useState([router.query.material || ""])
    const [color, setColor] = useState([])
    const [state, setState] = useState([])
    const { userContext, setUserContext } = useState(AuthContext)
    let x = 0
    const filter = router.query

    useEffect(() => {
        if (!router.isReady) {
        } else {
            ////////////////////////////
            // console.log(type, "type")
            // if (router.query.type) {
            //     let TypeSplit = router.query.type.split(",")
            //     if (x === 0) {
            //         if (TypeSplit.length === 1) {
            //             if (type.indexOf(TypeSplit) === -1) {
            //                 setType([...type.filter(element => element !== ""), TypeSplit[0]])
            //             }
            //         } else if (TypeSplit.length >= 1) {
            //             TypeSplit.forEach(element => {
            //                 if (type.indexOf(element) === -1) {
            //                     setType([...type.filter(el => el !== ""), element])
            //                 }
            //             })
            //         } else {
            //         }
            //     }
            // }
            if (router.query.material) {
                let materialSplit = router.query.material.split(",")
                // if (x === 0) {
                if (materialSplit.length === 1) {
                    if (material.indexOf(materialSplit) === -1) {
                        setMaterial([
                            ...material.filter(element => element !== ""),
                            materialSplit[0],
                        ])
                    }
                } else if (materialSplit.length >= 1) {
                    materialSplit.forEach(element => {
                        if (material.indexOf(element) === -1) {
                            setMaterial([...material.filter(el => el !== ""), element])
                        }
                    })
                } else {
                }
                // }
                // x += 1
            }

            adService
                .getAllFilter(
                    filter.category || "",
                    filter.search || "",
                    filter.lat || "",
                    filter.lng || "",
                    filter.page || "",
                    sort || router.query.sort || "",
                    type.filter(element => element !== "") || router.query.type || "",
                    material.filter(element => element !== "") || router.query.material || "",
                    // univers.toString() || router.query.univers || "",
                    // size.toString() || router.query.size || "",

                    // brand.toString() || router.query.brand || "",
                    // material.toString() || router.query.material || "",
                    // color.toString() || router.query.color || "",
                    // state.toString() || router.query.state || "",
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

    useEffect(() => {
        adService
            .getAllFilter(
                filter.category || "",
                filter.search || "",
                filter.lat || "",
                filter.lng || "",
                filter.page || "",
                sort || router.query.sort || "",
                type.filter(element => element !== "") || router.query.type || "",
                material.filter(element => element !== "") || router.query.material || "",
                // univers.toString() || router.query.univers || "",
                // size.toString() || router.query.size || "",

                // brand.toString() || router.query.brand || "",
                // material.toString() || router.query.material || "",
                // color.toString() || router.query.color || "",
                // state.toString() || router.query.state || "",
            )
            .then(data => {
                setAd(data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [type])

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

    useEffect(() => {
        console.log(material)
    }, [material])

    const searchFilter = () => {
        if (type) {
            console.log(type, "TYPE")
            router.query.type = type.filter(element => element !== "").toString()
            router.push(router)
            if (type.length === 0) {
                delete router.query.type
                router.push(router)
            }
        }
        if (material) {
            router.query.material = material.filter(element => element !== "").toString()
            router.push(router)
            if (material.length === 0) {
                delete router.query.material
                router.push(router)
            }
        }

        // if (univers) {
        //     router.query.univers = univers.toString()
        //     router.push(router)
        // }
        // if (size) {
        //     router.query.size = size.toString()
        //     router.push(router)
        // }
        // if (color) {
        //     router.query.color = color.toString()
        //     router.push(router)
        // }
        // if (brand) {
        //     router.query.brand = brand.toString()
        //     router.push(router)
        // }
        // if (material) {
        //     router.query.material = material.toString()
        //     router.push(router)
        // }
        // if (state) {
        //     router.query.state = state.toString()
        //     router.push(router)
        // }
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
                            <br />
                            <div>
                                <h2 className="title-h1">Faire une nouvelle recherche</h2>
                                <Button
                                    className="btn btn-blue"
                                    title="Nouvelle recherche"
                                    onClick={() => {}}
                                />
                            </div>
                            <br />
                            <div>
                                <h2 className="title-h1">Votre recherche est .... à ....</h2>
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
                        </div>
                    </div>
                </div>
            </Modal>
            <Footer />
        </div>
    )
}

export default Index
