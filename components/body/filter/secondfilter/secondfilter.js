import React, { useState, useEffect } from "react"

import styles from "./secondfilter.module.scss"

const Secondfilter = ({ secondFilter, univers, setUnivers, type, setType, color, setColor }) => {
    useEffect(() => console.log(type, "TYPE"))
    const functionType = e => {
        console.log(type.indexOf(e.target.value))
        if (type.indexOf(e.target.value) === -1) {
            setType([...type, e.target.value])
        } else {
            setType(type.filter(el => el !== e.target.value))
        }
    }

    const functionColor = e => {
        console.log(type.indexOf(e.target.value))
        if (type.indexOf(e.target.value) === -1) {
            setType([...type, e.target.value])
        } else {
            setType(type.filter(el => el !== e.target.value))
        }
    }

    const functionUnivers = e => {
        console.log(type.indexOf(e.target.value))
        if (type.indexOf(e.target.value) === -1) {
            setType([...type, e.target.value])
        } else {
            setType(type.filter(el => el !== e.target.value))
        }
    }
    return (
        <div>
            {secondFilter
                ? secondFilter.map(element => (
                      <div key={element._id} className={styles.flex}>
                          {element.univers !== undefined && element.univers.length > 0 ? (
                              <div>
                                  <h3>Univers</h3>

                                  {element.univers.map(el => (
                                      <div key={el}>
                                          <input
                                              id={el}
                                              value={el}
                                              type="checkbox"
                                              onClick={e => {
                                                  functionUnivers(e)
                                              }}
                                          ></input>
                                          <label> {el}</label>
                                      </div>
                                  ))}
                              </div>
                          ) : (
                              ""
                          )}
                          {element.type !== undefined && element.type.length > 0 ? (
                              <div>
                                  <h3>Type</h3>

                                  {element.type.map(el => (
                                      <div key={el}>
                                          <input
                                              id={el}
                                              value={el}
                                              type="checkbox"
                                              onClick={e => {
                                                  functionType(e)
                                              }}
                                          ></input>
                                          <label> {el}</label>
                                      </div>
                                  ))}
                              </div>
                          ) : (
                              ""
                          )}
                          {element.color !== undefined && element.color.length > 0 ? (
                              <div>
                                  <h3>Color</h3>

                                  {element.color.map(el => (
                                      <div key={el}>
                                          <input
                                              id={el}
                                              value={el}
                                              type="checkbox"
                                              onClick={e => {
                                                  functionColor(e)
                                              }}
                                          ></input>
                                          <label> {el}</label>
                                      </div>
                                  ))}
                              </div>
                          ) : (
                              ""
                          )}
                      </div>
                  ))
                : ""}
        </div>
    )
}

export default Secondfilter
