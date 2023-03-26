import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"

import adService from "../../../../services/ad.service"

import styles from "./index.module.scss"

const Index = () => {
    const router = useRouter()
    const [ad, setAd] = useState()
    const filter = router.query

    useEffect(() => {
        if (!router.isReady) {
            console.log("FFFFFFFFFFFF")
            console.log(filter, "filter")
        } else {
            adService
                .getAllFilter(
                    filter.category || "",
                    filter.search || "",
                    filter.lat || "",
                    filter.lng || "",
                )
                .then(data => {
                    console.log(data, "DATA")
                    setAd(data.ad)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }, [router.isReady])

    useEffect(() => {
        console.log(ad, "arpès recherche résultat ad")
    }, [ad])

    return <div></div>
}

export default Index
