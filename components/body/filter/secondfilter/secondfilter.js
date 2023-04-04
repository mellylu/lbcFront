import React, { useState, useEffect, useContext } from "react"
import { useRouter } from "next/router"

import FilterContext from "../../../../contexts/FilterContext"

import Detailfilter from "../detailfilter/detailfilter"
import styles from "./secondfilter.module.scss"

const Secondfilter = ({
    secondFilter,
    univers,
    setUnivers,
    type,
    setType,
    color,
    setColor,
    size,
    setSize,
    brand,
    setBrand,
    material,
    setMaterial,
    state,
    setState,
}) => {
    // const { filtreContext, setFilterContext } = useContext(FilterContext)
    // const [isNotNull, setIsNotNull] = useState(false)
    let router = useRouter()
    const functionType = e => {
        if (type.indexOf(e.target.value) === -1) {
            setType([...type.filter(element => element !== undefined), e.target.value])
        } else {
            setType(type.filter(el => el !== e.target.value))
        }
    }

    const functionMaterial = e => {
        if (material.indexOf(e.target.value) === -1) {
            setMaterial([...material.filter(element => element !== undefined), e.target.value])
        } else {
            setMaterial(material.filter(el => el !== e.target.value))
        }
    }

    const functionColor = e => {
        if (color.indexOf(e.target.value) === -1) {
            setColor([...color, e.target.value])
        } else {
            setColor(color.filter(el => el !== e.target.value))
        }
    }

    const functionUnivers = e => {
        if (univers.indexOf(e.target.value) === -1) {
            setUnivers([...univers, e.target.value])
        } else {
            setUnivers(univers.filter(el => el !== e.target.value))
        }
    }

    const functionSize = e => {
        if (size.indexOf(e.target.value) === -1) {
            setSize([...size, e.target.value])
        } else {
            setSize(size.filter(el => el !== e.target.value))
        }
    }

    const functionBrand = e => {
        if (brand.indexOf(e.target.value) === -1) {
            setBrand([...brand, e.target.value])
        } else {
            setBrand(brand.filter(el => el !== e.target.value))
        }
    }

    const functionState = e => {
        if (state.indexOf(e.target.value) === -1) {
            setState([...state, e.target.value])
        } else {
            setState(state.filter(el => el !== e.target.value))
        }
    }

    return (
        <div>
            {secondFilter
                ? secondFilter.map(element => (
                      <div key={element._id} className={styles.flex}>
                          <Detailfilter
                              filtre={element.univers}
                              title="Univers"
                              onClick={e => {
                                  functionUnivers(e)
                              }}
                          />
                          <Detailfilter
                              filtre={element.type}
                              title="Type"
                              onClick={e => {
                                  functionType(e)
                              }}
                          />
                          <Detailfilter
                              filtre={element.material}
                              title="Matière"
                              onClick={e => {
                                  functionMaterial(e)
                              }}
                          />
                          <Detailfilter
                              filtre={element.color}
                              title="Couleur"
                              onClick={e => {
                                  functionColor(e)
                              }}
                          />
                          <Detailfilter
                              filtre={element.size}
                              title="Taille"
                              onClick={e => {
                                  functionSize(e)
                              }}
                          />
                          <Detailfilter
                              filtre={element.brand}
                              title="Marque"
                              onClick={e => {
                                  functionBrand(e)
                              }}
                          />

                          <Detailfilter
                              filtre={element.state}
                              title="Etat"
                              onClick={e => {
                                  functionState(e)
                              }}
                          />
                      </div>
                  ))
                : ""}
        </div>
    )
}

export default Secondfilter
