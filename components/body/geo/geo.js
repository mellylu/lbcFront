import React, { useState, useEffect, useMemo } from "react"
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api"

import styles from "./geo.module.scss"

export default function Index() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyDbr6FgqPsctO5kXmIFoYL7X7TuaXAGX_o",
    })

    if (!isLoaded) return <div>Loading...</div>
    return <Map />
}
function Map() {
    const center = { lat: 44, lng: -80 }
    return (
        <GoogleMap zoom={10} center={center} mapContainerClassName={styles.mapcontainer}>
            <Marker position={center} />
        </GoogleMap>
    )
}
