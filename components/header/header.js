import React from "react"

import Headerleft from "./headerleft/headerleft"
import Headerright from "./headerright/headerright"

import styles from "./header.module.scss"

const Header = ({}) => {
    return (
        <div className={styles.maindiv}>
            <Headerleft />
            <Headerright />
        </div>
    )
}

export default Header
