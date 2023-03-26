import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"

import adService from "../../../../services/ad.service"

import styles from "./index.module.scss"
import Announcement from "../../../../components/body/announcement/announcement"
import Modal from "../../../../components/body/modal/modal"
import Header from "../../../../components/header/header"

const Index = () => {
    const router = useRouter()
    const [ad, setAd] = useState()
    const [sort, setSort] = useState("")
    const filter = router.query
    const [ok, setOk] = useState(false)

    useEffect(() => {
        console.log("RRRRRRRRRRRRRRRRRRRRRRRRRRRR")
        if (!router.isReady) {
        } else {
            setOk(true)
            adService
                .getAllFilter(
                    filter.category || "",
                    filter.search || "",
                    filter.lat || "",
                    filter.lng || "",
                )
                .then(data => {
                    setAd(data.ad)
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
        if (ok) {
            adService
                .getAllFilter(
                    filter.category || "",
                    filter.search || "",
                    filter.lat || "",
                    filter.lng || "",
                    sort || "",
                )
                .then(data => {
                    setAd(data.ad)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }, [router])

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
                            <Announcement stateElement={ad} />
                            <br />
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default Index
