import React from "react"

const Input = ({ label, type, value, placeholder, required, onChange, className }) => {
    return (
        <div>
            <input
                type={type}
                id={label}
                value={value}
                placeholder={placeholder}
                required={required}
                onChange={onChange}
                className={className}
            />
        </div>
    )
}

export default Input
