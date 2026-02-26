import { useState } from 'react'
import { motion } from 'framer-motion'
import { Grid3X3, List, SortAsc, Play, Heart, MoreHorizontal, Music, Disc3, User, Podcast, Download } from 'lucide-react'

const tabs = [
    { id: 'playlists', label: 'Playlists', icon: Music },
    { id: 'albums', label: 'Albums', icon: Disc3 },
    { id: 'artists', label: 'Artists', icon: User },
    { id: 'podcasts', label: 'Podcasts', icon: Podcast },
    { id: 'downloads', label: 'Downloads', icon: Download },
]

const demoPlaylists = [
    { id: 'p1', title: 'Midnight Chill', tracks: 42, cover: 'https://picsum.photos/seed/pl1/300/300', creator: 'You' },
    { id: 'p2', title: 'Workout Beast', tracks: 65, cover: 'https://picsum.photos/seed/pl2/300/300', creator: 'You' },
    { id: 'p3', title: 'Study Sessions', tracks: 38, cover: 'https://picsum.photos/seed/pl3/300/300', creator: 'You' },
    { id: 'p4', title: 'Summer Road Trip', tracks: 54, cover: 'https://picsum.photos/seed/pl4/300/300', creator: 'You' },
    { id: 'p5', title: 'Lo-Fi Dreams', tracks: 29, cover: 'https://picsum.photos/seed/pl5/300/300', creator: 'AI Generated' },
    { id: 'p6', title: 'Coding Flow', tracks: 80, cover: 'https://picsum.photos/seed/pl6/300/300', creator: 'Tunely AI' },
    { id: 'p7', title: 'Late Night Jazz', tracks: 33, cover: 'https://picsum.photos/seed/pl7/300/300', creator: 'You' },
    { id: 'p8', title: 'Morning Energy', tracks: 45, cover: 'https://picsum.photos/seed/pl8/300/300', creator: 'You' },
]

const sortOptions = ['Recently Added', 'Alphabetical', 'Custom']

export default function LibraryPage() {
    const [activeTab, setActiveTab] = useState('playlists')
    const [viewMode, setViewMode] = useState('grid') // 'grid' | 'list'
    const [sortBy, setSortBy] = useState('Recently Added')
    const [showSort, setShowSort] = useState(false)

    return (
        <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-white font-display">Your Library</h1>
                <div className="flex items-center gap-2">
                    {/* Sort */}
                    <div className="relative">
                        <button
                            onClick={() => setShowSort(!showSort)}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-tunely-surface text-tunely-text-dim text-sm hover:text-white transition-colors"
                        >
                            <SortAsc className="w-4 h-4" />
                            {sortBy}
                        </button>
                        {showSort && (
                            <div className="absolute right-0 top-11 w-44 glass-strong rounded-xl py-2 shadow-2xl z-20 animate-fade-in">
                                {sortOptions.map(opt => (
                                    <button
                                        key={opt}
                                        onClick={() => { setSortBy(opt); setShowSort(false) }}
                                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${sortBy === opt ? 'text-tunely-primary' : 'text-tunely-text-dim hover:text-white hover:bg-tunely-primary/10'
                                            }`}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* View Toggle */}
                    <button
                        onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                        className="w-10 h-10 rounded-lg bg-tunely-surface flex items-center justify-center text-tunely-text-dim hover:text-white transition-colors"
                    >
                        {viewMode === 'grid' ? <List className="w-4 h-4" /> : <Grid3X3 className="w-4 h-4" />}
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${activeTab === tab.id
                                ? 'bg-tunely-primary text-white'
                                : 'bg-tunely-surface text-tunely-text-dim hover:bg-tunely-border/30 hover:text-white'
                            }`}
                    >
                        <tab.icon className="w-4 h-4" />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Grid View */}
            {viewMode === 'grid' ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                    {demoPlaylists.map((pl, i) => (
                        <motion.div
                            key={pl.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="music-card group cursor-pointer"
                        >
                            <div className="relative mb-4">
                                <img src={pl.cover} alt={pl.title} className="w-full aspect-square object-cover rounded-lg" loading="lazy" />
                                <div className="play-overlay">
                                    <Play className="w-5 h-5 text-white ml-0.5" />
                                </div>
                            </div>
                            <h4 className="text-sm font-semibold text-tunely-text truncate">{pl.title}</h4>
                            <p className="text-xs text-tunely-text-dim mt-1">{pl.creator} · {pl.tracks} tracks</p>
                        </motion.div>
                    ))}
                </div>
            ) : (
                /* List View */
                <div className="space-y-1">
                    {demoPlaylists.map((pl, i) => (
                        <motion.div
                            key={pl.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.03 }}
                            className="flex items-center gap-4 p-3 rounded-xl hover:bg-tunely-surface/50 transition-colors cursor-pointer group"
                        >
                            <img src={pl.cover} alt={pl.title} className="w-12 h-12 rounded-lg object-cover" loading="lazy" />
                            <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-medium text-tunely-text truncate">{pl.title}</h4>
                                <p className="text-xs text-tunely-text-dim">{pl.creator} · {pl.tracks} tracks</p>
                            </div>
                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="text-tunely-text-muted hover:text-tunely-pink"><Heart className="w-4 h-4" /></button>
                                <button className="text-tunely-text-muted hover:text-white"><Play className="w-4 h-4" /></button>
                                <button className="text-tunely-text-muted hover:text-white"><MoreHorizontal className="w-4 h-4" /></button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    )
}
