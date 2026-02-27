import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setSearchQuery } from '../redux/slices/uiSlice'
import { motion } from 'framer-motion'
import { Search, Music, Disc3, User, ListMusic, Podcast, X, Play } from 'lucide-react'
import axios from 'axios'
import { useSpotify } from '../contexts/SpotifyPlayerContext'
import { setTrack, addToRecentlyPlayed } from '../redux/slices/playerSlice'

const categories = [
    { id: 'all', label: 'All', icon: Search },
    { id: 'tracks', label: 'Tracks', icon: Music },
    { id: 'artists', label: 'Artists', icon: User },
    { id: 'albums', label: 'Albums', icon: Disc3 },
    { id: 'playlists', label: 'Playlists', icon: ListMusic },
    { id: 'podcasts', label: 'Podcasts', icon: Podcast },
]

const browseCategories = [
    { title: 'Pop', gradient: 'from-pink-500 to-rose-600', cover: 'https://picsum.photos/seed/pop/200/200' },
    { title: 'Hip Hop', gradient: 'from-orange-500 to-red-600', cover: 'https://picsum.photos/seed/hiphop/200/200' },
    { title: 'Rock', gradient: 'from-red-600 to-red-800', cover: 'https://picsum.photos/seed/rock/200/200' },
    { title: 'Electronic', gradient: 'from-cyan-500 to-blue-600', cover: 'https://picsum.photos/seed/electronic/200/200' },
    { title: 'Jazz', gradient: 'from-amber-600 to-yellow-700', cover: 'https://picsum.photos/seed/jazz/200/200' },
    { title: 'Classical', gradient: 'from-violet-500 to-purple-700', cover: 'https://picsum.photos/seed/classical/200/200' },
    { title: 'R&B', gradient: 'from-indigo-500 to-purple-600', cover: 'https://picsum.photos/seed/rnb/200/200' },
    { title: 'Country', gradient: 'from-emerald-500 to-green-700', cover: 'https://picsum.photos/seed/country/200/200' },
    { title: 'Lo-Fi', gradient: 'from-slate-500 to-slate-700', cover: 'https://picsum.photos/seed/lofi/200/200' },
    { title: 'Indie', gradient: 'from-teal-500 to-cyan-700', cover: 'https://picsum.photos/seed/indie/200/200' },
    { title: 'K-Pop', gradient: 'from-pink-400 to-violet-500', cover: 'https://picsum.photos/seed/kpop/200/200' },
    { title: 'Ambient', gradient: 'from-blue-800 to-indigo-900', cover: 'https://picsum.photos/seed/ambient/200/200' },
]

