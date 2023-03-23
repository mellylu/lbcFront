import React, { useState, useEffect, useMemo } from "react"
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api"
import Geocode from "react-geocode"
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete"
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from "@reach/combobox"
import "@reach/combobox/styles.css"

import styles from "./geobis.module.scss"
import Input from "../input/input"
import Button from "../button/button"

export default function Index() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyDbr6FgqPsctO5kXmIFoYL7X7TuaXAGX_o",
        libraries: ["places"],
    })

    if (!isLoaded) return <div>Loading...</div>
    return <Map />
}
function Map() {
    const [selected, setSelected] = useState(null)
    return (
        <>
            <div className={styles.placescontainer}>
                <PlacesAutocomplete setSelected={setSelected} />
            </div>
            <GoogleMap zoom={15} center={selected} mapContainerClassName={styles.mapcontainer}>
                {selected && <Marker position={selected} />}
            </GoogleMap>
        </>
    )
}

const PlacesAutocomplete = ({ setSelected }) => {
    const {
        ready,
        value,
        setValue,
        suggestions: { status, data },
        clearSuggestions,
    } = usePlacesAutocomplete()

    const handleSelect = async address => {
        setValue(address, false)
        clearSuggestions()
        const results = await getGeocode({ address })
        const { lat, lng } = getLatLng(results[0])
        setSelected({ lat, lng })
    }

    return (
        <Combobox onSelect={handleSelect}>
            <ComboboxInput
                value={value}
                onChange={e => setValue(e.target.value)}
                disabled={!ready}
                className={styles.comboboxinput}
                placeholder="Search an adress"
            />
            <ComboboxPopover>
                <ComboboxList>
                    {status === "OK" &&
                        data.map(({ place_id, description }) => (
                            <ComboboxOption key={place_id} value={description} />
                        ))}
                </ComboboxList>
            </ComboboxPopover>
        </Combobox>
    )
}