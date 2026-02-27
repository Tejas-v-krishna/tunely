import React, { createContext, useContext, useState, useRef, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import {
    setTrack, setPlaying, setProgress, setDuration
} from '../redux/slices/playerSlice'

const SpotifyPlayerContext = createContext(null)

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export function SpotifyPlayerProvider({ children }) {
    const dispatch = useDispatch()
    const audioRef = useRef(null)

    const [error, setError] = useState(null)
    const [isReady] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    // Ensure we have one shared Audio element
    const getAudio = useCallback(() => {
        if (!audioRef.current) {
            const audio = new Audio()

            audio.addEventListener('playing', () => {
                dispatch(setPlaying(true))
            })
            audio.addEventListener('pause', () => {
                dispatch(setPlaying(false))
            })
            audio.addEventListener('ended', () => {
                dispatch(setPlaying(false))
                dispatch(setProgress(0))
            })
            audio.addEventListener('timeupdate', () => {
                dispatch(setProgress(audio.currentTime))
            })
            audio.addEventListener('loadedmetadata', () => {
                dispatch(setDuration(audio.duration))
            })
            audio.addEventListener('error', (e) => {
                console.error('Audio element error:', e)
                setError('Audio playback failed. The track may be unavailable.')
                dispatch(setPlaying(false))
            })

            audioRef.current = audio
        }
        return audioRef.current
    }, [dispatch])

    const play = async (spotifyUri, trackMeta) => {
        try {
            setError(null)
            setIsLoading(true)

            if (!trackMeta?.name || !trackMeta?.artist) {
                throw new Error('Missing track metadata for search')
            }

            const searchQuery = `${trackMeta.name} ${trackMeta.artist}`

            // 1. Search YTMusic for the videoId
            const searchRes = await axios.get(
                `${API_URL}/api/ytmusic/search?q=${encodeURIComponent(searchQuery)}`,
                { timeout: 10000 }
            )

            if (!searchRes.data?.videoId) {
                throw new Error('Could not find this track on YouTube Music.')
            }

            // 2. Get the direct audio URL (this can take ~10-15 seconds first time)
            const audioRes = await axios.get(
                `${API_URL}/api/ytmusic/audio-url/${searchRes.data.videoId}`,
                { timeout: 30000 } // 30 second timeout — ytdl-core needs ~10-15s
            )

            if (!audioRes.data?.audioUrl) {
                throw new Error('Could not extract audio stream for this track.')
            }

            // 3. Play it using the native Audio element
            const audio = getAudio()
            audio.src = audioRes.data.audioUrl
            audio.load()
            await audio.play()

            setIsLoading(false)
        } catch (err) {
            console.error('Play Error:', err)
            setError(err.response?.data?.error || err.message)
            setIsLoading(false)
            dispatch(setPlaying(false))
        }
    }

    const togglePlayPause = () => {
        const audio = audioRef.current
        if (!audio) return
        if (audio.paused) {
            audio.play()
        } else {
            audio.pause()
        }
    }

    const nextTrack = () => { }
    const previousTrack = () => { }

    const seek = (seconds) => {
        const audio = audioRef.current
        if (audio) {
            audio.currentTime = seconds
            dispatch(setProgress(seconds))
        }
    }

    const updateVolume = (vol) => {
        const audio = audioRef.current
        if (audio) {
            audio.volume = vol / 100
        }
    }

    const playerUtils = {
        player: audioRef.current,
        deviceId: 'tunely-audio-engine',
        isReady,
        isLoading,
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
        </SpotifyPlayerContext.Provider>
    )
}

export function useSpotify() {
    return useContext(SpotifyPlayerContext)
}
