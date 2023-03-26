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
    const [search, setSearch] = useState("")
    const [ad, setAd] = useState([])
    const [nbpage, setNbpage] = useState(0)
    const [totalpage, setTotalpage] = useState()
    const [sort, setSort] = useState({})
    const [localization, setLocalization] = useState({})
    const [category, setCategory] = useState("")
    const [isVisible, setIsVisible] = useState(false)
    const [userRecentSearch, setUserRecentSearch] = useState([])
    const [lat, setLat] = useState()
    const [lng, setLng] = useState()

    const searchAd = () => {
        router.push(
            `/test/bis/carte?${category}${
                search && category && search !== "search="
                    ? `&${search}`
                    : search && !category && search !== "search="
                    ? search
                    : ""
            }${
                lat && !category && !search
                    ? `lat=${lat}`
                    : lat && (category || search)
                    ? `&lat=${lat}`
                    : ""
            }${lng ? `&lng=${lng}` : ""}`,
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
            </Modal>
        </div>
    )
}
