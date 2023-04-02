import React from "react"
import { useRouter } from "next/router"

import Button from "../../../components/body/button/button"
import Headerleft from "../../../components/header/headerleft/headerleft"

import styles from "../index.module.scss"

const index = () => {
    const router = useRouter()

    return (
        <div className="width">
            <div className={styles.maindiv}>
                <Headerleft postAdd={true} title="Déposer un annonce" />
                <div className={styles.maindiv2}>
                    <Button
                        onClick={() => router.push("/home")}
                        className="btn-white"
                        title="Quitter"
                    />
                </div>
            </div>
            <div className={styles.divbody}>
                <h1 className="text-center">Votre annonce a été ajoutée !</h1>
                <br />
                <Button
                    onClick={() => router.push("/home")}
                    className="btn btn-linkPage"
                    title="Revenir à la page d accueil"
                />
                <br />
                <Button
                    onClick={() => router.push("/profilpublic")}
                    className="btn btn-linkPage"
                    title="Visualiser mes annonces dans mon profil"
                />
            </div>
        </div>
    )
}

export default index
