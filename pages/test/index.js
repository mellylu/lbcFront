import React, { useState, useEffect } from "react"

const Index = () => {
    const categories = {
        data: {
            data: [
                { id: 1, name: "nnn" },
                { id: 2, name: "nnn" },
            ],
        },
        data: {
            data1: [
                { id: 3, name: "lll" },
                { id: 4, name: "llll" },
            ],
        },
    }

    useEffect(() => {
        console.log(categories.data)
    }, [])

    return <div></div>
}

export default Index
