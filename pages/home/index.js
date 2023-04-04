import React, { useState, useEffect, useContext } from "react"
import { AiOutlineSearch, AiFillEnvironment, AiOutlineBars } from "react-icons/ai"
import { useRouter } from "next/router"
import Image from "next/image"
import { sqrt } from "mathjs"

import Button from "../../components/body/button/button"
import Input from "../../components/body/input/input"
import Header from "../../components/header/header"
import Modal from "../../components/body/modal/modal"
import Geobis from "../../components/body/geobis/geobis"
import Footer from "../../components/footer/footer"

import AuthContext from "../../contexts/AuthContext"

import styles from "./index.module.scss"

import Carte from "../../public/carteFrance.jpg"
import userService from "../../services/user.service"
import adService from "../../services/ad.service"

export default function Home() {
    const router = useRouter()
    const [search, setSearch] = useState("")
    const [localization, setLocalization] = useState({})
    const [category, setCategory] = useState("")
    const [adress, setAdress] = useState("")
    const [lat, setLat] = useState()
    const [lng, setLng] = useState()
    const [recentSearch, setRecentSearch] = useState([])
    const { userContext, setUserContext } = useContext(AuthContext)

    useEffect(() => {
        if (!localStorage.getItem("user") || localStorage.getItem("user") === null) {
            setUserContext(null)
            location.reload()
        } else {
            if (userContext && userContext.token) {
                userService
                    .getuser(userContext.id)
                    .then(data => {
                        setRecentSearch(data.user.recentSearch)
                    })
                    .catch(err => console.log(err))
            }
        }
        //     let B2 = 49.1154686
        //     let B3 = -1.0828136
        //     let C2 = 49.182863
        //     let C3 = -0.370679
        //     let b =
        //         Math.acos(
        //             Math.sin(B2) * Math.sin(B3) + Math.cos(B2) * Math.cos(B3) * Math.cos(C2 - C3),
        //         ) * 6371
        //     console.log(b)
        //     // function sqr(a) {
        //     //     return a * a
        //     // }
        //     // let b = Math.sqrt(sqr(49.1154686 - 49.182863) + sqr(-1.0828136 - -0.370679))
        //     // console.log("bbbb = ", b)
    }, [])

    const url = () => {
        router.push(
            `/home/filter/carte?${category}${
                search && category && search !== "search="
                    ? `&${search}`
                    : search && !category && search !== "search="
                    ? search
                    : ""
            }${
                lat && !category && (!search || search === "search=")
                    ? `lat=${lat}`
                    : lat && (category || search)
                    ? `&lat=${lat}`
                    : ""
            }${lng ? `&lng=${lng}` : ""}${
                (search && search !== "search=") || category || lat ? "&page=0" : "page=0"
            }`,
        )
    }

    const searchAd = () => {
        if (userContext && userContext.token) {
            let recentSearchUser = []
            recentSearchUser = recentSearch
            let newcategory = category.split("=")[1]
            let newsearch = search.split("=")[1]
            let obj = {
                category: newcategory,
                search: newsearch,
                localization: { lat: lat, lng: lng },
                country: adress,
            }
            if (recentSearchUser.length < 3) {
                recentSearchUser.push(obj)
            } else {
                recentSearchUser.shift()
                recentSearchUser.push(obj)
            }
            userService
                .updateuser(userContext.id, { recentSearch: recentSearchUser })
                .then(() => {
                    url()
                })
                .catch(err => console.log(err))
        } else {
            url()
        }
    }

    const searchRecentsearch = (letcategory, letsearch, letlat, latlng) => {
        router.push(
            `/home/filter/carte?${letcategory ? `category=${letcategory}` : ""}${
                letsearch && letcategory && letsearch
                    ? `&search=${letsearch}`
                    : letsearch && !letcategory
                    ? `search=${letsearch}`
                    : ""
            }${
                letlat && !letcategory && !letsearch
                    ? `lat=${letlat}`
                    : letlat && (letcategory || letsearch)
                    ? `&lat=${letlat}`
                    : ""
            }${latlng ? `&lng=${latlng}` : ""}${
                (letsearch && letsearch !== "search=") || letcategory || letlat
                    ? "&page=0"
                    : "page=0"
            }`,
        )
    }

    useEffect(() => {
        if (localization.localization) {
            setLat(localization.localization.lat)
            setLng(localization.localization.lng)
            setAdress(localization.country)
        }
    }, [localization])

    return (
        <div className="width">
            <Header />

            <Modal
                title={true}
                text="Des millions de petites annonces et autant d'occasions de se faire plaisir"
            >
                <div className={styles.maindiv}>
                    <div className={styles.div}>
                        <div className={`${styles.searchdiv}`}>
                            <div className={styles.divbox}>
                                <div className={styles.box}>
                                    <AiOutlineBars size={20} />
                                    <select
                                        onChange={e => {
                                            setCategory(`category=${e.target.value}`)
                                        }}
                                        name="pets"
                                        id="pet-select"
                                        className="input input-select2 input-select2-selectcategory"
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
                                        className="input input-select2"
                                        placeholder="Que recherchez vous ?"
                                        onChange={e => {
                                            setSearch(`search=${e.target.value}`)
                                        }}
                                    />
                                </div>
                                <div className={styles.box}>
                                    <AiFillEnvironment size={20} />
                                    <Geobis setAd={setLocalization} ad={localization} />
                                </div>
                            </div>
                            <br />
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
                            {recentSearch ? (
                                <div className={styles.divmainrecentsearch}>
                                    <h2>Vos précédentes recherches :</h2>
                                    <br />
                                    <div className={styles.divrecentsearch}>
                                        {recentSearch.map(element => (
                                            <div key={element._id} className={styles.recentsearch}>
                                                <Button
                                                    className="btn btn-ad"
                                                    onClick={() =>
                                                        searchRecentsearch(
                                                            element.category,
                                                            element.search,
                                                            element.localization?.lat,
                                                            element.localization?.lng,
                                                        )
                                                    }
                                                >
                                                    <div>
                                                        {element.category ? (
                                                            <div>
                                                                <p>{element.category}</p>
                                                                <br />
                                                            </div>
                                                        ) : (
                                                            ""
                                                        )}
                                                        {element.search ? (
                                                            <div>
                                                                <p>{element.search}</p>
                                                                <br />
                                                            </div>
                                                        ) : (
                                                            ""
                                                        )}
                                                        {element.country ? (
                                                            <div>
                                                                <p>{element.country}</p> <br />
                                                            </div>
                                                        ) : (
                                                            ""
                                                        )}
                                                    </div>
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                </div>
                <Image src={Carte} alt="Carte France" />
            </Modal>
        </div>
    )
}
