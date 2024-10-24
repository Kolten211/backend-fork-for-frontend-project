import { createContext, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchSpots } from "../store/spotActions";

export const SpotContext = createContext();

export const SpotProvider = ({ children }) => {
    const [ spots, setSpots] =useState([]);
    const dispatch = useDispatch()
    useEffect(() => {
        async function fetchAndSetSpots() {
            const fetchedSpots = await dispatch(fetchSpots());
            setSpots(fetchedSpots)
        }
        fetchAndSetSpots()
    }, [dispatch]);
    return (
        <SpotContext.Provider value={spots}>
            {children}
        </SpotContext.Provider>
    )
}