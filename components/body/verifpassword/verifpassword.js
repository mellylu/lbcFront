import React, { useState, useEffect } from "react"
import { FiCheck } from "react-icons/fi"

import Button from "../button/button"

const Verifpassword = ({ password, buttonblock, buttonok }) => {
    const [eightcaracmin, setEightcaracmin] = useState(false)
    const [oneNumberMin, setOneNumberMin] = useState(false)
    const [oneCaracSpeMin, setOneCaracSpeMin] = useState(false)

    if (password !== undefined) {
        var onenumber = /[0-9]+/
        var onecaracspe = /[^A-Za-z0-9_]/
        //var onenumber = /[a-z]+[0-9]+[a-z]+/
        if (password.length >= 8) {
            setEightcaracmin(true)
        } else {
            setEightcaracmin(false)
        }
        if (password.match(onenumber)) {
            setOneNumberMin(true)
        } else {
            setOneNumberMin(false)
        }
        if (password.match(onecaracspe)) {
            setOneCaracSpeMin(true)
        } else {
            setOneCaracSpeMin(false)
        }
    }

    return (
        <div>
            {eightcaracmin ? (
                <div>
                    <FiCheck color="green" /> 8 caractères minimum
                </div>
            ) : (
                <div>
                    <FiCheck color="grey" />8 caractères minimum
                </div>
            )}
            {oneNumberMin ? (
                <div>
                    <FiCheck color="green" /> 1 chiffre minimum
                </div>
            ) : (
                <div>
                    <FiCheck color="grey" />1 chiffre minimum
                </div>
            )}
            {oneCaracSpeMin ? (
                <div>
                    <FiCheck color="green" /> 1 caractère spécial
                </div>
            ) : (
                <div>
                    <FiCheck color="grey" /> 1 caractère spécial
                </div>
            )}
            {eightcaracmin && oneNumberMin && oneCaracSpeMin ? { buttonok } : { buttonblock }}
        </div>
    )
}

export default Verifpassword
