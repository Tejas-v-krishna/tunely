import { useSelector, useDispatch } from 'react-redux'
import {
    Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Repeat1,
    Volume2, VolumeX, Volume1, ListMusic, Heart, Maximize2
} from 'lucide-react'
import {
    toggleShuffle, cycleRepeat
} from '../../redux/slices/playerSlice'
import { useNavigate } from 'react-router-dom'
import { useSpotify } from '../../contexts/SpotifyPlayerContext'

function formatTime(seconds) {
    const m = Math.floor(seconds / 60)
    const s = Math.floor(seconds % 60)
    return `${m}:${s.toString().padStart(2, '0')}`
}

export default function PlayerBar() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { currentTrack, isPlaying, progress, duration, volume, shuffle, repeat } = useSelector(state => state.player)
    const { togglePlayPause, nextTrack, previousTrack, updateVolume } = useSpotify() || {}

    const VolumeIcon = volume === 0 ? VolumeX : volume < 50 ? Volume1 : Volume2
    const RepeatIcon = repeat === 'one' ? Repeat1 : Repeat

    // Show a subtle empty state if no track
    if (!currentTrack) {
        return (
            <div className="player-bar flex items-center justify-center">
                <p className="text-tunely-text-muted text-sm">No track playing — start exploring music!</p>
            </div>
        )
    }

    return (
        <div className="player-bar flex items-center px-4">
            {/* Left: Track Info */}
            <div className="flex items-center gap-3 w-[280px] min-w-[200px]">
                <div
                    className="w-14 h-14 rounded-lg bg-tunely-surface flex-shrink-0 overflow-hidden cursor-pointer hover-scale"
                    onClick={() => navigate('/now-playing')}
                >
                    {currentTrack.cover ? (
                        <img src={currentTrack.cover} alt={currentTrack.title} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-tunely-primary/30 to-tunely-accent/30 flex items-center justify-center">
                            <ListMusic className="w-6 h-6 text-tunely-text-dim" />
                        </div>
                    )}
                </div>
                <div className="min-w-0">
                    <p className="text-sm font-medium text-tunely-text truncate cursor-pointer hover:underline" onClick={() => navigate('/now-playing')}>
                        {currentTrack.title}
                    </p>
                    <p className="text-xs text-tunely-text-dim truncate">{currentTrack.artist}</p>
                </div>
                <button className="text-tunely-text-muted hover:text-tunely-pink transition-colors flex-shrink-0">
                    <Heart className="w-4 h-4" />
                </button>
            </div>

            {/* Center: Controls + Progress */}
            <div className="flex-1 flex flex-col items-center gap-1 max-w-[600px] mx-auto">
                {/* Controls */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => dispatch(toggleShuffle())}
                        className={`transition-colors ${shuffle ? 'text-tunely-accent' : 'text-tunely-text-muted hover:text-white'}`}
                    >
                        <Shuffle className="w-4 h-4" />
                    </button>
                    <button className="text-tunely-text-dim hover:text-white transition-colors" onClick={previousTrack}>
                        <SkipBack className="w-5 h-5" />
                    </button>
                    <button
                        onClick={togglePlayPause}
                        className="w-9 h-9 rounded-full bg-white flex items-center justify-center hover:scale-105 transition-transform"
                    >
                        {isPlaying ? (
                            <Pause className="w-4 h-4 text-tunely-darker" />
                        ) : (
                            <Play className="w-4 h-4 text-tunely-darker ml-0.5" />
                        )}
                    </button>
                    <button className="text-tunely-text-dim hover:text-white transition-colors" onClick={nextTrack}>
                        <SkipForward className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => dispatch(cycleRepeat())}
                        className={`transition-colors ${repeat !== 'off' ? 'text-tunely-accent' : 'text-tunely-text-muted hover:text-white'}`}
                    >
                        <RepeatIcon className="w-4 h-4" />
                    </button>
                </div>

                {/* Progress */}
                <div className="flex items-center gap-2 w-full">
                    <span className="text-[11px] text-tunely-text-muted w-10 text-right">{formatTime(progress)}</span>
                    <div className="progress-track flex-1">
                        <div className="progress-fill" style={{ width: `${duration ? (progress / duration) * 100 : 0}%` }} />
                    </div>
                    <span className="text-[11px] text-tunely-text-muted w-10">{formatTime(duration)}</span>
                </div>
            </div>

            {/* Right: Volume + Queue */}
            <div className="flex items-center gap-3 w-[200px] justify-end">
                <button className="text-tunely-text-muted hover:text-white transition-colors">
                    <ListMusic className="w-4 h-4" />
                </button>
                <button
                    onClick={() => updateVolume && updateVolume(volume === 0 ? 80 : 0)}
                    className="text-tunely-text-muted hover:text-white transition-colors"
                >
                    <VolumeIcon className="w-4 h-4" />
                </button>
                <input
                    type="range"
                    min={0}
                    max={100}
                    value={volume}
                    onChange={e => updateVolume && updateVolume(Number(e.target.value))}
                    className="w-24 h-1 appearance-none rounded-full bg-tunely-border cursor-pointer accent-tunely-primary"
                />
                <button
                    onClick={() => navigate('/now-playing')}
                    className="text-tunely-text-muted hover:text-white transition-colors"
                >
                    <Maximize2 className="w-4 h-4" />
                </button>
            </div>
        </div>
    )
}
