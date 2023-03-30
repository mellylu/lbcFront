import React, { createContext, useState, useEffect } from "react"
import jwtDecode from "jwt-decode"

const FilterContext = createContext({
    filterContext: {},
    setFilterContext: () => {},
})

export const FilterContextProvider = ({ children }) => {
    const [filtreContext, setFilterContext] = useState()
    // {},

    useEffect(() => {
        localStorage.getItem("filtre") !== "undefined"
            ? JSON.parse(localStorage.getItem("filtre"))
            : {}
        setFilterContext(
            localStorage.getItem("filtre") !== "undefined"
                ? JSON.parse(localStorage.getItem("filtre"))
                : {},
        )

        // const cartData = JSON.parse(localStorage.getItem("filtre"))
        // if (cartData) {
        //     setFilterContext(cartData)
        // }
    }, [])

    // console.log(JSON.parse(localStorage.getItem("filter")), "FILTER")
    const context = {
        filtreContext,
        setFilterContext,
    }
    useEffect(() => {
        localStorage.setItem("filtre", JSON.stringify(filtreContext))
        return () => {
            localStorage.setItem("filtre", JSON.stringify(filtreContext))
        }
    }, [filtreContext])

    return <FilterContext.Provider value={context}>{children}</FilterContext.Provider>
}

export default FilterContext
