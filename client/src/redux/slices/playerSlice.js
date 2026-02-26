import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentTrack: null,
    isPlaying: false,
    progress: 0,
    duration: 0,
    volume: 80,
    shuffle: false,
    repeat: 'off', // 'off' | 'all' | 'one'
    queue: [],
    recentlyPlayed: [],
}

const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        setTrack: (state, action) => {
            state.currentTrack = action.payload
            state.isPlaying = true
            state.progress = 0
        },
        togglePlay: (state) => {
            state.isPlaying = !state.isPlaying
        },
        setPlaying: (state, action) => {
            state.isPlaying = action.payload
        },
        setProgress: (state, action) => {
            state.progress = action.payload
        },
        setDuration: (state, action) => {
            state.duration = action.payload
        },
        setVolume: (state, action) => {
            state.volume = action.payload
        },
        toggleShuffle: (state) => {
            state.shuffle = !state.shuffle
        },
        cycleRepeat: (state) => {
            const modes = ['off', 'all', 'one']
            const idx = modes.indexOf(state.repeat)
            state.repeat = modes[(idx + 1) % 3]
        },
        addToQueue: (state, action) => {
            state.queue.push(action.payload)
        },
        removeFromQueue: (state, action) => {
            state.queue.splice(action.payload, 1)
        },
        setQueue: (state, action) => {
            state.queue = action.payload
        },
        addToRecentlyPlayed: (state, action) => {
            state.recentlyPlayed = [
                action.payload,
                ...state.recentlyPlayed.filter(t => t.id !== action.payload.id)
            ].slice(0, 20)
        },
    },
})

export const {
    setTrack, togglePlay, setPlaying, setProgress, setDuration,
    setVolume, toggleShuffle, cycleRepeat, addToQueue, removeFromQueue,
    setQueue, addToRecentlyPlayed,
} = playerSlice.actions
export default playerSlice.reducer
