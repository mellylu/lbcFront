import React from "react"

import checkoutService from "../../../services/checkout.service"
import Button from "../button/button"

const Paybutton = ({ cartItems }) => {
    const handleCheckout = () => {
        const token =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjliNTQzMzkwMWZjYzQwOWUxNmZiOSIsImlhdCI6MTY4MDQ1NDk4NywiZXhwIjoxNjgwNTQxMzg3fQ.C7ntHRW7NSDcZ-9wbJUyThHsAhwVqG3SxqJJaJXStuk"
        checkoutService
            .createCheckoutSession(token, cartItems)
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
            <Button className="btn btn-blue" title="Payer" onClick={() => handleCheckout()} />
        </div>
    )
}

export default Paybutton
