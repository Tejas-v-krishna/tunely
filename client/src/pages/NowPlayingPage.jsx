import { useSelector, useDispatch } from 'react-redux'
import { toggleShuffle, cycleRepeat } from '../redux/slices/playerSlice'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useSpotify } from '../contexts/SpotifyPlayerContext'
import {
    Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Repeat1,
    Volume2, VolumeX, Volume1, ListMusic, Heart, Share2, PlusCircle,
    Minimize2, ChevronDown, Music, Waves, Sliders
} from 'lucide-react'

export default function NowPlayingPage() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { currentTrack, isPlaying, progress, duration, volume, shuffle, repeat } = useSelector(state => state.player)
    const { togglePlayPause, nextTrack, previousTrack, updateVolume } = useSpotify() || {}

    const VolumeIcon = volume === 0 ? VolumeX : volume < 50 ? Volume1 : Volume2
    const RepeatIcon = repeat === 'one' ? Repeat1 : Repeat

    const formatTime = (s) => `${Math.floor(s / 60)}:${Math.floor(s % 60).toString().padStart(2, '0')}`

    return (
        <div className="fixed inset-0 z-50 bg-tunely-dark flex flex-col">
            {/* Background gradient */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-tunely-primary/20 via-tunely-dark to-tunely-darker" />
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-tunely-primary/10 rounded-full blur-[200px]" />
            </div>

            {/* Top Bar */}
            <div className="relative z-10 flex items-center justify-between px-6 py-4">
                <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-tunely-text-dim hover:text-white transition-colors">
                    <ChevronDown className="w-6 h-6" />
                </button>
                <p className="text-xs uppercase tracking-widest text-tunely-text-muted font-semibold">Playing from Playlist</p>
                <button className="text-tunely-text-dim hover:text-white transition-colors">
                    <Sliders className="w-5 h-5" />
                </button>
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 max-w-lg mx-auto w-full">
                {/* Album Art */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 100 }}
                    className="w-72 h-72 md:w-80 md:h-80 rounded-2xl overflow-hidden shadow-2xl shadow-black/60 mb-10"
                >
                    {currentTrack?.cover ? (
                        <img src={currentTrack.cover} alt={currentTrack.title} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-tunely-primary/30 to-tunely-accent/30 flex items-center justify-center">
                            <Music className="w-20 h-20 text-tunely-text-dim" />
                        </div>
                    )}
                </motion.div>

                {/* Song Info */}
                <div className="text-center w-full mb-8">
                    <div className="flex items-center justify-between">
                        <div className="text-left flex-1 min-w-0">
                            <h2 className="text-2xl font-bold text-white font-display truncate">
                                {currentTrack?.title || 'No track selected'}
                            </h2>
                            <p className="text-tunely-text-dim mt-1">{currentTrack?.artist || 'Select a song to play'}</p>
                        </div>
                        <button className="text-tunely-text-muted hover:text-tunely-pink transition-colors flex-shrink-0 ml-4">
                            <Heart className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full mb-6">
                    <div className="progress-track w-full">
                        <div className="progress-fill" style={{ width: `${duration ? (progress / duration) * 100 : 0}%` }} />
                    </div>
                    <div className="flex justify-between mt-2">
                        <span className="text-xs text-tunely-text-muted">{formatTime(progress)}</span>
                        <span className="text-xs text-tunely-text-muted">{formatTime(duration)}</span>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-8 mb-8">
                    <button
                        onClick={() => dispatch(toggleShuffle())}
                        className={`transition-colors ${shuffle ? 'text-tunely-accent' : 'text-tunely-text-dim hover:text-white'}`}
                    >
                        <Shuffle className="w-5 h-5" />
                    </button>
                    <button className="text-tunely-text hover:text-white transition-colors" onClick={previousTrack}>
                        <SkipBack className="w-7 h-7" />
                    </button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={togglePlayPause}
                        className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-xl"
                    >
                        {isPlaying ? (
                            <Pause className="w-7 h-7 text-tunely-darker" />
                        ) : (
                            <Play className="w-7 h-7 text-tunely-darker ml-1" />
                        )}
                    </motion.button>
                    <button className="text-tunely-text hover:text-white transition-colors" onClick={nextTrack}>
                        <SkipForward className="w-7 h-7" />
                    </button>
                    <button
                        onClick={() => dispatch(cycleRepeat())}
                        className={`transition-colors ${repeat !== 'off' ? 'text-tunely-accent' : 'text-tunely-text-dim hover:text-white'}`}
                    >
                        <RepeatIcon className="w-5 h-5" />
                    </button>
                </div>

                {/* Bottom Actions */}
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-4">
                        <button className="text-tunely-text-muted hover:text-white transition-colors">
                            <Waves className="w-5 h-5" />
                        </button>
                        <button className="text-tunely-text-muted hover:text-white transition-colors">
                            <PlusCircle className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="flex items-center gap-3">
                        <button onClick={() => updateVolume && updateVolume(volume === 0 ? 80 : 0)} className="text-tunely-text-muted hover:text-white transition-colors">
                            <VolumeIcon className="w-5 h-5" />
                        </button>
                        <input
                            type="range" min={0} max={100} value={volume}
                            onChange={e => updateVolume && updateVolume(Number(e.target.value))}
                            className="w-24 h-1 appearance-none rounded-full bg-tunely-border cursor-pointer accent-tunely-primary"
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="text-tunely-text-muted hover:text-white transition-colors">
                            <Share2 className="w-5 h-5" />
                        </button>
                        <button className="text-tunely-text-muted hover:text-white transition-colors">
                            <ListMusic className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
