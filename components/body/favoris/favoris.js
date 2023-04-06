import React, { useState, useContext, useEffect } from "react"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"

import Button from "../button/button"

import userService from "../../../services/user.service"

import styles from "./favoris.module.scss"

import AuthContext from "../../../contexts/AuthContext"

const Favoris = ({ idElement }) => {
    const { userContext, setUserContext } = useContext(AuthContext)
    const [isExist, setIsExist] = useState(false)
    const [isFavorite, setIsFavorite] = useState()

    async function addFavoris(id) {
        id = id.idElement
        if (userContext.token) {
            const user = await userService.getuser(userContext.id)
            let favorisExist = user.user.favorite.findIndex(el => {
                console.log(el)
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
            userService
                .updateuser(userContext.id, { favorite: user.user.favorite })
                .then(dataFavoris => {
                    console.log(dataFavoris)
                    // if (dataFavoris.update == true) {
                    //     setData(dataFavoris.user)
                    // }
                })
                .catch(err => console.log(err))
            userService
                .getuser(userContext.id)
                .then(data => {
                    setUserContext({ ...userContext, favorite: data.user.favorite })
                })
                .catch(err => console.log(err))
            // location.reload()
        } else {
            console.log("Vous n'êtes pas connectés")
        }
    }

    useEffect(() => {
        let cpt = 0
        if (userContext && userContext.favorite) {
            userContext.favorite.forEach(element => {
                console.log(element.ad.name)
                if (element.ad._id.includes(idElement)) {
                    cpt += 1
                }
            })
            if (cpt === 0) {
                setIsFavorite(false)
            } else {
                setIsFavorite(true)
            }
        }
    }, [userContext])

    return (
        <div className={styles.divmain}>
            <Button
                className="btn btn-heart"
                onClick={() => {
                    addFavoris({ idElement })
                }}
            >
                {isFavorite ? (
                    <div className="btn btn-heart">
                        <AiFillHeart size={25} />
                    </div>
                ) : (
                    <div>
                        <AiOutlineHeart className="btn btn-heart" size={25} />
                    </div>
                )}
            </Button>
        </div>
    )
}

export default Favoris
