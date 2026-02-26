import { useState } from 'react'
import { motion } from 'framer-motion'
import { BarChart3, Clock, Music, Brain, Calendar, Download, Share2, TrendingUp } from 'lucide-react'

/* ═══ MOCK ANALYTICS DATA ═══ */
const weeklyData = [
    { day: 'Mon', hours: 2.5 }, { day: 'Tue', hours: 3.2 }, { day: 'Wed', hours: 1.8 },
    { day: 'Thu', hours: 4.1 }, { day: 'Fri', hours: 3.7 }, { day: 'Sat', hours: 5.2 },
    { day: 'Sun', hours: 4.6 },
]

const topGenres = [
    { name: 'Electronic', pct: 35, color: '#8b5cf6' },
    { name: 'Lo-Fi', pct: 22, color: '#06ffa5' },
    { name: 'Pop', pct: 18, color: '#ec4899' },
    { name: 'Jazz', pct: 12, color: '#22d3ee' },
    { name: 'Rock', pct: 8, color: '#f59e0b' },
    { name: 'Other', pct: 5, color: '#64748b' },
]

const topArtists = [
    { name: 'Luna Nova', hours: 24, image: 'https://picsum.photos/seed/artist1/60/60' },
    { name: 'Synthwave Riders', hours: 18, image: 'https://picsum.photos/seed/artist2/60/60' },
    { name: 'Cosmic Drift', hours: 15, image: 'https://picsum.photos/seed/artist3/60/60' },
    { name: 'Storm Echo', hours: 12, image: 'https://picsum.photos/seed/artist4/60/60' },
    { name: 'Sunset Trio', hours: 9, image: 'https://picsum.photos/seed/artist5/60/60' },
]

const moodData = [
    { hour: '6AM', happy: 20, focused: 10, chill: 30, energetic: 5 },
    { hour: '9AM', happy: 40, focused: 60, chill: 15, energetic: 20 },
    { hour: '12PM', happy: 50, focused: 30, chill: 25, energetic: 45 },
    { hour: '3PM', happy: 35, focused: 55, chill: 20, energetic: 30 },
    { hour: '6PM', happy: 60, focused: 15, chill: 40, energetic: 50 },
    { hour: '9PM', happy: 45, focused: 10, chill: 70, energetic: 20 },
    { hour: '12AM', happy: 15, focused: 5, chill: 80, energetic: 5 },
]

