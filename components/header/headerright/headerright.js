import React, { useContext, useEffect, useState } from "react"
import { useRouter } from "next/router"
import { AiOutlineHeart } from "react-icons/ai"
import { BiMessageDetail, BiUser } from "react-icons/bi"

import Button from "../../body/button/button"

import styles from "./headerright.module.scss"

import AuthContext from "../../../contexts/AuthContext"

const Headerright = () => {
    const router = useRouter()
    const { userContext } = useContext(AuthContext)
    const [isContext, setIsContext] = useState(false)
    const [isContextImage, setIsContextImage] = useState(false)
    const [isContextUsername, setIsContextUsername] = useState(false)

    useEffect(() => {
        console.log(`userContext ${userContext}`)
        if (userContext) {
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
        } else {
            setIsContext(false)
        }
    })

    const direction = () => {
        if (isContext) {
            router.push("/profil")
        } else {
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
                                    className="image-profil"
                                    src={userContext.image}
                                    alt="photo utilisateur"
                                />
                            ) : (
                                <BiUser size={30} />
                            )}
                        </Button>
                        {isContextUsername ? (
                            <p className="title title-h6 color color-grey text text-center">
                                {userContext.username}
                            </p>
                        ) : (
                            <p className="title title-h6 color color-grey text text-center">
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
