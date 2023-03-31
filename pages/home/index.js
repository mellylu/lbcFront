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

export default function Home() {
    const router = useRouter()
    const [search, setSearch] = useState("")
    const [localization, setLocalization] = useState({})
    const [category, setCategory] = useState("")
    const [lat, setLat] = useState()
    const [lng, setLng] = useState()
    const { setUserContext } = useContext(AuthContext)

    useEffect(() => {
        if (!localStorage.getItem("user") || localStorage.getItem("user") === null) {
            setUserContext(null)
            location.reload()
        } else {
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

    const searchAd = () => {
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

    useEffect(() => {
        if (localization.localization) {
            setLat(localization.localization.lat)
            setLng(localization.localization.lng)
        }
    }, [localization])

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
                                            setCategory(`category=${e.target.value}`)
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
                                            setSearch(`search=${e.target.value}`)
                                        }}
                                    />
                                </div>
                                <div className={styles.box}>
                                    <AiFillEnvironment size={20} />
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
                        </div>
                    </div>
                </div>
                <Image src={Carte} alt="Carte France" />
            </Modal>
            <Footer />
        </div>
    )
}