/* ═══ STAT CARD ═══ */
function StatCard({ icon: Icon, label, value, trend, color }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl p-6 flex flex-col"
        >
            <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center`} style={{ background: `${color}20` }}>
                    <Icon className="w-5 h-5" style={{ color }} />
                </div>
                {trend && (
                    <span className="flex items-center gap-1 text-xs font-semibold text-tunely-accent">
                        <TrendingUp className="w-3 h-3" /> {trend}
                    </span>
                )}
            </div>
            <p className="text-2xl font-bold text-white font-display">{value}</p>
            <p className="text-sm text-tunely-text-dim mt-1">{label}</p>
        </motion.div>
    )
}

export default function AnalyticsPage() {
    const [period, setPeriod] = useState('week')
    const maxHours = Math.max(...weeklyData.map(d => d.hours))

    return (
        <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <BarChart3 className="w-6 h-6 text-tunely-primary" />
                        <h1 className="text-3xl font-bold text-white font-display">Tunely Analytics</h1>
                    </div>
                    <p className="text-tunely-text-dim">Your music DNA, visualized.</p>
                </div>
                <div className="flex items-center gap-2">
                    {['week', 'month', 'year'].map(p => (
                        <button
                            key={p}
                            onClick={() => setPeriod(p)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${period === p ? 'bg-tunely-primary text-white' : 'bg-tunely-surface text-tunely-text-dim hover:text-white'
                                }`}
                        >
                            {p}
                        </button>
                    ))}
                    <button className="flex items-center gap-2 px-4 py-2 ml-2 rounded-lg bg-tunely-surface text-tunely-text-dim text-sm hover:text-white transition-colors">
                        <Download className="w-4 h-4" />
                        Export
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-tunely-surface text-tunely-text-dim text-sm hover:text-white transition-colors">
                        <Share2 className="w-4 h-4" />
                        Share
                    </button>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <StatCard icon={Clock} label="Listening Time" value="25.1h" trend="+12%" color="#8b5cf6" />
                <StatCard icon={Music} label="Songs Played" value="482" trend="+8%" color="#06ffa5" />
                <StatCard icon={Brain} label="Unique Artists" value="67" color="#ec4899" />
                <StatCard icon={Calendar} label="Streak" value="14 days" trend="🔥" color="#f59e0b" />
            </div>

            <div className="grid lg:grid-cols-2 gap-6 mb-8">
                {/* Listening Time Graph */}
                <div className="glass rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-white font-display mb-6">Listening Time</h3>
                    <div className="flex items-end justify-between gap-2 h-48">
                        {weeklyData.map((d, i) => (
                            <div key={d.day} className="flex flex-col items-center gap-2 flex-1">
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: `${(d.hours / maxHours) * 100}%` }}
                                    transition={{ delay: i * 0.1, duration: 0.5 }}
                                    className="w-full max-w-[48px] rounded-lg bg-gradient-to-t from-tunely-primary to-tunely-primary-light relative group cursor-pointer"
                                >
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 glass px-2 py-1 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                        {d.hours}h
                                    </div>
                                </motion.div>
                                <span className="text-xs text-tunely-text-muted">{d.day}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Genre Distribution */}
                <div className="glass rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-white font-display mb-6">Top Genres</h3>
                    <div className="space-y-4">
                        {topGenres.map((g, i) => (
                            <motion.div
                                key={g.name}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.08 }}
                                className="flex items-center gap-3"
                            >
                                <span className="text-sm text-tunely-text-dim w-24">{g.name}</span>
                                <div className="flex-1 h-3 rounded-full bg-tunely-surface overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${g.pct}%` }}
                                        transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                                        className="h-full rounded-full"
                                        style={{ background: g.color }}
                                    />
                                </div>
                                <span className="text-sm font-semibold text-white w-10 text-right">{g.pct}%</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                {/* Top Artists */}
                <div className="glass rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-white font-display mb-6">Top Artists</h3>
                    <div className="space-y-3">
                        {topArtists.map((a, i) => (
                            <motion.div
                                key={a.name}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: i * 0.08 }}
                                className="flex items-center gap-4 p-2 rounded-xl hover:bg-tunely-surface/50 transition-colors cursor-pointer"
                            >
                                <span className="text-lg font-bold text-tunely-text-muted w-6">{i + 1}</span>
                                <img src={a.image} alt={a.name} className="w-10 h-10 rounded-full object-cover" loading="lazy" />
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-tunely-text">{a.name}</p>
                                </div>
                                <span className="text-sm text-tunely-text-dim">{a.hours}h</span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Mood Heatmap */}
                <div className="glass rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-white font-display mb-6">Mood Heatmap</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th className="text-left text-xs text-tunely-text-muted pb-3 font-medium">Time</th>
                                    <th className="text-center text-xs text-tunely-text-muted pb-3 font-medium">😊 Happy</th>
                                    <th className="text-center text-xs text-tunely-text-muted pb-3 font-medium">🧠 Focused</th>
                                    <th className="text-center text-xs text-tunely-text-muted pb-3 font-medium">😌 Chill</th>
                                    <th className="text-center text-xs text-tunely-text-muted pb-3 font-medium">⚡ Energy</th>
                                </tr>
                            </thead>
                            <tbody>
                                {moodData.map((row, i) => (
                                    <tr key={row.hour}>
                                        <td className="text-sm text-tunely-text-dim py-1.5">{row.hour}</td>
                                        {[row.happy, row.focused, row.chill, row.energetic].map((val, j) => (
                                            <td key={j} className="text-center py-1.5">
                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: 0.3 + i * 0.05 + j * 0.03 }}
                                                    className="w-10 h-10 rounded-lg mx-auto flex items-center justify-center text-xs font-semibold"
                                                    style={{
                                                        background: `rgba(${j === 0 ? '249,115,22' : j === 1 ? '139,92,246' : j === 2 ? '6,255,165' : '236,72,153'}, ${val / 100})`,
                                                        color: val > 40 ? 'white' : 'rgba(255,255,255,0.5)',
                                                    }}
                                                >
                                                    {val}
                                                </motion.div>
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
