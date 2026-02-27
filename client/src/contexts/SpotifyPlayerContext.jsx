import React, { createContext, useContext, useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import ReactPlayer from 'react-player'
import {
    setTrack, setPlaying, setProgress, setDuration
} from '../redux/slices/playerSlice'

const SpotifyPlayerContext = createContext(null)

export function SpotifyPlayerProvider({ children }) {
    const dispatch = useDispatch()
    const playerRef = useRef(null)

    // Internal player state
    const [ytUrl, setYtUrl] = useState(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [volume, setVolume] = useState(0.8)
    const [error, setError] = useState(null)
    const [isReady, setIsReady] = useState(true) // Always ready since we don't need a Spotify handshake

    const play = async (spotifyUri, trackMetaOverrides) => {
        try {
            setError(null)
            // Parse the query cleanly.
            // When play() is called in the UI, we'll pass the exact track name + artist name 
            // example trackMetaOverrides = { name: "Blinding Lights", artist: "The Weeknd" }
            if (!trackMetaOverrides?.name || !trackMetaOverrides?.artist) {
                throw new Error("Missing track metadata for YouTube search fallback")
            }

            const searchQuery = `${trackMetaOverrides.name} ${trackMetaOverrides.artist} audio`

            // 1. Ask our backend to find this song on YTMusic
            const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/ytmusic/search?q=${encodeURIComponent(searchQuery)}`)

            if (res.data?.url) {
                setYtUrl(res.data.url)
                setIsPlaying(true)
                dispatch(setPlaying(true))
            } else {
                throw new Error("Could not locate a playable stream for this track.")
            }
        } catch (err) {
            console.error('YTMusic Playback Error:', err)
            setError(err.response?.data?.error || err.message)
            setIsPlaying(false)
            dispatch(setPlaying(false))
        }
    }

    const togglePlayPause = () => {
        if (!ytUrl) return
        const newIsPlaying = !isPlaying
        setIsPlaying(newIsPlaying)
        dispatch(setPlaying(newIsPlaying))
    }

    const nextTrack = () => { /* Not implemented for single clicks yet */ }
    const previousTrack = () => { /* Not implemented for single clicks yet */ }

    const seek = (seconds) => {
        if (playerRef.current) {
            playerRef.current.seekTo(seconds, 'seconds')
            dispatch(setProgress(seconds))
        }
    }

    const updateVolume = (vol) => {
        setVolume(vol / 100)
    }

    // ReactPlayer event handlers
    const handleProgress = (state) => {
        dispatch(setProgress(state.playedSeconds))
    }

    const handleDuration = (duration) => {
        dispatch(setDuration(duration))
    }

    const handleEnded = () => {
        setIsPlaying(false)
        dispatch(setPlaying(false))
        dispatch(setProgress(0))
    }

    const handleBuffer = () => {
        // UI could show a spinner here
    }

    const handleError = (e) => {
        console.error('ReactPlayer Error', e)
        setError("Playback stream crashed or is geographically unavailable.")
        setIsPlaying(false)
        dispatch(setPlaying(false))
    }


    const playerUtils = {
        player: playerRef.current,
        deviceId: "youtube-engine",
        isReady,
        error,
        play,
        togglePlayPause,
        nextTrack,
        previousTrack,
        seek,
        updateVolume
    }

    return (
        <SpotifyPlayerContext.Provider value={playerUtils}>
            {children}
            {/* Hidden Audio Engine */}
            {ytUrl && (
                <div style={{ display: 'none' }}>
                    <ReactPlayer
                        ref={playerRef}
                        url={ytUrl}
                        playing={isPlaying}
                        volume={volume}
                        onProgress={handleProgress}
                        onDuration={handleDuration}
                        onEnded={handleEnded}
                        onBuffer={handleBuffer}
                        onError={handleError}
                        config={{
                            youtube: {
                                playerVars: { showinfo: 0, autoplay: 1 }
                            }
                        }}
                    />
                </div>
            )}
        </SpotifyPlayerContext.Provider>
    )
}

export function useSpotify() {
    return useContext(SpotifyPlayerContext)
}
