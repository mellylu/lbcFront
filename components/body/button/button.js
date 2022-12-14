import React from "react"

const Button = ({ title, onClick, className, children }) => (
    <button onClick={onClick} className={className}>
        {title && <p>{title}</p>}
        {children}
    </button>
)
export default Button
