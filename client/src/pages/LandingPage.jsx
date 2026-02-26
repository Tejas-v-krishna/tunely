import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
    Brain, BarChart3, Radio, ShieldCheck, Headphones, Music,
    Sparkles, ChevronRight, Play, Zap, Users, Mic2
} from 'lucide-react'

/* ═══════════════ WAVEFORM BACKGROUND ═══════════════ */
function WaveBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Gradient orbs */}
            <div className="absolute top-1/4 -left-32 w-96 h-96 bg-tunely-primary/20 rounded-full blur-[120px] animate-float" />
            <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-tunely-accent/15 rounded-full blur-[120px] animate-float" style={{ animationDelay: '3s' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-tunely-pink/10 rounded-full blur-[150px]" />

            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                    backgroundSize: '60px 60px'
                }}
            />

            {/* Floating music notes */}
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute text-tunely-primary/10 text-4xl"
                    style={{
                        left: `${15 + i * 15}%`,
                        top: `${20 + (i % 3) * 25}%`,
                    }}
                    animate={{
                        y: [-20, 20, -20],
                        rotate: [-5, 5, -5],
                        opacity: [0.05, 0.15, 0.05],
                    }}
                    transition={{
                        duration: 8 + i * 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                >
                    ♪
                </motion.div>
            ))}
        </div>
    )
}

