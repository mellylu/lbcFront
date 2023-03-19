import React, { useState, useContext, useEffect } from "react"
import {
    AiOutlineSearch,
    AiFillEnvironment,
    AiOutlineBars,
    AiOutlineHeart,
    AiFillHeart,
} from "react-icons/ai"
import Image from "next/image"

import Button from "../components/body/button/button"
import Input from "../components/body/input/input"
import Header from "../components/header/header"
import Favoris from "../components/body/favoris/favoris"

import AuthContext from "../contexts/AuthContext"

import adService from "../services/ad.service"

import styles from "./index.module.scss"
import userService from "../services/user.service"
import Announcement from "../components/body/announcement/announcement"

import Lancome from "../public/lancome.jpg"
import Modal from "../components/body/modal/modal"

export default function Home() {
    const { userContext } = useContext(AuthContext)
    const [search, setSearch] = useState({})
    const [ad, setAd] = useState([])
    const [nbpage, setNbpage] = useState()
    const [isExist, setIsExist] = useState(false)
    const [totalpage, setTotalpage] = useState()

    useEffect(() => console.log(userContext))

    useEffect(() => {
        console.log(nbpage)
        adService
            .getAllAd(nbpage)
            .then(data => {
                setNbpage(0)
                setAd(data.ad)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    useEffect(() => {
        console.log(nbpage)
    }, [nbpage])

    const nextpage = () => {
        setNbpage(nbpage + 1)
    }

    const previouspage = () => {
        setNbpage(nbpage - 1)
    }

    useEffect(() => {
        adService
            .getAllAd(nbpage)
            .then(data => {
                setAd(data.ad)
                setTotalpage(data.total)
            })
            .catch(err => {
                console.log(err)
            })
    }, [nbpage])

    return (
        <div className="width">
            <Header />

            <Modal
                title={true}
                text="Des millions de petites annonces et autant d occasions de se faire plaisir"
            >
                <div className={styles.maindiv}>
                    <div className={styles.div}>
                        <div className={`${styles.searchdiv}`}>
                            <div className={styles.divbox}>
                                <div className={styles.box}>
                                    <AiOutlineBars size={20} />
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
                                        className="input input-select"
                                        placeholder="Que recherchez vous ?"
                                    />
                                </div>
                                <div className={styles.box}>
                                    <AiFillEnvironment size={20} />
                                    <Input
                                        className="input input-select"
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
                            <div className={styles.box}>
                                <AiOutlineSearch size={20} />
                                <h2>Recherches récentes</h2>
                            </div>
                            <div>
                                <h2>Votre recherche est .... à ....</h2>
                            </div>
                            <Announcement stateElement={ad} />
                            <br />
                            {nbpage > 0 && nbpage < totalpage ? (
                                <div>
                                    <div className={styles.previouspage}>
                                        <Button
                                            className={`${styles.previouspage} btn btn-white`}
                                            title="Page précédente"
                                            onClick={() => previouspage()}
                                        />
                                    </div>
                                    <div className={styles.nextpage}>
                                        <Button
                                            className={`${styles.nextpage} btn btn-white`}
                                            title="Page suivante"
                                            onClick={() => nextpage()}
                                        />
                                    </div>
                                </div>
                            ) : (
                                ""
                            )}
                            {nbpage === 0 ? (
                                <div className={styles.nextpage}>
                                    <Button
                                        className="btn btn-white"
                                        title="Page suivante"
                                        onClick={() => nextpage()}
                                    />
                                </div>
                            ) : (
                                ""
                            )}
                            {nbpage === totalpage ? (
                                <div className={styles.previouspage}>
                                    <Button
                                        title="Page précédente"
                                        className="btn btn-white"
                                        onClick={() => previouspage()}
                                    />
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                </div>
            </Modal>
            <p className="text text-right">MMMMMMMMMMMMMMM</p>
        </div>
    )
}
