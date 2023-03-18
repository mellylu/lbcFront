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
                    console.log("gggggggggggggggggggggggg")
                    setFavoris(data.user.favorite)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <div className="width">
            <Header />
            <h1 className="title-h0 text-center py-t">Annonces sauvegardées</h1>
            <div className={styles.maindiv}>
                <div className={styles.div}>
                    {isNull ? (
                        <div>
                            <h2 className="title-h2 text-center py-t">
                                Vous n avez pas d annonce sauvegardée
                            </h2>
                            <div className={styles.image}>
                                <Image
                                    src={NotFavoris}
                                    alt="background image pas de favoris"
                                    className="image image-big"
                                />
                            </div>
                        </div>
                    ) : (
                        <div className={`${styles.searchdiv}`}>
                            <div>
                                <p className="title-h2 text-center py-t">
                                    Si l annonce n est plus active sur le site, elle disparaîtra
                                    automatiquement de votre sélection.
                                </p>
                                <Announcement stateElement={favoris} ad={true} />
                                {/* {favoris.map(element => {
                                    console.log(element)
                                    return (
                                        <div key={element._id} className={styles.flex}>
                                            <img
                                                src={element.ad.image}
                                                className={styles.imagefavoris}
                                                alt=""
                                            />
                                            <div>
                                                <p className="title title-h2">
                                                    {element.ad.price} $
                                                </p>
                                                <p>{element.ad.name}</p>
                                                <p>{element.ad.localization}</p>
                                                <p>{element.ad.date}</p>
                                            </div>
                                            <Favoris idElement={element._id} />
                                        </div>
                                    )
                                })} */}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Favorite
