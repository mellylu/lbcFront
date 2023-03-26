import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"

import adService from "../../../../services/ad.service"

import styles from "./index.module.scss"
import Announcement from "../../../../components/body/announcement/announcement"
import Modal from "../../../../components/body/modal/modal"
import Header from "../../../../components/header/header"
import Button from "../../../../components/body/button/button"

const Index = () => {
    const router = useRouter()
    const [ad, setAd] = useState({})
    const [sort, setSort] = useState("")
    const filter = router.query
    const [ok, setOk] = useState(false)
    const [page, setPage] = useState()

    useEffect(() => {
        console.log("RRROOOUUTTEEERR RRREEEAAADDDYYY")

        if (!router.isReady) {
        } else {
            // console.log(page, "page")
            // router.query.page = page || 0
            // router.push(router)
            console.log(filter.page, "filter.page")
            setOk(true)
            adService
                .getAllFilter(
                    filter.category || "",
                    filter.search || "",
                    filter.lat || "",
                    filter.lng || "",
                    filter.page || "",
                )
                .then(data => {
                    setAd(data)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }, [router.isReady])

    useEffect(() => {
        if (sort && sort !== "") {
            router.query.sort = sort
            router.push(router)
        }
    }, [sort])

    useEffect(() => {
        console.log("RROOOUUUTTTEEERRR")
        if (ok) {
            adService
                .getAllFilter(
                    filter.category || "",
                    filter.search || "",
                    filter.lat || "",
                    filter.lng || "",
                    filter.page || "",
                    sort || "",
                )
                .then(data => {
                    setAd(data)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }, [router])

    const nextPage = () => {
        filter.page = parseInt(filter.page)
        filter.page = filter.page + 1
        router.query.page = filter.page
        router.push(router)
        // setPage(page + 1)
    }
    // useEffect(() => {
    //     router.query.page = filter.page
    //     router.push(router)
    // }, [page])

    const previousPage = () => {
        filter.page = parseInt(filter.page)
        filter.page = filter.page - 1
        router.query.page = filter.page
        router.push(router)
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
                            <Announcement stateElement={ad.ad} />
                            <br />
                            {ad.top ? (
                                <Button
                                    className="btn btn-orange"
                                    title="page précédente"
                                    onClick={() => previousPage()}
                                />
                            ) : ad.bottom ? (
                                <Button
                                    className="btn btn-orange"
                                    title="page suivante"
                                    onClick={() => nextPage()}
                                />
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
        </div>
    )
}

export default Index
