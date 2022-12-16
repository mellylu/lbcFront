import React from "react"

import styles from "./message.module.scss"

const Message = ({ type, mess }) => {
    return (
        <div className={styles.divmessage}>
            {type === "error" ? <div className={styles.divmessageerror}>{mess}</div> : ""}
            {type === "valid" ? <div className={styles.divmessagevalid}>{mess}</div> : ""}
        </div>
    )
}

export default Message
