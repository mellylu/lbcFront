import React from "react"

const Button = ({ title, id, onClick, className, children }) => (
    <button id={id} onClick={onClick} className={className}>
        {title && <p>{title}</p>}
        {children}
    </button>
)
export default Button
