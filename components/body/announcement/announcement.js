import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"

import Button from "../button/button"
import Deletead from "../deletead/deletead"
import Favoris from "../favoris/favoris"

import styles from "./announcement.module.scss"
import Link from "next/link"

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
                            {/* <Button
                            className={`btn btn-link ${styles.button}`}
                            onClick={() => {
                                router.push({
                                    pathname: "/detailproduct",
                                    query: { id: element._id },
                                })
                            }}
                        > */}

                            <div className={styles.flex2}>
                                <img src={element.image} className={styles.image} alt="annonce" />
                                {/* <Link href={`/home/${element._id}`}>Voir le produit</Link> */}

                                <div className={styles.container}>
                                    <p
                                        className={`title title-h2 text-left ${styles.interligne} ${styles.titre}`}
                                    >
                                        <Button
                                            className="btn btn-white"
                                            onClick={() => router.push(`/home/${element._id}`)}
                                        >
                                            {element.name}
                                        </Button>
                                    </p>
                                    <p className={`title title-h3 text-left ${styles.interligne}`}>
                                        {element.price} $
                                    </p>
                                    <br />
                                    <p
                                        className={`title-p color-greyligth text-left ${styles.interligne}`}
                                    >
                                        {element.country}
                                    </p>
                                    {/* <p>{element.localization}</p> */}
                                    <p
                                        className={`title-p color-greyligth text-left ${styles.interligne}`}
                                    >
                                        02/03/2023 à 8:25
                                    </p>
                                    {/* <p>{element.date}</p> */}
                                </div>
                                {/* </Button> */}
                                <div>
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
