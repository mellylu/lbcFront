import React, { useState, useContext, useEffect } from "react"
import { AiOutlineSearch, AiFillEnvironment, AiOutlineBars } from "react-icons/ai"
import { useRouter } from "next/router"

import Button from "../../components/body/button/button"
import Input from "../../components/body/input/input"
import Header from "../../components/header/header"
import Announcement from "../../components/body/announcement/announcement"
import Modal from "../../components/body/modal/modal"
import Geobis from "../../components/body/geobis/geobis"

import AuthContext from "../../contexts/AuthContext"

import adService from "../../services/ad.service"
import userService from "../../services/user.service"

import styles from "./index.module.scss"

export default function Home() {
    const router = useRouter()
    const { userContext } = useContext(AuthContext)
    const [search, setSearch] = useState({})
    const [ad, setAd] = useState([])
    const [nbpage, setNbpage] = useState(0)
    const [totalpage, setTotalpage] = useState()
    const [sort, setSort] = useState({})
    const [localization, setLocalization] = useState({})
    const [category, setCategory] = useState({})
    const [isVisible, setIsVisible] = useState(false)
    const [userRecentSearch, setUserRecentSearch] = useState([])

    useEffect(() => {
        adService
            .getAllAd(nbpage, sort.name || "")
            .then(data => {
                setAd(data.ad)
                setTotalpage(data.total)
            })
            .catch(err => {
                console.log(err)
            })

        userService
            .getuser(userContext.id)
            .then(data => setUserRecentSearch(data.user.recentSearch))
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        adService
            .getAllAd(nbpage, sort.name || "")
            .then(data => {
                setAd(data.ad)
                setNbpage(0)
            })
            .catch(err => {
                console.log(err)
            })
    }, [sort])

    const nextpage = () => {
        setNbpage(nbpage + 1)
    }

    const previouspage = () => {
        setNbpage(nbpage - 1)
    }

    const searchAd = () => {
        console.log(localization, "localisation")
        adService
            .getAllFilter(category.name || "", search.name || "", localization.localization || {})
            .then(data => {
                console.log(data, "DATA")
                setAd(data.ad)
                setIsVisible(true)
            })
            .catch(err => {
                console.log(err)
            })
        if (userRecentSearch.length >= 3) {
            console.log("supérieur à 3")
            userRecentSearch.shift()
        }

        userRecentSearch.push({
            category: category.name || "",
            search: search.name || "",
            localization: localization.localization || "",
        })
        userService
            .updateuser(userContext.id, { recentSearch: userRecentSearch })
            .then(data => {
                console.log(data)
            })
            .catch(err => {
                console.log(err)
            })

        // setUserRecentSearch(...userRecentSearch, {
        //     category: category.name || "",
        //     search: search.name || "",
        //     localization: localization.localization || "",
        // })
    }

    // useEffect(() => {
    //     console.log(userRecentSearch, "userRecentSearch")
    //     // userService.updateuser(userRecentSearch({...})
    //     //     {
    //     //     category: category.name || "",
    //     //     search: search.name || "",
    //     //     localization: localization.localization || {},
    //     // })
    // }, [userRecentSearch])

    useEffect(() => {
        adService
            .getAllAd(nbpage, sort.name || "")
            .then(data => {
                setAd(data.ad)
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
                                        onChange={e => {
                                            setCategory({ ...category, name: e.target.value })
                                        }}
                                        name="pets"
                                        id="pet-select"
                                        className="input input-select"
                                    >
                                        <option value="" disabled selected hidden>
                                            Catégorie
                                        </option>
                                        <option value="Vêtement">Vêtement</option>
                                        <option value="Maison">Maison</option>
                                    </select>
                                </div>
                                <div className={styles.box}>
                                    <AiOutlineSearch size={20} />
                                    <Input
                                        className="input input-select"
                                        placeholder="Que recherchez vous ?"
                                        onChange={e => {
                                            setSearch({ ...search, name: e.target.value })
                                        }}
                                    />
                                </div>
                                <div className={styles.box}>
                                    <AiFillEnvironment size={20} />
                                    {/* <Input
                                        className="input input-select"
                                        placeholder="Saisissez une ville"
                                        onChange={() => {}}
                                    /> */}
                                    <Geobis setAd={setLocalization} ad={localization} />
                                </div>
                            </div>
                            <div className={styles.btnmain}>
                                <div className={styles.btn}>
                                    <Button
                                        className="btn btn-blue"
                                        title="Rechercher"
                                        onClick={e => {
                                            searchAd()
                                        }}
                                    />
                                </div>
                            </div>

                            {isVisible ? (
                                <div>
                                    <div>
                                        <h2>Votre recherche est .... à ....</h2>
                                    </div>
                                    <select
                                        onChange={e => {
                                            setSort({ ...sort, name: e.target.value })
                                        }}
                                        name="pets"
                                        id="pet-select"
                                        className={`input input-form ${styles.select}`}
                                    >
                                        <option value="" disabled selected hidden>
                                            Choix du tri
                                        </option>
                                        <option value="name">Titre</option>
                                        <option value="price">Prix</option>
                                    </select>
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
                            ) : (
                                <div className="width">
                                    <AiOutlineSearch size={20} />
                                    <h2>Recherches récentes</h2>
                                    <div className={styles.divrecentsearch}>
                                        {userRecentSearch
                                            ? userRecentSearch.map(element => (
                                                  <div key={element._id}>
                                                      <div className={styles.recentsearch}>
                                                          <p>{element.search}</p>
                                                          <p>{element.category}</p>
                                                          {/* <p>{element.localization}</p> */}
                                                      </div>
                                                  </div>
                                              ))
                                            : ""}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
