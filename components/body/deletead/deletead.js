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
        let publicid = null
        adService
            .getAd(idAd)
            .then(data => {
                let imgdelete = data.ad.image.split("/annonces/")[1]
                publicid = "annonces/" + imgdelete.split(".")[0]
                console.log(publicid, "publicid")
            })
            .catch(err => console.log(err))

        userService
            .deleteAnnouncement(userContext.id, idEl.idElement)
            .then(data => {})
            .catch(err => console.log(err))
        adService
            .deleteAd(idAd)
            .then(data => {})
            .catch(err => console.log(err))
        userService
            .deleteAnnouncementFavoris(idAd)
            .then(data => {
                console.log(data)
                deleteImage(publicid)
                location.reload()
            })
            .catch(err => console.log(err))
    }

    const deleteImage = publicid => {
        console.log(publicid, "publicidSSS")
        fetch(`http://localhost:5000/api/v1/upload/` + publicid, {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
            },
        })
            .then(() => {})
            .catch(err => console.log(err))
    }

    return (
        <div>
            <Button
                className="btn btn-heart"
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
