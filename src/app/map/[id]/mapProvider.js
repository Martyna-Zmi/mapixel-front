"use client"
import {useCallback, useState} from "react";
import React from "react";
export const MapContext = React.createContext(null)

export default function MapProvider({children}){
    const [map, setMap] = useState(null)
    const [fields, setFields] = useState([])
    const [fieldCatalog, setFieldCatalog] = useState([])
    const [selectedField, setSelectedField] = useState(0)
    const [toolField, setToolField] = useState(0)
    const [unsavedChanges, setUnsavedChanges] = useState(false)
    const [history, setHistory] = useState([])
    const [category, setCategory] = useState("terrain")
    return(
        <MapContext.Provider value={{map, setMap, fields, setFields, selectedField, setSelectedField, toolField, setToolField, fieldCatalog, setFieldCatalog, unsavedChanges, setUnsavedChanges, history, setHistory, category, setCategory}}>
            {children}
        </MapContext.Provider>
    )
}