export default function SearchPage() {
    const dispatch = useDispatch()
    const { searchQuery } = useSelector(state => state.ui)
    const { token, user } = useSelector(state => state.auth)
    const { play, deviceId, error: playerError, isReady } = useSpotify() || {}
    const [activeFilter, setActiveFilter] = useState('all')
    const [searchResults, setSearchResults] = useState(null)
    const [loading, setLoading] = useState(false)
    const [searchError, setSearchError] = useState(null)

    useEffect(() => {
        if (!searchQuery || !token || !user?.accessToken) {
            setSearchResults(null)
            return
        }

        const delayDebounceFn = setTimeout(async () => {
            setLoading(true)
            setSearchError(null)
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/spotify/search?q=${encodeURIComponent(searchQuery)}&type=track,artist,album&limit=10`, {
                    headers: { Authorization: `Bearer ${user.accessToken}` }
                })
                setSearchResults(res.data)
            } catch (err) {
                console.error("Search error:", err)
                setSearchError(err.response?.data?.error || err.message)
            } finally {
                setLoading(false)
            }
        }, 500)

        return () => clearTimeout(delayDebounceFn)
    }, [searchQuery, token])

    const handlePlayTrack = (track) => {
        if (!isReady) {
            if (!playerError) {
                setSearchError("Player is initializing...")
            }
            return
        }
        if (play && track) {
            play(track.uri, { name: track.name, artist: track.artists[0]?.name })
            dispatch(setTrack({
                id: track.id,
                title: track.name,
                artist: track.artists.map(a => a.name).join(', '),
                cover: track.album.images[0]?.url,
                duration: track.duration_ms / 1000
            }))
            dispatch(addToRecentlyPlayed({
                id: track.id,
                title: track.name,
                artist: track.artists.map(a => a.name).join(', '),
                cover: track.album.images[0]?.url,
                duration: track.duration_ms / 1000
            }))
        }
    }

    return (
        <div className="animate-fade-in">
            {/* Search Input (larger on this page) */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white font-display mb-6">Search</h1>
                <div className="relative max-w-2xl">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-tunely-text-muted" />
                    <input
                        type="text"
                        placeholder="What do you want to listen to?"
                        value={searchQuery}
                        onChange={e => dispatch(setSearchQuery(e.target.value))}
                        className="w-full pl-12 pr-12 py-4 rounded-2xl bg-tunely-surface border border-tunely-border/50 text-tunely-text text-base placeholder:text-tunely-text-muted focus:outline-none focus:border-tunely-primary/50 focus:ring-2 focus:ring-tunely-primary/20 transition-all"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => dispatch(setSearchQuery(''))}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-tunely-text-muted hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    )}
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
                {categories.map(cat => (
                    <button
                        key={cat.id}
                        onClick={() => setActiveFilter(cat.id)}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${activeFilter === cat.id
                            ? 'bg-tunely-primary text-white'
                            : 'bg-tunely-surface text-tunely-text-dim hover:bg-tunely-border/30 hover:text-white'
                            }`}
                    >
                        <cat.icon className="w-4 h-4" />
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* Browse Categories */}
            {!searchQuery && (
                <div>
                    <h2 className="text-xl font-bold text-white font-display mb-5">Browse All</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                        {browseCategories.map((cat, i) => (
                            <motion.div
                                key={cat.title}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.04 }}
                                className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${cat.gradient} cursor-pointer hover-lift h-44 p-4`}
                            >
                                <h3 className="text-white font-bold text-lg">{cat.title}</h3>
                                <img
                                    src={cat.cover}
                                    alt={cat.title}
                                    className="absolute bottom-2 right-2 w-20 h-20 rounded-lg object-cover rotate-[25deg] shadow-xl opacity-80"
                                    loading="lazy"
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}

            {/* Search Results */}
            {searchQuery && (
                <div className="mt-8 relative min-h-[400px]">
                    {/* Status Banners */}
                    {(searchError || playerError || !token) && (
                        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                            <p className="font-semibold mb-1">Could not complete action</p>
                            <p>{!token ? "Missing authentication token. Please Login with Spotify." : (playerError || searchError)}</p>
                        </div>
                    )}

                    {!isReady && token && !searchError && !playerError && (
                        <div className="mb-6 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-sm">
                            <p>Audio Engine is connecting...</p>
                        </div>
                    )}

                    {loading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-tunely-dark/50 z-10 backdrop-blur-sm rounded-xl py-10">
                            <div className="flex gap-1.5">
                                {[0, 1, 2].map(i => (
                                    <motion.div
                                        key={i}
                                        className="w-3 h-3 rounded-full bg-tunely-primary"
                                        animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
                                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {!loading && searchResults?.tracks?.items?.length > 0 && (
                        <div>
                            <h2 className="text-xl font-bold text-white font-display mb-5">Top Results</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                                {searchResults.tracks.items.map((track, i) => (
                                    <motion.div
                                        key={track.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="music-card group cursor-pointer"
                                        onClick={() => handlePlayTrack(track)}
                                    >
                                        <div className="relative mb-4">
                                            <img
                                                src={track.album?.images[0]?.url || 'https://via.placeholder.com/300'}
                                                alt={track.name}
                                                className="w-full aspect-square object-cover rounded-lg"
                                                loading="lazy"
                                            />
                                            <div className="play-overlay">
                                                <Play className="w-5 h-5 text-white ml-0.5" />
                                            </div>
                                        </div>
                                        <h4 className="text-sm font-semibold text-tunely-text truncate">{track.name}</h4>
                                        <p className="text-xs text-tunely-text-dim truncate mt-1">
                                            {track.artists?.map(a => a.name).join(', ')}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}

                    {!loading && searchResults?.tracks?.items?.length === 0 && (
                        <div className="text-center py-20">
                            <Search className="w-12 h-12 text-tunely-text-muted mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-tunely-text mb-2">No results found for "{searchQuery}"</h3>
                            <p className="text-tunely-text-dim text-sm">Please make sure your words are spelled correctly or use less or different keywords.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
