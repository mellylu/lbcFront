import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import Image from "next/image"

import Button from "../button/button"
import Deletead from "../deletead/deletead"
import Favoris from "../favoris/favoris"

import styles from "./announcement.module.scss"
import NotImage from "../../../public/pasimage.png"

const Announcement = ({ stateElement, ad = false, favoris = true }) => {
    const router = useRouter()

    // const [isok, setisok] = useState()

    // userContext.favorite.forEach(element => {
    //     element.ad._id.includes(idElement) ? (

    //     ) : (

    //     )
    // })

    return (
        <div>
            {stateElement ? (
                stateElement.map(element => {
                    const x = element
                    if (ad) {
                        element = element.ad
                    }
                    return (
                        <div key={element._id} className={styles.flex}>
                            <div className={styles.flex2}>
                                {element.image ? (
                                    <img
                                        src={element.image}
                                        className={styles.image}
                                        alt="annonce"
                                    />
                                ) : (
                                    <Image
                                        src={NotImage}
                                        className={styles.image}
                                        alt="Pas d'image pour l'anonce"
                                    />
                                )}

                                {/* <Link href={`/home/${element._id}`}>Voir le produit</Link> */}

                                <div className={styles.container}>
                                    <Button
                                        className="btn btn-ad"
                                        onClick={() => router.push(`/home/${element._id}`)}
                                    >
                                        <p
                                            className={`title title-h2 text-left ${styles.interligne} ${styles.titre}`}
                                        >
                                            {element.name}
                                        </p>
                                    </Button>

                                    <p className={`title title-h3 text-left ${styles.interligne}`}>
                                        {element.price} €
                                    </p>
                                    <br />
                                    <br />
                                    <p
                                        className={`title-p color-greyligth text-left ${styles.interligne}`}
                                    >
                                        {element.country}
                                    </p>
                                    <p
                                        className={`title-p color-greyligth text-left ${styles.interligne}`}
                                    >
                                        {element.date}
                                    </p>
                                    {/* <p>{element.date}</p> */}
                                </div>
                                {/* </Button> */}
                            </div>
                            <div className={styles.buttonHeartOrDelete}>
                                {favoris ? (
                                    <div>
                                        <Favoris idElement={element._id} />
                                    </div>
                                ) : (
                                    <div>
                                        <Deletead idElement={x._id} idAd={element._id} />
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                })
            ) : (
                <div>Pas dannonces</div>
            )}
        </div>
    )
}

export default Announcement
