import React from "react"
import { AiOutlineHeart } from "react-icons/ai"
import { BiMessageDetail, BiUser } from "react-icons/bi"
import Button from "../../body/button/button"

import styles from "./headerright.module.scss"

const Headerright = () => {
    return (
        <div className={styles.maindiv}>
            <div className="py py-l py-r">
                <Button className="btn btn-white">
                    <AiOutlineHeart size={30} />
                </Button>
                <p className="title title-h6 color color-grey text text-center">Favoris</p>
            </div>
            <div className="py py-l py-r">
                <Button className="btn btn-white">
                    <BiMessageDetail size={30} />
                </Button>
                <p className="title title-h6 color color-grey text text-center">Messages</p>
            </div>
            <div className="py py-l py-r">
                <Button className="btn btn-white">
                    <BiUser size={30} />
                </Button>
                <p className="title title-h6 color color-grey text text-center">Se connecter</p>
            </div>
        </div>
    )
}

export default Headerright
