import { useDispatch } from 'react-redux'
import { setTrack, addToRecentlyPlayed } from '../redux/slices/playerSlice'
import { motion } from 'framer-motion'
import { Play, Heart, MoreHorizontal, Clock, TrendingUp, Brain, Sparkles, Headphones, Mic2 } from 'lucide-react'

/* ═══════════ DEMO DATA ═══════════ */
const demoTracks = [
    { id: '1', title: 'Midnight Dreams', artist: 'Luna Nova', album: 'Nocturne', duration: '3:42', cover: 'https://picsum.photos/seed/track1/300/300' },
    { id: '2', title: 'Electric Pulse', artist: 'Synthwave Riders', album: 'Neon Horizons', duration: '4:15', cover: 'https://picsum.photos/seed/track2/300/300' },
    { id: '3', title: 'Ocean Breeze', artist: 'Coastal Vibes', album: 'Tidal', duration: '3:58', cover: 'https://picsum.photos/seed/track3/300/300' },
    { id: '4', title: 'Golden Hour', artist: 'Sunset Trio', album: 'Amber Light', duration: '4:33', cover: 'https://picsum.photos/seed/track4/300/300' },
    { id: '5', title: 'Binary Stars', artist: 'Cosmic Drift', album: 'Galaxia', duration: '5:01', cover: 'https://picsum.photos/seed/track5/300/300' },
    { id: '6', title: 'Velvet Thunder', artist: 'Storm Echo', album: 'Tempest', duration: '3:27', cover: 'https://picsum.photos/seed/track6/300/300' },
]

const demoArtists = [
    { id: 'a1', name: 'Luna Nova', image: 'https://picsum.photos/seed/artist1/300/300', listeners: '2.4M' },
    { id: 'a2', name: 'Synthwave Riders', image: 'https://picsum.photos/seed/artist2/300/300', listeners: '1.8M' },
    { id: 'a3', name: 'Cosmic Drift', image: 'https://picsum.photos/seed/artist3/300/300', listeners: '3.1M' },
    { id: 'a4', name: 'Storm Echo', image: 'https://picsum.photos/seed/artist4/300/300', listeners: '980K' },
    { id: 'a5', name: 'Sunset Trio', image: 'https://picsum.photos/seed/artist5/300/300', listeners: '1.2M' },
    { id: 'a6', name: 'Coastal Vibes', image: 'https://picsum.photos/seed/artist6/300/300', listeners: '750K' },
]

const moodMixes = [
    { id: 'm1', title: 'Happy Vibes', gradient: 'from-yellow-500 to-orange-500', emoji: '😊' },
    { id: 'm2', title: 'Deep Focus', gradient: 'from-blue-600 to-indigo-700', emoji: '🧠' },
    { id: 'm3', title: 'Chill Evening', gradient: 'from-purple-600 to-pink-600', emoji: '🌙' },
    { id: 'm4', title: 'Workout Power', gradient: 'from-red-500 to-orange-600', emoji: '💪' },
    { id: 'm5', title: 'Sad & Rainy', gradient: 'from-slate-600 to-blue-800', emoji: '🌧️' },
    { id: 'm6', title: 'Party Mode', gradient: 'from-pink-500 to-violet-600', emoji: '🎉' },
]

/* ═══════════ MUSIC CARD COMPONENT ═══════════ */
function MusicCard({ track, index }) {
    const dispatch = useDispatch()

    const handlePlay = () => {
        dispatch(setTrack(track))
        dispatch(addToRecentlyPlayed(track))
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="music-card group cursor-pointer"
            onClick={handlePlay}
        >
            <div className="relative mb-4">
                <img
                    src={track.cover}
                    alt={track.title}
                    className="w-full aspect-square object-cover rounded-lg"
                    loading="lazy"
                />
                <div className="play-overlay">
                    <Play className="w-5 h-5 text-white ml-0.5" />
                </div>
            </div>
            <h4 className="text-sm font-semibold text-tunely-text truncate">{track.title}</h4>
            <p className="text-xs text-tunely-text-dim truncate mt-1">{track.artist}</p>

            {/* Actions */}
            <div className="flex items-center gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="text-tunely-text-muted hover:text-tunely-pink transition-colors" onClick={e => e.stopPropagation()}>
                    <Heart className="w-4 h-4" />
                </button>
                <button className="text-tunely-text-muted hover:text-white transition-colors ml-auto" onClick={e => e.stopPropagation()}>
                    <MoreHorizontal className="w-4 h-4" />
                </button>
            </div>
        </motion.div>
    )
}

