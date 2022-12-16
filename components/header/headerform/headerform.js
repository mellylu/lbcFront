import React from "react"
import Image from "next/image"
import { VscPassFilled } from "react-icons/vsc"

import Logo from "../../../public/Leboncoin_Logo.png"

import styles from "./headerform.module.scss"

const Headerform = ({ title }) => {
    return (
        <div className={styles.maindiv}>
            <Image src={Logo} alt="Logo leboncoin" className="image image-small" />
            <p className="color color-orange title title-h2">
                | <VscPassFilled size={30} color="#ff6e14" />
                {title}
            </p>
        </div>
    )
}

export default Headerform
