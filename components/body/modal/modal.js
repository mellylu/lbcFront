import React from "react"
import Image from "next/image"

import Pub2 from "../../../public/pub2.png"
import Pub from "../../../public/pub.png"

import styles from "./modal.module.scss"
import { BiPhotoAlbum } from "react-icons/bi"

const Modal = ({ children, title = false, text }) => {
    return (
        <div className={`${styles.flex}`}>
            <Image src={Pub} className={styles.image} alt="pub" />
            <div className={styles.container}>
                {title ? <h1 className="title-h0 text-center py-t">{text}</h1> : ""}

                <br />
                {children}
            </div>
            <Image src={Pub2} alt="pub" />
        </div>
    )
}

export default Modal
