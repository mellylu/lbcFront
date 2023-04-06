import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"

import adService from "../../../services/ad.service"

import Geo from "../../../components/body/geo/geo"
import Header from "../../../components/header/header"
import Button from "../../../components/body/button/button"

import styles from "./index.module.scss"
import Paybutton from "../../../components/body/paybutton/paybutton"
import Image from "next/image"

import PhotoProfil from "../../../public/photoProfil.jpg"

const Index = () => {
    const router = useRouter()
    const [ad, setAd] = useState()
    const [user, setUser] = useState([])
    const {
        query: { id },
    } = router

    useEffect(() => {
        if (!router.isReady) {
        } else {
            adService.getAd(id).then(data => {
                setUser(data.ad.userad)
                setAd(data.ad)
                // location.reload()
            })
        }
    }, [router.isReady])

    return (
        <div className="width">
            <Header />
            <div className={styles.div}>
                {ad ? (
                    <div className={styles.div1}>
                        <div>
                            <div className={styles.images}>
                                <div className={styles.image}>
                                    <img
                                        className={`image-view `}
                                        src={ad.image}
                                        alt="image product"
                                    />
                                </div>
                                {/* <div>
                                    <div className={styles.image2}>
                                        <img src={ad.image} alt="image product" />
                                    </div>
                                    <div className={styles.image2}>
                                        <img src={ad.image} alt="image product" />
                                    </div>
                                </div> */}
                            </div>
                            <h1 className={`text-left py-l py-t ${styles.title}`}>{ad.name}</h1>
                            <p className="text-left py-l title-h3">{ad.country}</p>
                            <p className="text-left py-l title-h2">
                                <strong>Prix : {ad.price} €</strong>
                            </p>
                            <p className="text-left py-l title-h4">{ad.date}</p>
                            <hr></hr>
                            <p className="text-left py-l title-h2">
                                <strong>Description</strong>{" "}
                            </p>
                            <p className="text-left py-l title-h3"> {ad.description}</p>
                        </div>
                        {/* <p>Localisation : {ad.localization}</p> */}
                    </div>
                ) : (
                    ""
                )}

                {user
                    ? user.map(element => (
                          <div key={element.user._id} className={styles.div2}>
                              {element.user.image ? (
                                  <div className={styles.img1}>
                                      <img
                                          className="image-profil"
                                          src={element.user.image}
                                          alt="photo utilisateur"
                                      />
                                  </div>
                              ) : (
                                  <div className={styles.img1}>
                                      <Image
                                          className="image-profil"
                                          src={PhotoProfil}
                                          alt="pas de photo utilisateur"
                                      />
                                  </div>
                              )}
                              <p className="text text-center">
                                  Propriétaire : {element.user.username}
                              </p>
                              <br />
                              <Button
                                  title="Envoyer un message"
                                  className="btn btn-blue"
                                  onClick={() => {}}
                              />
                              <br />
                              <br />
                              <Paybutton cartItems={ad} />
                          </div>
                      ))
                    : ""}
            </div>
            <br />
            {ad ? <Geo localization={ad.localization} /> : <Geo />}
        </div>
    )
}

export default Index
