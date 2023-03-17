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

    useEffect(() => {
        console.log(`userContext ${userContext}`)
        if (userContext) {
            setIsContext(true)
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
        <div className={styles.maindiv}>
            <div className={`${styles.button} py py-l py-r`}>
                <Button className="btn btn-white" onClick={() => router.push("/favorite")}>
                    <AiOutlineHeart size={30} />
                </Button>
                <p className="title title-h6 color-grey text-center">Favoris</p>
            </div>
            <div className="py py-l py-r">
                <Button className="btn btn-white">
                    <BiMessageDetail size={30} />
                </Button>
                <p className="title title-h6 color color-grey text text-center">Messages</p>
            </div>
            <div className="py py-l py-r">
                <Button className="btn btn-white" onClick={() => direction()}>
                    <BiUser size={30} />
                </Button>
                {isContext ? (
                    <p className="title title-h6 color color-grey text text-center">
                        {userContext.username}
                    </p>
                ) : (
                    <p className="title title-h6 color color-grey text text-center">Se connecter</p>
                )}
            </div>
        </div>
    )
}

export default Headerright
