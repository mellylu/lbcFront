import React, { useState, useContext, useEffect } from "react"
import { AiOutlineSearch, AiFillEnvironment } from "react-icons/ai"
import Image from "next/image"

import Button from "../components/body/button/button"
import Input from "../components/body/input/input"
import Header from "../components/header/header"

import AuthContext from "../contexts/AuthContext"

import adService from "../services/ad.service"

import styles from "./index.module.scss"
import Upload from "../components/body/upload/upload"

export default function Home() {
    const { userContext } = useContext(AuthContext)
    const [search, setSearch] = useState({})
    const [ad, setAd] = useState([])

    useEffect(() => console.log(userContext))

    useEffect(() => {
        adService
            .getAllAd()
            .then(data => {
                setAd(data.ad)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <div className="width">
            <Header />

            <h1 className="title-h0 text-center py-t">
                Des millions de petites annonces et autant d occasions de se faire plaisir
                <Upload />
            </h1>
            <br />
            <div className={styles.maindiv}>
                <div className={styles.div}>
                    <div className={`${styles.searchdiv} bgcolor-grey`}>
                        <div className={styles.divbox}>
                            <div className={styles.box}>
                                <select
                                    onClick={e => {
                                        setSearch({ ...search, category: e.target.value })
                                    }}
                                    name="pets"
                                    id="pet-select"
                                    className="input input-select"
                                >
                                    <option value="">Catégorie</option>
                                    <option value="Vêtement">Vêtement</option>
                                    <option value="Maison">Maison</option>
                                </select>
                            </div>
                            <div className={styles.box}>
                                <AiOutlineSearch size={20} />
                                <Input
                                    className="input input-search"
                                    placeholder="Que recherchez vous ?"
                                />
                            </div>
                            <div className={styles.box}>
                                <AiFillEnvironment size={20} />
                                <Input
                                    className="input input-search"
                                    placeholder="Saisissez une ville"
                                    onClick={() => {}}
                                />
                            </div>
                        </div>
                        <div className={styles.btnmain}>
                            <div className={styles.btn}>
                                <Button
                                    className="btn btn-blue"
                                    title="Rechercher"
                                    onClick={() => {}}
                                />
                            </div>
                        </div>
                        <div>
                            <h2>Votre recherche est .... à ....</h2>
                        </div>
                        <div>
                            <p>mmmmmmm</p>
                            {ad.map(element => {
                                console.log(element.price)
                                return (
                                    <div key={element._id}>
                                        <Image src="" alt="" className="image image-small" />
                                        <p>{element.price}</p>
                                        <p>{element.name}</p>
                                        <p>{element.localization}</p>
                                        <p>{element.date}</p>
                                    </div>
                                )
                            })}
                            {/* {ad
                                ? ad.map(element => {
                                      console.log(element)
                                      //   ;<div key={element._id}>
                                      //       <Image
                                      //           src={Background}
                                      //           alt="background image login"
                                      //           className="image image-big"
                                      //       />
                                      //       <p>{element.price}</p>
                                      //   </div>
                                  })
                                : ""} */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
