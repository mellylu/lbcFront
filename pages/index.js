import React, { useEffect } from "react"
import { useRouter } from "next/router"

const Index = () => {
    const router = useRouter()
    useEffect(() => {
        router.push("/home")
        //IL FAUT DECONNECTER L'UTILISATEUR AVANT CHAQUE UTILISATION
    }, [])

    return <div></div>
}

export default Index
