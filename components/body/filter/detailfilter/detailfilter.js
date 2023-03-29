import React from "react"

const Detailfilter = ({ filtre, title, onClick }) => {
    return (
        <div>
            {filtre !== undefined && filtre.length > 0 ? (
                <div>
                    <h3>{title}</h3>

                    {filtre.map(el => (
                        <div key={el}>
                            <input id={el} value={el} type="checkbox" onClick={onClick}></input>
                            <label> {el}</label>
                        </div>
                    ))}
                </div>
            ) : (
                ""
            )}
        </div>
    )
}

export default Detailfilter
