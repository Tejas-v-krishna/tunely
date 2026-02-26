import { useState } from 'react'
import { motion } from 'framer-motion'
import { Radio, Plus, Users, Link, MessageCircle, SmilePlus, Crown, Play, Pause, Music } from 'lucide-react'

const activeRooms = [
    { id: 'r1', name: 'Late Night Lo-Fi', host: 'DJ Chill', listeners: 42, nowPlaying: 'Ocean Breeze — Coastal Vibes', cover: 'https://picsum.photos/seed/room1/200/200', vibe: '🌙' },
    { id: 'r2', name: 'Workout Warriors', host: 'FitBeats', listeners: 87, nowPlaying: 'Electric Pulse — Synthwave Riders', cover: 'https://picsum.photos/seed/room2/200/200', vibe: '💪' },
    { id: 'r3', name: 'Coding Focus Zone', host: 'DevTunes', listeners: 156, nowPlaying: 'Binary Stars — Cosmic Drift', cover: 'https://picsum.photos/seed/room3/200/200', vibe: '🧠' },
    { id: 'r4', name: 'Friday Party Mix', host: 'PartyStarter', listeners: 234, nowPlaying: 'Velvet Thunder — Storm Echo', cover: 'https://picsum.photos/seed/room4/200/200', vibe: '🎉' },
    { id: 'r5', name: 'Jazz Café', host: 'SmoothNotes', listeners: 28, nowPlaying: 'Midnight Serenade — Jazz Ensemble', cover: 'https://picsum.photos/seed/room5/200/200', vibe: '🎷' },
    { id: 'r6', name: 'K-Pop Station', host: 'SeoulBeats', listeners: 312, nowPlaying: 'Starlight — NOVA', cover: 'https://picsum.photos/seed/room6/200/200', vibe: '✨' },
]

const chatMessages = [
    { user: 'Alex', message: 'This track is 🔥', time: '2m ago' },
    { user: 'Sara', message: 'Can we play some lo-fi next?', time: '1m ago' },
    { user: 'Mike', message: 'Vibes are immaculate tonight', time: '30s ago' },
]

export default function LiveRoomsPage() {
    const [showCreate, setShowCreate] = useState(false)
    const [selectedRoom, setSelectedRoom] = useState(null)

    return (
        <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <Radio className="w-6 h-6 text-tunely-pink" />
                        <h1 className="text-3xl font-bold text-white font-display">Live Rooms</h1>
                    </div>
                    <p className="text-tunely-text-dim">Listen together in real-time</p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowCreate(!showCreate)}
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-tunely-pink to-tunely-primary text-white font-semibold shadow-lg shadow-tunely-pink/30 hover:shadow-tunely-pink/50 transition-shadow"
                >
                    <Plus className="w-5 h-5" />
                    Create Room
                </motion.button>
            </div>

            {/* Create Room Panel */}
            {showCreate && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="glass rounded-2xl p-8 mb-8"
                >
                    <h3 className="text-xl font-bold text-white font-display mb-6">Create a New Room</h3>
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                        <div>
                            <label className="text-sm text-tunely-text-dim mb-2 block">Room Name</label>
                            <input
                                type="text"
                                placeholder="My Awesome Room"
                                className="w-full px-4 py-3 rounded-xl bg-tunely-surface border border-tunely-border/50 text-tunely-text placeholder:text-tunely-text-muted focus:outline-none focus:border-tunely-primary/50 transition-colors"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-tunely-text-dim mb-2 block">Vibe</label>
                            <div className="flex gap-2">
                                {['🌙', '🎉', '💪', '🧠', '🎷', '✨', '❤️', '🔥'].map(v => (
                                    <button key={v} className="w-10 h-10 rounded-lg bg-tunely-surface hover:bg-tunely-border/50 flex items-center justify-center text-xl transition-colors">
                                        {v}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-6 py-2.5 rounded-xl bg-tunely-primary text-white font-semibold hover:bg-tunely-primary-light transition-colors">
                            Create
                        </button>
                        <button onClick={() => setShowCreate(false)} className="px-6 py-2.5 rounded-xl bg-tunely-surface text-tunely-text-dim hover:text-white transition-colors">
                            Cancel
                        </button>
                    </div>
                </motion.div>
            )}

            {/* Active Rooms Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
                {activeRooms.map((room, i) => (
                    <motion.div
                        key={room.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.06 }}
                        onClick={() => setSelectedRoom(room)}
                        className={`glass rounded-2xl p-6 cursor-pointer hover-lift transition-all ${selectedRoom?.id === room.id ? 'border-tunely-primary/50 ring-1 ring-tunely-primary/30' : ''
                            }`}
                    >
                        <div className="flex items-start gap-4 mb-4">
                            <img src={room.cover} alt={room.name} className="w-16 h-16 rounded-xl object-cover" loading="lazy" />
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <h3 className="font-semibold text-white truncate">{room.name}</h3>
                                    <span className="text-xl">{room.vibe}</span>
                                </div>
                                <p className="text-xs text-tunely-text-dim mt-1">Hosted by {room.host}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                            <p className="text-sm text-tunely-text-dim truncate">🎵 {room.nowPlaying}</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5 text-tunely-text-muted">
                                <Users className="w-4 h-4" />
                                <span className="text-sm">{room.listeners} listening</span>
                            </div>
                            <button className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-tunely-primary/10 text-tunely-primary text-sm font-medium hover:bg-tunely-primary/20 transition-colors">
                                Join
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Room Detail / Chat Preview */}
            {selectedRoom && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass rounded-2xl p-6"
                >
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <img src={selectedRoom.cover} alt="" className="w-12 h-12 rounded-xl object-cover" />
                            <div>
                                <h3 className="font-bold text-white">{selectedRoom.name}</h3>
                                <p className="text-xs text-tunely-text-dim">{selectedRoom.listeners} people listening</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-tunely-surface text-tunely-text-dim text-sm hover:text-white transition-colors">
                                <Link className="w-4 h-4" />
                                Invite
                            </button>
                            <button className="px-6 py-2 rounded-lg bg-tunely-primary text-white font-semibold hover:bg-tunely-primary-light transition-colors">
                                Join Room
                            </button>
                        </div>
                    </div>

                    {/* Chat */}
                    <div className="border-t border-tunely-border/30 pt-4">
                        <div className="flex items-center gap-2 mb-4">
                            <MessageCircle className="w-4 h-4 text-tunely-text-muted" />
                            <span className="text-sm font-medium text-tunely-text-dim">Room Chat</span>
                        </div>
                        <div className="space-y-3 mb-4">
                            {chatMessages.map((msg, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <div className="w-7 h-7 rounded-full bg-tunely-primary/20 flex items-center justify-center text-xs font-bold text-tunely-primary flex-shrink-0">
                                        {msg.user[0]}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium text-tunely-text">{msg.user}</span>
                                            <span className="text-xs text-tunely-text-muted">{msg.time}</span>
                                        </div>
                                        <p className="text-sm text-tunely-text-dim">{msg.message}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Type a message..."
                                className="flex-1 px-4 py-2.5 rounded-xl bg-tunely-surface border border-tunely-border/50 text-sm text-tunely-text placeholder:text-tunely-text-muted focus:outline-none focus:border-tunely-primary/50 transition-colors"
                            />
                            <button className="px-4 py-2.5 rounded-xl bg-tunely-surface text-tunely-text-dim hover:text-white transition-colors">
                                <SmilePlus className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    )
}
