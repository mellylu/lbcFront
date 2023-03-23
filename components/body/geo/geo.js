import React, { useState, useEffect, useMemo } from "react"
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api"

import styles from "./geo.module.scss"

export default function Index({ localization }) {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyDbr6FgqPsctO5kXmIFoYL7X7TuaXAGX_o",
    })

    if (!isLoaded) return <div>Loading...</div>
    return <Map localization={localization} />
}
function Map({ localization }) {
    // useEffect(()=>{

    // })
    // console.log(localization)
    // const center = null
    // if (localization) {
    //     center = localization
    // } else {
    //     center = { lat: 46, lng: -20 }
    // }
    return (
        <GoogleMap zoom={10} center={localization} mapContainerClassName={styles.mapcontainer}>
            {localization && <Marker position={localization} />}
        </GoogleMap>
    )
}
