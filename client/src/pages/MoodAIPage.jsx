import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Zap, Clock, Play, Loader2, Music } from 'lucide-react'

const moods = [
    { id: 'happy', label: 'Happy', emoji: '😊', color: 'from-yellow-400 to-orange-500' },
    { id: 'focused', label: 'Focused', emoji: '🧠', color: 'from-blue-500 to-indigo-600' },
    { id: 'sad', label: 'Sad', emoji: '😢', color: 'from-slate-500 to-blue-700' },
    { id: 'gym', label: 'Gym', emoji: '💪', color: 'from-red-500 to-orange-600' },
    { id: 'study', label: 'Study', emoji: '📚', color: 'from-emerald-500 to-teal-600' },
    { id: 'chill', label: 'Chill', emoji: '🌙', color: 'from-purple-500 to-violet-600' },
    { id: 'party', label: 'Party', emoji: '🎉', color: 'from-pink-500 to-rose-600' },
    { id: 'romantic', label: 'Romantic', emoji: '❤️', color: 'from-rose-400 to-pink-600' },
]

const durations = ['15 min', '30 min', '1 hour', '2 hours', 'Endless']

export default function MoodAIPage() {
    const [selectedMood, setSelectedMood] = useState(null)
    const [energy, setEnergy] = useState(50)
    const [duration, setDuration] = useState('30 min')
    const [generating, setGenerating] = useState(false)
    const [generated, setGenerated] = useState(false)

    const handleGenerate = () => {
        if (!selectedMood) return
        setGenerating(true)
        setTimeout(() => {
            setGenerating(false)
            setGenerated(true)
        }, 3000)
    }

    return (
        <div className="animate-fade-in max-w-4xl mx-auto">
            <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4 text-xs font-medium text-tunely-accent">
                    <Sparkles className="w-3.5 h-3.5" />
                    AI Powered
                </div>
                <h1 className="text-4xl font-bold text-white font-display mb-3">How are you feeling?</h1>
                <p className="text-tunely-text-dim">Let our AI create the perfect playlist for your mood</p>
            </div>

            {/* Mood Selector */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                {moods.map((mood, i) => (
                    <motion.button
                        key={mood.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        onClick={() => { setSelectedMood(mood); setGenerated(false) }}
                        className={`relative overflow-hidden rounded-2xl p-6 text-center transition-all duration-300 cursor-pointer ${selectedMood?.id === mood.id
                                ? `bg-gradient-to-br ${mood.color} scale-[1.02] shadow-lg`
                                : 'glass hover:bg-tunely-surface'
                            }`}
                    >
                        <span className="text-4xl block mb-2">{mood.emoji}</span>
                        <span className={`text-sm font-semibold ${selectedMood?.id === mood.id ? 'text-white' : 'text-tunely-text-dim'}`}>
                            {mood.label}
                        </span>
                    </motion.button>
                ))}
            </div>

            {/* Energy Slider */}
            <div className="glass rounded-2xl p-8 mb-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <Zap className="w-5 h-5 text-tunely-accent" />
                        <h3 className="text-lg font-semibold text-white font-display">Energy Level</h3>
                    </div>
                    <span className="text-tunely-primary font-bold text-lg">{energy}%</span>
                </div>
                <input
                    type="range"
                    min={0}
                    max={100}
                    value={energy}
                    onChange={e => setEnergy(Number(e.target.value))}
                    className="w-full h-2 appearance-none rounded-full bg-tunely-surface cursor-pointer accent-tunely-primary"
                />
                <div className="flex justify-between mt-2 text-xs text-tunely-text-muted">
                    <span>Calm</span>
                    <span>Moderate</span>
                    <span>High Energy</span>
                </div>
            </div>

            {/* Duration */}
            <div className="glass rounded-2xl p-8 mb-8">
                <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-5 h-5 text-tunely-pink" />
                    <h3 className="text-lg font-semibold text-white font-display">Duration</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                    {durations.map(d => (
                        <button
                            key={d}
                            onClick={() => setDuration(d)}
                            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${duration === d
                                    ? 'bg-tunely-primary text-white'
                                    : 'bg-tunely-surface text-tunely-text-dim hover:text-white'
                                }`}
                        >
                            {d}
                        </button>
                    ))}
                </div>
            </div>

            {/* Generate Button */}
            <motion.button
                whileHover={{ scale: selectedMood ? 1.02 : 1 }}
                whileTap={{ scale: selectedMood ? 0.98 : 1 }}
                onClick={handleGenerate}
                disabled={!selectedMood || generating}
                className={`w-full py-5 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${selectedMood
                        ? 'bg-gradient-to-r from-tunely-primary to-tunely-accent text-white shadow-xl shadow-tunely-primary/30 cursor-pointer'
                        : 'bg-tunely-surface text-tunely-text-muted cursor-not-allowed'
                    }`}
            >
                {generating ? (
                    <>
                        <Loader2 className="w-6 h-6 animate-spin" />
                        AI is crafting your playlist...
                    </>
                ) : (
                    <>
                        <Sparkles className="w-6 h-6" />
                        Generate Smart Playlist
                    </>
                )}
            </motion.button>

            {/* Generated Playlist Preview */}
            {generated && selectedMood && (
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 glass rounded-2xl p-8"
                >
                    <div className="flex items-center gap-6 mb-6">
                        <div className={`w-28 h-28 rounded-2xl bg-gradient-to-br ${selectedMood.color} flex items-center justify-center text-5xl shadow-xl`}>
                            {selectedMood.emoji}
                        </div>
                        <div>
                            <p className="text-xs text-tunely-text-muted uppercase tracking-widest mb-1">AI Generated</p>
                            <h3 className="text-2xl font-bold text-white font-display">{selectedMood.label} Vibes Mix</h3>
                            <p className="text-tunely-text-dim text-sm mt-1">12 tracks · {duration} · Energy: {energy}%</p>
                        </div>
                    </div>
                    <button className="flex items-center gap-2 px-8 py-3 rounded-full bg-tunely-primary text-white font-semibold hover:bg-tunely-primary-light transition-colors">
                        <Play className="w-5 h-5" />
                        Play Now
                    </button>
                </motion.div>
            )}
        </div>
    )
}