/* ═══════════ ARTIST CARD ═══════════ */
function ArtistCard({ artist, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="text-center group cursor-pointer"
        >
            <div className="relative mb-3">
                <img
                    src={artist.image}
                    alt={artist.name}
                    className="w-full aspect-square object-cover rounded-full border-2 border-transparent group-hover:border-tunely-primary transition-colors"
                    loading="lazy"
                />
            </div>
            <h4 className="text-sm font-semibold text-tunely-text truncate">{artist.name}</h4>
            <p className="text-xs text-tunely-text-dim">{artist.listeners} listeners</p>
        </motion.div>
    )
}

/* ═══════════ MOOD CARD ═══════════ */
function MoodCard({ mood, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className={`relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br ${mood.gradient} cursor-pointer hover-lift group h-40 flex flex-col justify-end`}
        >
            <span className="text-4xl absolute top-4 right-4 group-hover:scale-125 transition-transform">{mood.emoji}</span>
            <h4 className="text-white font-bold text-lg">{mood.title}</h4>
            <p className="text-white/70 text-xs mt-1">AI Generated Mix</p>
        </motion.div>
    )
}

/* ═══════════ SECTION HEADER ═══════════ */
function SectionHeader({ icon: Icon, title, accent }) {
    return (
        <div className="flex items-center gap-3 mb-5">
            <Icon className={`w-5 h-5 ${accent || 'text-tunely-primary'}`} />
            <h2 className="text-xl font-bold text-white font-display">{title}</h2>
            <button className="ml-auto text-xs text-tunely-text-muted hover:text-white transition-colors font-medium">
                Show all
            </button>
        </div>
    )
}

/* ═══════════ HOME PAGE ═══════════ */
export default function HomePage() {
    return (
        <div className="space-y-10 animate-fade-in">
            {/* Greeting */}
            <div>
                <h1 className="text-3xl font-bold text-white font-display">Good Evening</h1>
                <p className="text-tunely-text-dim mt-1">Welcome back. Here's what's playing around the world.</p>
            </div>

            {/* Recently Played */}
            <section>
                <SectionHeader icon={Clock} title="Recently Played" />
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                    {demoTracks.map((track, i) => (
                        <MusicCard key={track.id} track={track} index={i} />
                    ))}
                </div>
            </section>

            {/* Based On Your Mood */}
            <section>
                <SectionHeader icon={Sparkles} title="Based On Your Mood" accent="text-tunely-pink" />
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {moodMixes.map((mood, i) => (
                        <MoodCard key={mood.id} mood={mood} index={i} />
                    ))}
                </div>
            </section>

            {/* Trending Now */}
            <section>
                <SectionHeader icon={TrendingUp} title="Trending Now" accent="text-tunely-accent" />
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                    {[...demoTracks].reverse().map((track, i) => (
                        <MusicCard key={`trending-${track.id}`} track={track} index={i} />
                    ))}
                </div>
            </section>

            {/* AI Recommended */}
            <section>
                <SectionHeader icon={Brain} title="AI Recommended For You" accent="text-tunely-cyan" />
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                    {demoTracks.map((track, i) => (
                        <MusicCard key={`ai-${track.id}`} track={track} index={i} />
                    ))}
                </div>
            </section>

            {/* Focus Mode Mix */}
            <section>
                <SectionHeader icon={Headphones} title="Focus Mode Mix" />
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                    {demoTracks.slice(0, 4).map((track, i) => (
                        <MusicCard key={`focus-${track.id}`} track={track} index={i} />
                    ))}
                </div>
            </section>

            {/* Top Artists This Week */}
            <section>
                <SectionHeader icon={Mic2} title="Top Artists This Week" accent="text-tunely-accent" />
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {demoArtists.map((artist, i) => (
                        <ArtistCard key={artist.id} artist={artist} index={i} />
                    ))}
                </div>
            </section>
        </div>
    )
}
