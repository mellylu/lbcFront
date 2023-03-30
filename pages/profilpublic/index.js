import React, { useEffect, useState, useContext } from "react"
import { useRouter } from "next/router"
import Announcement from "../../components/body/announcement/announcement"

import Header from "../../components/header/header"

import styles from "./index.module.scss"

import AuthContext from "../../contexts/AuthContext"

import userService from "../../services/user.service"

const Index = () => {
    const { userContext } = useContext(AuthContext)
    const router = useRouter()
    const [announcement, setAnnouncement] = useState([])
    const [cpt, setCpt] = useState()
    const [s, setS] = useState(false)

    useEffect(() => {
        if (userContext) {
            if (userContext.token) {
                userService.verifyToken(userContext.token).then(data => {
                    if (!data.auth) {
                        router.push("/auth/login")
                    }
                })
            }
        } else {
            router.push("/auth/login")
        }
        if (userContext) {
            userService
                .getuser(userContext.id)
                .then(data => {
                    if (
                        data.user.announcement.length === 0 ||
                        data.user.announcement.length === 1
                    ) {
                        setS(false)
                    } else {
                        console.log("non")
                        setS(true)
                    }
                    setAnnouncement(data.user.announcement)
                    setCpt(data.user.announcement.length)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }, [])

    return (
        <div className="width">
            <Header />
            <h1 className="title-h0 text-center py-t">Profil public</h1>
            <div className={styles.maindiv}>
                <div className={styles.div}>
                    <div className={`${styles.searchdiv}`}>
                        {s ? (
                            <div>
                                <p> {cpt} annonces</p>
                            </div>
                        ) : (
                            <div>
                                <p> {cpt} annonce</p>
                            </div>
                        )}
                        <Announcement stateElement={announcement} ad={true} favoris={false} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index
