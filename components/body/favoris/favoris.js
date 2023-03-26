import React, { useState, useContext } from "react"
import { AiFillHeart } from "react-icons/ai"

import Button from "../button/button"

import userService from "../../../services/user.service"

import styles from "./favoris.module.scss"

import AuthContext from "../../../contexts/AuthContext"

const Favoris = ({ idElement }) => {
    const { userContext } = useContext(AuthContext)
    const [isExist, setIsExist] = useState(false)

    async function addFavoris(id) {
        console.log(id)
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
                    console.log(favoris, "fff")
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
        } else {
            console.log("Vous n'êtes pas connectés")
        }
    }
    return (
        <div>
            <Button
                onClick={() => {
                    addFavoris({ idElement })
                }}
            >
                <div className={styles.heart}>
                    <AiFillHeart size={25} />
                </div>
                {/* {isExist ? (
        <AiFillHeart size={25} />
    ) : (
        <AiOutlineHeart size={25} />
    )} */}
            </Button>
        </div>
    )
}

export default Favoris
