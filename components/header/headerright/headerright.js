import React, { useContext, useEffect } from "react"
import { useRouter } from "next/router"
import { AiOutlineHeart } from "react-icons/ai"
import { BiMessageDetail, BiUser } from "react-icons/bi"

import Button from "../../body/button/button"

import styles from "./headerright.module.scss"

import AuthContext from "../../../contexts/AuthContext"

const Headerright = () => {
    const router = useRouter()
    const { userContext } = useContext(AuthContext)

    useEffect(() => {
        console.log(`userContext ${userContext}`)
    })
    const direction = () => {
        router.push("/auth/login")
    }

    return (
        <div className={styles.maindiv}>
            <div className={`${styles.button} py py-l py-r`}>
                <Button className="btn btn-white">
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
                {!userContext ? (
                    <div>
                        {/* <Button className="btn btn-white" onClick={() => direction()}>
                            <BiUser size={30} />
                        </Button> */}
                        {/* <p className="title title-h6 color color-grey text text-center">
                            Se connecter
                        </p> */}
                    </div>
                ) : (
                    <div>
                        <Button className="btn btn-white" onClick={() => router.push("/profil")}>
                            <BiUser size={30} />
                        </Button>
                        <p className="title title-h6 color color-grey text text-center">
                            {userContext && userContext.username ? userContext.username : ""}
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Headerright
