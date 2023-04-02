import React from "react"

import checkoutService from "../../../services/checkout.service"
import Button from "../button/button"

const Paybutton = ({ cartItems }) => {
    const tab = []
    const handleCheckout = () => {
        tab.push(cartItems)

        const token =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjliNTQzMzkwMWZjYzQwOWUxNmZiOSIsImlhdCI6MTY4MDQ1NDk4NywiZXhwIjoxNjgwNTQxMzg3fQ.C7ntHRW7NSDcZ-9wbJUyThHsAhwVqG3SxqJJaJXStuk"
        checkoutService
            .createCheckoutSession(token, tab)
            .then(res => {
                console.log(res)
                if (res.url) {
                    window.location.href = res.url
                }
            })
            .catch(err => console.log(err.message))
    }
    return (
        <div>
            <Button title="Payer" onClick={() => handleCheckout()} />
        </div>
    )
}

export default Paybutton
