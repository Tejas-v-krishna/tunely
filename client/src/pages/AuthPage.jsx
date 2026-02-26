import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Music, Check, Loader2 } from 'lucide-react'

export default function AuthPage() {
    const navigate = useNavigate()
    const [termsAccepted, setTermsAccepted] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleSpotifyLogin = (e) => {
        if (!termsAccepted) {
            e.preventDefault()
            return
        }
        setLoading(true)
    }

    return (
        <div className="min-h-screen bg-tunely-dark flex items-center justify-center relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute top-1/3 -left-40 w-[500px] h-[500px] bg-tunely-primary/20 rounded-full blur-[150px]" />
            <div className="absolute bottom-1/3 -right-40 w-[500px] h-[500px] bg-tunely-accent/15 rounded-full blur-[150px]" />

            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="relative z-10 w-full max-w-md mx-4"
            >
                <div className="glass-strong rounded-3xl p-10 text-center">
                    {/* Logo */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                        className="w-20 h-20 rounded-2xl bg-gradient-to-br from-tunely-primary to-tunely-accent flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-tunely-primary/30"
                    >
                        <Music className="w-10 h-10 text-white" />
                    </motion.div>

                    <h1 className="text-3xl font-bold text-white font-display mb-2">Welcome to Tunely</h1>
                    <p className="text-tunely-text-dim mb-10">Sign in with your Spotify account to continue</p>

                    {/* Spotify Login Button */}
                    <motion.a
                        href={termsAccepted ? '$\{import.meta.env.VITE_API_URL || 'http://localhost:5000'\}/api/auth/spotify' : '#'}
                        whileHover={{ scale: termsAccepted ? 1.02 : 1 }}
                        whileTap={{ scale: termsAccepted ? 0.98 : 1 }}
                        onClick={handleSpotifyLogin}
                        className={`w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-semibold text-base transition-all duration-300 mb-6 ${termsAccepted
                            ? 'bg-[#1DB954] text-white hover:bg-[#1ed760] shadow-lg shadow-[#1DB954]/30 cursor-pointer pointer-events-auto'
                            : 'bg-tunely-surface text-tunely-text-muted cursor-not-allowed pointer-events-none'
                            }`}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Connecting to Spotify...
                            </>
                        ) : (
                            <>
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381C8.88 5.82 15.9 6.12 20.1 8.94c.541.3.72 1.02.42 1.56-.299.421-1.02.599-1.439.18z" />
                                </svg>
                                Continue with Spotify
                            </>
                        )}
                    </motion.a>

                    {/* Terms */}
                    <label className="flex items-start gap-3 text-left cursor-pointer group">
                        <div
                            onClick={() => setTermsAccepted(!termsAccepted)}
                            className={`mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200 ${termsAccepted
                                ? 'bg-tunely-primary border-tunely-primary'
                                : 'border-tunely-border group-hover:border-tunely-primary/50'
                                }`}
                        >
                            {termsAccepted && <Check className="w-3.5 h-3.5 text-white" />}
                        </div>
                        <span className="text-sm text-tunely-text-dim leading-relaxed">
                            I agree to the{' '}
                            <a href="#" className="text-tunely-primary-light hover:underline">Terms of Service</a>{' '}
                            and{' '}
                            <a href="#" className="text-tunely-primary-light hover:underline">Privacy Policy</a>
                        </span>
                    </label>

                    {/* Loading animation */}
                    {loading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mt-8 flex items-center justify-center gap-2"
                        >
                            <div className="flex gap-1.5">
                                {[0, 1, 2].map(i => (
                                    <motion.div
                                        key={i}
                                        className="w-2.5 h-2.5 rounded-full bg-tunely-primary"
                                        animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
                                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                                    />
                                ))}
                            </div>
                            <span className="text-sm text-tunely-text-dim ml-2">Fetching your music data...</span>
                        </motion.div>
                    )}
                </div>

                {/* Back to home */}
                <div className="text-center mt-6">
                    <button
                        onClick={() => navigate('/')}
                        className="text-tunely-text-muted text-sm hover:text-white transition-colors"
                    >
                        ← Back to Tunely
                    </button>
                </div>
            </motion.div>
        </div>
    )
}
