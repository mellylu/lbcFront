import React from "react"
import { useRouter } from "next/router"
import Image from "next/image"
import { AiOutlineSearch } from "react-icons/ai"

import Button from "../../body/button/button"
import Input from "../../body/input/input"

import Logo from "../../../public/Leboncoin_Logo.png"

import styles from "./headerleft.module.scss"

const Headerleft = ({ postAdd }) => {
    const router = useRouter()
    return (
        <div className={styles.maindiv}>
            <div className={styles.searchdiv}>
                <Image
                    onClick={() => router.push("/")}
                    src={Logo}
                    alt="Logo leboncoin"
                    className="image image-small"
                />
            </div>
            {postAdd ? (
                <div className="py-l">
                    <h2> Déposer une annonce</h2>
                </div>
            ) : (
                <div className={`${styles.searchdiv}`}>
                    {/* <div className={`${styles.searchdiv} py py-l py-r`}> */}
                    <Button
                        onClick={() => router.push("/ad/postad")}
                        className="btn btn-orange"
                        title="+ Déposer une annonce"
                        classNameTitle={styles.size}
                    />
                    {/* </div> */}
                    <div className={`${styles.searchdiv} py py-l`}>
                        <AiOutlineSearch size={20} />
                        <Input className="input input-search" placeholder="Rechercher" />
                    </div>
                </div>
            )}
        </div>
    )
}

export default Headerleft
