import React from "react"
import { useRouter } from "next/router"

import styles from "./detailfilter.module.scss"

const Detailfilter = ({ filtre, title, onClick }) => {
    let router = useRouter()

    return (
        <div>
            {filtre !== undefined && filtre.length > 0 ? (
                <div>
                    <h3>{title}</h3>

                    {filtre.map(el => (
                        <div key={el} className={styles.checkbox}>
                            <input
                                className={styles.input}
                                id={el}
                                value={el}
                                defaultChecked={
                                    router.query.type && router.query.type.indexOf(el) !== -1
                                }
                                type="checkbox"
                                onClick={onClick}
                            />
                            <label> {el}</label>
                        </div>
                    ))}
                </div>
            ) : (
                ""
            )}
        </div>
    )
}

export default Detailfilter
