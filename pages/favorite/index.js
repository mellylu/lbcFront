import React, { useState, useEffect, useContext } from "react"
import Image from "next/image"

import Header from "../../components/header/header"
import Announcement from "../../components/body/announcement/announcement"

import userService from "../../services/user.service"

import AuthContext from "../../contexts/AuthContext"

import NotFavoris from "../../public/NotFavoris.png"

import styles from "./index.module.scss"

const Favorite = () => {
    const { userContext } = useContext(AuthContext)
    const [isNull, setIsNull] = useState(false)
    const [favoris, setFavoris] = useState([])

    useEffect(() => {
        userService
            .getuser(userContext.id)
            .then(data => {
                if (data.user.favorite.length === 0) {
                    setIsNull(true)
                } else {
                    setFavoris(data.user.favorite)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }, [favoris])

    return (
        <div className="width">
            <Header />
            <h1 className="title-h0 text-center py-t">Annonces sauvegardées</h1>
            <div className={styles.maindiv}>
                {isNull ? (
                    <div className={styles.div}>
                        <div className={styles.notAnnouncement}>
                            <div>
                                <h2 className="title-h2 text-center py-t">
                                    {"Vous n'avez pas d'annonce sauvegardée"}
                                </h2>
                                <div className={styles.image}>
                                    <Image
                                        src={NotFavoris}
                                        alt="background image pas de favoris"
                                        className="image image-big"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className={styles.div2}>
                        <div className={`${styles.searchdiv}`}>
                            <p className="title-h2 text-center py-t">
                                {
                                    "Si l'annonce n'est plus active sur le site, elle disparaîtra automatiquement de votre sélection."
                                }
                            </p>
                            <Announcement stateElement={favoris} ad={true} />
                            <br />
                            <br />
                            <br />
                            <br />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Favorite
