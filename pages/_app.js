import "../styles/styles.scss"
import Head from "next/head"

import { AuthContextProvider } from "../contexts/AuthContext"
import { FilterContextProvider } from "../contexts/FilterContext"
import Footer from "../components/footer/footer"

function MyApp({ Component, pageProps }) {
    return (
        <AuthContextProvider>
            <FilterContextProvider>
                <div className="width">
                    <Head>
                        <title>Leboncoin petite annonce</title>
                        <meta name="description" content="Generated by create next app" />
                        <link rel="icon" href="/Leboncoin_Icone.ico" />
                    </Head>

                    <Component {...pageProps} />
                    <footer>
                        <p>dlksnkdsnkg</p>
                    </footer>
                </div>
            </FilterContextProvider>
        </AuthContextProvider>
    )
}

export default MyApp
