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

import AuthContext from "../contexts/AuthContext"

import adService from "../services/ad.service"

import styles from "./index.module.scss"
import userService from "../services/user.service"

export default function Home() {
    const { userContext } = useContext(AuthContext)
    const [search, setSearch] = useState({})
    const [ad, setAd] = useState([])
    const [isExist, setIsExist] = useState(false)

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

    async function addFavoris(id) {
        if (userContext.token) {
            const user = await userService.getuser(userContext.id)
            var index = 0
            console.log(user, "usergg")
            let favorisExist = user.user.favorite.findIndex(el => {
                if (el.ad._id === id) {
                    setIsExist(true)
                    return el._id
                } else {
                    setIsExist(false)
                }
            })
            if (favorisExist === -1) {
                user.user.favorite.push({ ad: { _id: id } })
            } else {
                let newFavoris = []
                user.user.favorite.forEach(favoris => {
                    if (favoris.ad._id !== id) {
                        newFavoris.push(favoris)
                    }
                })
                user.user.favorite = newFavoris
            }
            console.log(user.user.favorite)
            userService
                .updateuser(userContext.id, { favorite: user.user.favorite })
                .then(dataFavoris => {
                    console.log(dataFavoris)
                    // if (dataFavoris.update == true) {
                    //     setData(dataFavoris.user)
                    // }
                })
                .catch(err => console.log(err))
        } else {
            console.log("Vous n'êtes pas connectés")
        }
    }

    return (
        <div className="width">
            <Header />

            <h1 className="title-h0 text-center py-t">
                Des millions de petites annonces et autant d occasions de se faire plaisir
            </h1>
            <br />
            <div className={styles.maindiv}>
                <div className={styles.div}>
                    <div className={`${styles.searchdiv} bgcolor-write`}>
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
                        <div>
                            {ad.map(element => {
                                console.log(element.price)
                                return (
                                    <div key={element._id} className={styles.flex}>
                                        <img src={element.image} className={styles.image} alt="" />
                                        <div>
                                            <p className="title title-h2">{element.price} $</p>
                                            <p>{element.name}</p>
                                            <p>{element.localization}</p>
                                            <p>{element.date}</p>
                                        </div>
                                        <Button
                                            className={styles.heart}
                                            onClick={() => {
                                                addFavoris(element._id)
                                            }}
                                        >
                                            {isExist ? (
                                                <AiFillHeart size={25} />
                                            ) : (
                                                <AiOutlineHeart size={25} />
                                            )}
                                        </Button>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
