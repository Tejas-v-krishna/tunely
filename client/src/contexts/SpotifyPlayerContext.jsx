import React, { createContext, useContext } from 'react'
import useSpotifyPlayer from '../hooks/useSpotifyPlayer'

const SpotifyPlayerContext = createContext(null)

export function SpotifyPlayerProvider({ children }) {
    const playerUtils = useSpotifyPlayer()

    return (
        <SpotifyPlayerContext.Provider value={playerUtils}>
            {children}
        </SpotifyPlayerContext.Provider>
    )
}

export function useSpotify() {
    return useContext(SpotifyPlayerContext)
}
