import React, { useContext, useEffect, useState } from "react"
import { useRouter } from "next/router"
import { AiOutlineHeart } from "react-icons/ai"
import { BiMessageDetail, BiUser } from "react-icons/bi"

import Button from "../../body/button/button"

import styles from "./headerright.module.scss"

import AuthContext from "../../../contexts/AuthContext"
import userService from "../../../services/user.service"

const Headerright = () => {
    const router = useRouter()
    const { userContext, setUserContext } = useContext(AuthContext)
    const [isContext, setIsContext] = useState(false)
    const [isContextImage, setIsContextImage] = useState(false)
    const [isContextUsername, setIsContextUsername] = useState(false)

    useEffect(() => {
        if (userContext) {
            console.log(userContext, "USERCONTEXT")
            if (userContext.token) {
                userService.verifyToken(userContext.token).then(data => {
                    if (data.auth) {
                        setIsContext(true)
                        if (userContext.image) {
                            setIsContextImage(true)
                        } else {
                            setIsContextImage(false)
                        }
                        if (userContext.username) {
                            setIsContextUsername(true)
                        } else {
                            setIsContextUsername(false)
                        }
                    }
                })
            }
            userService
                .getuser(userContext.id)
                .then(data => {
                    setUserContext({ ...userContext, favorite: data.user.favorite })
                })
                .catch(err => console.log(err))
        } else {
            setIsContext(false)
        }
    }, [])

    const direction = () => {
        if (userContext && userContext.token)
            userService.verifyToken(userContext.token).then(data => {
                if (data.auth) {
                    router.push("/profil")
                } else {
                    router.push("/auth/login")
                }
            })
        else {
            router.push("/auth/login")
        }
    }

    return (
        <div className={styles.container}>
            {isContext ? (
                <div className={styles.container}>
                    <div className="py-r py-t py-l">
                        <Button
                            className="btn btn-white"
                            onClick={() => {
                                router.push("/favorite")
                            }}
                        >
                            <AiOutlineHeart size={30} />
                        </Button>
                        <p className="title title-h6 color-grey text-center">Favoris</p>
                    </div>
                    <div className="py-r py-t py-l">
                        <Button className="btn btn-white">
                            <BiMessageDetail size={30} />
                        </Button>
                        <p className="title title-h6 color color-grey text text-center">Messages</p>
                    </div>
                    <div className="py-r py-t">
                        <Button className="btn btn-white" onClick={() => direction()}>
                            {isContextImage ? (
                                <img
                                    className="image-icon"
                                    src={userContext.image}
                                    alt="photo utilisateur"
                                />
                            ) : (
                                <BiUser size={30} />
                            )}
                        </Button>
                        {isContext ? (
                            <p className="title title-h6 color color-grey text text-center">
                                {userContext.username || "Username"}
                            </p>
                        ) : (
                            <p className="title title-h6 color color-grey text-center">
                                Se connecter
                            </p>
                        )}
                    </div>
                </div>
            ) : (
                <div>
                    <Button className="btn btn-white" onClick={() => direction()}>
                        <BiUser size={30} />
                    </Button>

                    <p className="title title-h6 color color-grey text text-center">Se connecter</p>
                </div>
            )}
        </div>
    )
}

export default Headerright