/* ═══════════════ FEATURE CARD ═══════════════ */
function FeatureCard({ icon: Icon, title, description, gradient, delay }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay }}
            className="group relative rounded-2xl p-[1px] overflow-hidden"
        >
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${gradient}`} />
            <div className="relative glass rounded-2xl p-8 h-full hover-lift">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-6 shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-tunely-text mb-3 font-display">{title}</h3>
                <p className="text-tunely-text-dim leading-relaxed text-sm">{description}</p>
            </div>
        </motion.div>
    )
}

/* ═══════════════ STAT COUNTER ═══════════════ */
function StatCounter({ value, label, delay }) {
    const [count, setCount] = useState(0)
    useEffect(() => {
        const timer = setTimeout(() => {
            let start = 0
            const end = parseInt(value.replace(/\D/g, ''))
            const inc = Math.ceil(end / 60)
            const counter = setInterval(() => {
                start += inc
                if (start >= end) {
                    setCount(end)
                    clearInterval(counter)
                } else {
                    setCount(start)
                }
            }, 30)
            return () => clearInterval(counter)
        }, delay * 1000)
        return () => clearTimeout(timer)
    }, [value, delay])

    const suffix = value.replace(/[0-9]/g, '')
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            className="text-center"
        >
            <div className="text-4xl md:text-5xl font-bold gradient-text font-display">{count}{suffix}</div>
            <div className="text-tunely-text-dim text-sm mt-2">{label}</div>
        </motion.div>
    )
}

/* ═══════════════ LANDING PAGE ═══════════════ */
export default function LandingPage() {
    const navigate = useNavigate()

    const features = [
        {
            icon: Brain,
            title: 'AI Mood Playlists',
            description: 'Our AI detects your mood and generates the perfect playlist — no clicks needed.',
            gradient: 'from-purple-600/30 to-violet-600/30',
        },
        {
            icon: BarChart3,
            title: 'Deep Listening Stats',
            description: "Tunely Analytics — your music DNA, visualized with mood heatmaps and more.",
            gradient: 'from-cyan-600/30 to-blue-600/30',
        },
        {
            icon: Radio,
            title: 'Live Listening Rooms',
            description: 'Create rooms, invite friends, sync playback in real-time with chat and reactions.',
            gradient: 'from-pink-600/30 to-rose-600/30',
        },
        {
            icon: ShieldCheck,
            title: 'Zero Ads Experience',
            description: 'Go Premium for an uninterrupted, ad-free music journey with lossless audio.',
            gradient: 'from-emerald-600/30 to-teal-600/30',
        },
        {
            icon: Headphones,
            title: 'Smart Focus Mode',
            description: 'Block distractions and let AI curate ambient tracks tuned for deep concentration.',
            gradient: 'from-amber-600/30 to-orange-600/30',
        },
        {
            icon: Sparkles,
            title: 'Audio Visualizer',
            description: 'Immersive visualizer themes that dance to your music in real-time.',
            gradient: 'from-violet-600/30 to-pink-600/30',
        },
    ]

    return (
        <div className="min-h-screen bg-tunely-dark relative">
            <WaveBackground />

            {/* ═══ NAVBAR ═══ */}
            <motion.nav
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="relative z-30 flex items-center justify-between px-6 md:px-12 py-5"
            >
                <div className="flex items-center gap-3 cursor-pointer">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-tunely-primary to-tunely-accent flex items-center justify-center">
                        <Music className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-2xl font-bold text-white font-display tracking-tight">Tunely</span>
                </div>

                <div className="hidden md:flex items-center gap-8">
                    <a href="#features" className="text-tunely-text-dim hover:text-white transition-colors text-sm font-medium">Features</a>
                    <a href="#stats" className="text-tunely-text-dim hover:text-white transition-colors text-sm font-medium">Stats</a>
                    <a href="#premium" className="text-tunely-text-dim hover:text-white transition-colors text-sm font-medium">Premium</a>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate('/auth')}
                        className="px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-tunely-primary to-tunely-primary-dark hover:shadow-lg hover:shadow-tunely-primary/30 transition-all duration-300"
                    >
                        Login with Spotify
                    </button>
                </div>
            </motion.nav>

            {/* ═══ HERO ═══ */}
            <section className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-20 pb-32 md:pt-32 md:pb-40">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 text-xs font-medium text-tunely-text-dim"
                    >
                        <Zap className="w-3.5 h-3.5 text-tunely-accent" />
                        Powered by AI & Spotify
                    </motion.div>

                    {/* Headline */}
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05] mb-6 font-display">
                        <span className="text-white">Music that</span>
                        <br />
                        <span className="gradient-text">Understands You.</span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-lg md:text-xl text-tunely-text-dim max-w-2xl mx-auto mb-10 leading-relaxed">
                        AI-powered mood detection, deep analytics, live listening rooms — your music
                        experience, reimagined and personalized.
                    </p>

                    {/* Wave bars */}
                    <div className="flex items-end justify-center gap-1.5 mb-10">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="wave-bar" />
                        ))}
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => navigate('/auth')}
                            className="flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-tunely-primary to-tunely-primary-dark text-white font-semibold text-base shadow-xl shadow-tunely-primary/30 hover:shadow-tunely-primary/50 transition-shadow duration-300"
                        >
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381C8.88 5.82 15.9 6.12 20.1 8.94c.541.3.72 1.02.42 1.56-.299.421-1.02.599-1.439.18z" />
                            </svg>
                            Login with Spotify
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => navigate('/home')}
                            className="flex items-center gap-2 px-8 py-4 rounded-full glass text-tunely-text font-semibold text-base hover:border-tunely-primary/30 transition-all duration-300"
                        >
                            <Play className="w-5 h-5" />
                            Explore Demo
                            <ChevronRight className="w-4 h-4" />
                        </motion.button>
                    </div>
                </motion.div>
            </section>

            {/* ═══ STATS ═══ */}
            <section id="stats" className="relative z-10 py-16 border-y border-tunely-border/30">
                <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
                    <StatCounter value="10M+" label="Active Listeners" delay={0.1} />
                    <StatCounter value="500K+" label="AI Playlists Generated" delay={0.2} />
                    <StatCounter value="50K+" label="Live Rooms Created" delay={0.3} />
                    <StatCounter value="99%" label="Uptime Guarantee" delay={0.4} />
                </div>
            </section>

            {/* ═══ FEATURES ═══ */}
            <section id="features" className="relative z-10 py-24 px-6">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <p className="text-tunely-accent text-sm font-semibold tracking-widest uppercase mb-3">Why Tunely</p>
                        <h2 className="text-4xl md:text-5xl font-bold text-white font-display mb-4">
                            Not just a player.
                            <br />
                            <span className="gradient-text-pink">A music companion.</span>
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((f, i) => (
                            <FeatureCard key={f.title} {...f} delay={i * 0.1} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ PREMIUM TEASER ═══ */}
            <section id="premium" className="relative z-10 py-24 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 text-xs font-medium text-tunely-accent">
                            <Sparkles className="w-3.5 h-3.5" />
                            Premium Experience
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white font-display mb-6">
                            Unlock the <span className="gradient-text">full power</span>
                        </h2>
                        <p className="text-tunely-text-dim text-lg mb-10 max-w-2xl mx-auto">
                            Go Pro for lossless audio, unlimited AI playlists, advanced analytics, creator tools, and zero ads.
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => navigate('/premium')}
                            className="px-10 py-4 rounded-full bg-gradient-to-r from-tunely-accent to-emerald-500 text-tunely-darker font-bold text-lg shadow-xl shadow-tunely-accent/30 hover:shadow-tunely-accent/50 transition-shadow duration-300"
                        >
                            Upgrade Now
                        </motion.button>
                    </motion.div>
                </div>
            </section>

            {/* ═══ FOOTER ═══ */}
            <footer className="relative z-10 border-t border-tunely-border/30 py-16 px-6">
                <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-tunely-primary to-tunely-accent flex items-center justify-center">
                                <Music className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-lg font-bold text-white font-display">Tunely</span>
                        </div>
                        <p className="text-tunely-text-muted text-sm">Music that understands you.</p>
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold text-tunely-text mb-4">Company</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-tunely-text-muted text-sm hover:text-white transition-colors">About</a></li>
                            <li><a href="#" className="text-tunely-text-muted text-sm hover:text-white transition-colors">Careers</a></li>
                            <li><a href="#" className="text-tunely-text-muted text-sm hover:text-white transition-colors">Press</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold text-tunely-text mb-4">Legal</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-tunely-text-muted text-sm hover:text-white transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="text-tunely-text-muted text-sm hover:text-white transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="text-tunely-text-muted text-sm hover:text-white transition-colors">API Credits</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold text-tunely-text mb-4">Connect</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-tunely-text-muted text-sm hover:text-white transition-colors">Twitter</a></li>
                            <li><a href="#" className="text-tunely-text-muted text-sm hover:text-white transition-colors">Discord</a></li>
                            <li><a href="#" className="text-tunely-text-muted text-sm hover:text-white transition-colors">GitHub</a></li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-tunely-border/20 text-center text-tunely-text-muted text-xs">
                    © 2026 Tunely. Powered by Spotify API. All rights reserved.
                </div>
            </footer>
        </div>
    )
}
