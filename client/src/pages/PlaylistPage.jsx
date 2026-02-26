import { useDispatch } from 'react-redux'
import { setTrack, addToRecentlyPlayed } from '../redux/slices/playerSlice'
import { motion } from 'framer-motion'
import { Play, Shuffle, Clock, Heart, MoreHorizontal, Download, UserPlus, Share2 } from 'lucide-react'

const playlistData = {
    title: 'Midnight Chill',
    owner: 'Tejas',
    description: 'Late night vibes, smooth beats, and dreamy melodies',
    cover: 'https://picsum.photos/seed/pl1/400/400',
    followers: '1,247',
    totalDuration: '2h 34min',
    tracks: [
        { id: '1', title: 'Midnight Dreams', artist: 'Luna Nova', album: 'Nocturne', dateAdded: 'Feb 20, 2026', duration: '3:42', cover: 'https://picsum.photos/seed/track1/60/60' },
        { id: '2', title: 'Electric Pulse', artist: 'Synthwave Riders', album: 'Neon Horizons', dateAdded: 'Feb 18, 2026', duration: '4:15', cover: 'https://picsum.photos/seed/track2/60/60' },
        { id: '3', title: 'Ocean Breeze', artist: 'Coastal Vibes', album: 'Tidal', dateAdded: 'Feb 15, 2026', duration: '3:58', cover: 'https://picsum.photos/seed/track3/60/60' },
        { id: '4', title: 'Golden Hour', artist: 'Sunset Trio', album: 'Amber Light', dateAdded: 'Feb 12, 2026', duration: '4:33', cover: 'https://picsum.photos/seed/track4/60/60' },
        { id: '5', title: 'Binary Stars', artist: 'Cosmic Drift', album: 'Galaxia', dateAdded: 'Feb 10, 2026', duration: '5:01', cover: 'https://picsum.photos/seed/track5/60/60' },
        { id: '6', title: 'Velvet Thunder', artist: 'Storm Echo', album: 'Tempest', dateAdded: 'Feb 8, 2026', duration: '3:27', cover: 'https://picsum.photos/seed/track6/60/60' },
        { id: '7', title: 'Neon Lights', artist: 'Cityscape', album: 'Urban Dawn', dateAdded: 'Feb 5, 2026', duration: '4:12', cover: 'https://picsum.photos/seed/track7/60/60' },
        { id: '8', title: 'Crystal Cave', artist: 'Echo Chamber', album: 'Resonance', dateAdded: 'Feb 3, 2026', duration: '3:55', cover: 'https://picsum.photos/seed/track8/60/60' },
    ],
}

export default function PlaylistPage() {
    const dispatch = useDispatch()

    const handlePlay = (track) => {
        dispatch(setTrack(track))
        dispatch(addToRecentlyPlayed(track))
    }

    return (
        <div className="animate-fade-in">
            {/* Header */}
            <div className="flex flex-col md:flex-row gap-8 mb-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-60 h-60 rounded-2xl overflow-hidden shadow-2xl shadow-black/50 flex-shrink-0"
                >
                    <img src={playlistData.cover} alt={playlistData.title} className="w-full h-full object-cover" />
                </motion.div>
                <div className="flex flex-col justify-end">
                    <p className="text-xs font-semibold text-tunely-text-dim uppercase tracking-widest mb-2">Playlist</p>
                    <h1 className="text-5xl md:text-6xl font-black text-white font-display mb-3">{playlistData.title}</h1>
                    <p className="text-tunely-text-dim text-sm mb-4">{playlistData.description}</p>
                    <div className="flex items-center gap-2 text-sm text-tunely-text-dim">
                        <span className="font-semibold text-white">{playlistData.owner}</span>
                        <span>·</span>
                        <span>{playlistData.followers} followers</span>
                        <span>·</span>
                        <span>{playlistData.tracks.length} songs, {playlistData.totalDuration}</span>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 mb-8">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-14 h-14 rounded-full bg-tunely-primary flex items-center justify-center shadow-lg shadow-tunely-primary/30 hover:bg-tunely-primary-light transition-colors"
                >
                    <Play className="w-6 h-6 text-white ml-0.5" />
                </motion.button>
                <button className="w-12 h-12 rounded-full bg-tunely-surface flex items-center justify-center text-tunely-text-dim hover:text-white transition-colors">
                    <Shuffle className="w-5 h-5" />
                </button>
                <button className="text-tunely-text-muted hover:text-tunely-pink transition-colors">
                    <Heart className="w-6 h-6" />
                </button>
                <button className="text-tunely-text-muted hover:text-white transition-colors">
                    <Download className="w-5 h-5" />
                </button>
                <button className="text-tunely-text-muted hover:text-white transition-colors">
                    <UserPlus className="w-5 h-5" />
                </button>
                <button className="text-tunely-text-muted hover:text-white transition-colors">
                    <Share2 className="w-5 h-5" />
                </button>
                <button className="text-tunely-text-muted hover:text-white transition-colors">
                    <MoreHorizontal className="w-5 h-5" />
                </button>
            </div>

            {/* Track List */}
            <div>
                {/* Header Row */}
                <div className="grid grid-cols-[16px_4fr_3fr_2fr_minmax(60px,1fr)] gap-4 px-4 py-2 text-xs font-medium text-tunely-text-muted uppercase tracking-wider border-b border-tunely-border/30 mb-2">
                    <span>#</span>
                    <span>Title</span>
                    <span>Album</span>
                    <span>Date Added</span>
                    <span className="text-right"><Clock className="w-4 h-4 inline" /></span>
                </div>

                {/* Tracks */}
                {playlistData.tracks.map((track, i) => (
                    <motion.div
                        key={track.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.03 }}
                        onClick={() => handlePlay(track)}
                        className="grid grid-cols-[16px_4fr_3fr_2fr_minmax(60px,1fr)] gap-4 px-4 py-2.5 rounded-lg hover:bg-tunely-surface/50 transition-colors cursor-pointer group items-center"
                    >
                        <span className="text-sm text-tunely-text-muted group-hover:hidden">{i + 1}</span>
                        <span className="hidden group-hover:block">
                            <Play className="w-4 h-4 text-white" />
                        </span>
                        <div className="flex items-center gap-3 min-w-0">
                            <img src={track.cover} alt={track.title} className="w-10 h-10 rounded object-cover flex-shrink-0" loading="lazy" />
                            <div className="min-w-0">
                                <p className="text-sm font-medium text-tunely-text truncate">{track.title}</p>
                                <p className="text-xs text-tunely-text-dim truncate">{track.artist}</p>
                            </div>
                        </div>
                        <span className="text-sm text-tunely-text-dim truncate">{track.album}</span>
                        <span className="text-sm text-tunely-text-dim">{track.dateAdded}</span>
                        <div className="flex items-center justify-end gap-3">
                            <button className="text-tunely-text-muted hover:text-tunely-pink opacity-0 group-hover:opacity-100 transition-all" onClick={e => e.stopPropagation()}>
                                <Heart className="w-4 h-4" />
                            </button>
                            <span className="text-sm text-tunely-text-dim">{track.duration}</span>
                            <button className="text-tunely-text-muted hover:text-white opacity-0 group-hover:opacity-100 transition-all" onClick={e => e.stopPropagation()}>
                                <MoreHorizontal className="w-4 h-4" />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
