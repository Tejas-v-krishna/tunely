import { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    setTrack, setPlaying, setProgress, setDuration,
    setVolume
} from '../redux/slices/playerSlice'

export default function useSpotifyPlayer() {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)
    const token = user?.accessToken
    const playerRef = useRef(null)
    const [deviceId, setDeviceId] = useState(null)
    const [isReady, setIsReady] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!token) return

        // Inject Spotify script if not already present
        if (!document.getElementById('spotify-player-script')) {
            const script = document.createElement('script')
            script.id = 'spotify-player-script'
            script.src = 'https://sdk.scdn.co/spotify-player.js'
            script.async = true
            document.body.appendChild(script)
        }

        window.onSpotifyWebPlaybackSDKReady = () => {
            const player = new window.Spotify.Player({
                name: 'Tunely Web Player',
                getOAuthToken: cb => { cb(token) },
                volume: 0.8
            })

            player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id)
                setDeviceId(device_id)
                setIsReady(true)
            })

            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id)
                setIsReady(false)
            })

            const logError = (type, message) => {
                console.error(type, message)
                setError(`SDK ${type}: ${message}`)
            }

            player.addListener('initialization_error', ({ message }) => logError('Init Error', message))
            player.addListener('authentication_error', ({ message }) => logError('Auth Error', message))
            player.addListener('account_error', ({ message }) => logError('Account Error', message))
            player.addListener('playback_error', ({ message }) => logError('Playback Error', message))

            player.addListener('player_state_changed', state => {
                if (!state) return

                const track = state.track_window.current_track
                if (track) {
                    dispatch(setTrack({
                        id: track.id,
                        title: track.name,
                        artist: track.artists.map(a => a.name).join(', '),
                        cover: track.album.images[0]?.url,
                        duration: state.duration / 1000
                    }))
                }

                dispatch(setPlaying(!state.paused))
                dispatch(setProgress(state.position / 1000))
                dispatch(setDuration(state.duration / 1000))
            })

            player.connect().then(success => {
                if (success) {
                    console.log('The Web Playback SDK successfully connected to Spotify!')
                }
            })

            playerRef.current = player
        }

        return () => {
            if (playerRef.current) {
                playerRef.current.disconnect()
            }
        }
    }, [token, dispatch])

    const play = async (spotifyUri) => {
        if (!deviceId || !token) return
        try {
            const res = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
                method: 'PUT',
                body: JSON.stringify({ uris: [spotifyUri] }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            if (!res.ok) {
                let errorMsg = 'Playback failed. A Premium account is required for the Web Playback SDK.'
                try {
                    const data = await res.json()
                    console.error('Play API Error:', data)
                    if (data?.error?.message) errorMsg = data.error.message
                } catch (e) {
                    console.error('Failed to parse error response')
                }
                setError(errorMsg)
            } else {
                setError(null) // clear previous errors if successful
            }
        } catch (err) {
            console.error('Play Fetch Error:', err)
            setError(err.message)
        }
    }

    const togglePlayPause = () => playerRef.current?.togglePlay()
    const nextTrack = () => playerRef.current?.nextTrack()
    const previousTrack = () => playerRef.current?.previousTrack()
    const seek = (milliseconds) => playerRef.current?.seek(milliseconds)
    const updateVolume = (vol) => {
        playerRef.current?.setVolume(vol / 100)
        dispatch(setVolume(vol))
    }

    return {
        player: playerRef.current,
        deviceId,
        isReady,
        error,
        play,
        togglePlayPause,
        nextTrack,
        previousTrack,
        seek,
        updateVolume
    }
}
