import React from "react"

import Deletead from "../deletead/deletead"
import Favoris from "../favoris/favoris"

import styles from "./announcement.module.scss"

const Announcement = ({ stateElement, ad = false, favoris = true }) => {
    return (
        <div>
            {stateElement.map(element => {
                const x = element
                if (ad) {
                    element = element.ad
                }
                return (
                    <div key={element._id} className={styles.flex}>
                        <img src={element.image} className={styles.image} alt="" />
                        <div>
                            <p className="title title-h2">{element.price} $</p>
                            <p>{element.name}</p>
                            <p>{element.localization}</p>
                            <p>{element.date}</p>
                        </div>
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
                )
            })}
        </div>
    )
}

export default Announcement
