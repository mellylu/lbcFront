import React from "react"
import Image from "next/image"
import { AiOutlineSearch } from "react-icons/ai"

import Button from "../../body/button/button"
import Input from "../../body/input/input"

import Logo from "../../../public/Leboncoin_Logo.png"

import styles from "./headerleft.module.scss"

const Headerleft = () => {
    return (
        <div className={styles.maindiv}>
            <Image src={Logo} alt="Logo leboncoin" className="image image-small" />
            <div className="py py-l py-r">
                <Button className="btn btn-orange" title="+ Déposer une annonce" />
            </div>
            <div className={`${styles.searchdiv} py py-l`}>
                <AiOutlineSearch size={20} />
                <Input className="input input-search" placeholder="Rechercher" />
            </div>
        </div>
    )
}

export default Headerleft
