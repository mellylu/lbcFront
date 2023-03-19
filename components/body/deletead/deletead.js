import React, { useContext, useState, useEffect } from "react"
import { AiOutlineClose } from "react-icons/ai"

import Button from "../button/button"

import userService from "../../../services/user.service"
import adService from "../../../services/ad.service"

import AuthContext from "../../../contexts/AuthContext"

import styles from "./deletead.module.scss"

const Deletead = ({ idElement, idAd }) => {
    const { userContext } = useContext(AuthContext) //fba
    const [ok, setOk] = useState(false)
    const deleteAnnouncement = (idEl, id) => {
        console.log(idEl, "idEl")
        console.log(id, "idAd")
        userService
            .deleteAnnouncement(userContext.id, idEl.idElement)
            .then(data => {
                console.log(data)
            })
            .catch(err => console.log(err))
        adService
            .deleteAd(idAd)
            .then(data => {
                console.log(data)
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <Button
                className={styles.cross}
                onClick={() => {
                    deleteAnnouncement({ idElement }, { idAd })
                }}
            >
                <AiOutlineClose size={25} />
            </Button>
        </div>
    )
}

export default Deletead
