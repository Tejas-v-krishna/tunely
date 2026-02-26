import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Crown, Check, Sparkles, Zap, Music, BarChart3, Radio, Headphones, Shield } from 'lucide-react'

const plans = [
    {
        id: 'free',
        name: 'Free',
        price: '$0',
        period: '/forever',
        description: 'Get started with basic streaming',
        color: 'from-slate-600 to-slate-700',
        features: ['Ad-supported streaming', 'Basic playlists', 'Standard audio quality (160 kbps)', 'Limited skips'],
        missing: ['AI Playlists', 'Analytics', 'Live Rooms', 'Offline mode', 'Lossless audio'],
        cta: 'Current Plan',
        disabled: true,
    },
    {
        id: 'pro',
        name: 'Pro',
        price: '$9.99',
        period: '/month',
        description: 'For serious music lovers',
        color: 'from-tunely-primary to-violet-600',
        popular: true,
        features: ['Zero ads', 'AI Mood Playlists', 'Tunely Analytics', 'Live Rooms', 'High quality (320 kbps)', 'Offline mode', 'Unlimited skips'],
        missing: ['Creator tools', 'Lossless audio'],
        cta: 'Upgrade to Pro',
    },
    {
        id: 'creator',
        name: 'Creator',
        price: '$14.99',
        period: '/month',
        description: 'For artists and creators',
        color: 'from-tunely-accent to-emerald-500',
        features: ['Everything in Pro', 'Lossless FLAC audio', 'Creator Dashboard', 'Advanced analytics', 'Priority support', 'Custom visualizers', 'Early access features', 'Tipping enabled'],
        missing: [],
        cta: 'Go Creator',
    },
]

export default function PremiumPage() {
    const navigate = useNavigate()

    return (
        <div className="animate-fade-in max-w-6xl mx-auto">
            <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4 text-xs font-medium text-tunely-accent">
                    <Crown className="w-3.5 h-3.5" />
                    Premium Plans
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white font-display mb-4">
                    Unlock the <span className="gradient-text">full experience</span>
                </h1>
                <p className="text-tunely-text-dim text-lg max-w-xl mx-auto">Choose the plan that fits your lifestyle</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
                {plans.map((plan, i) => (
                    <motion.div
                        key={plan.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`relative glass rounded-3xl p-8 flex flex-col ${plan.popular ? 'ring-2 ring-tunely-primary' : ''}`}
                    >
                        {plan.popular && (
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-tunely-primary text-white text-xs font-bold">
                                Most Popular
                            </div>
                        )}
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-5`}>
                            <Crown className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-white font-display">{plan.name}</h3>
                        <p className="text-tunely-text-dim text-sm mt-1 mb-4">{plan.description}</p>
                        <div className="mb-6">
                            <span className="text-4xl font-black text-white">{plan.price}</span>
                            <span className="text-tunely-text-muted text-sm">{plan.period}</span>
                        </div>
                        <div className="space-y-3 flex-1 mb-8">
                            {plan.features.map(f => (
                                <div key={f} className="flex items-center gap-2">
                                    <Check className="w-4 h-4 text-tunely-accent flex-shrink-0" />
                                    <span className="text-sm text-tunely-text">{f}</span>
                                </div>
                            ))}
                            {plan.missing.map(f => (
                                <div key={f} className="flex items-center gap-2 opacity-40">
                                    <Check className="w-4 h-4 flex-shrink-0" />
                                    <span className="text-sm text-tunely-text-dim line-through">{f}</span>
                                </div>
                            ))}
                        </div>
                        <motion.button
                            whileHover={{ scale: plan.disabled ? 1 : 1.02 }}
                            whileTap={{ scale: plan.disabled ? 1 : 0.98 }}
                            disabled={plan.disabled}
                            className={`w-full py-3.5 rounded-2xl font-semibold transition-all ${plan.disabled
                                ? 'bg-tunely-surface text-tunely-text-muted cursor-default'
                                : plan.popular
                                    ? 'bg-gradient-to-r from-tunely-primary to-violet-600 text-white shadow-lg shadow-tunely-primary/30'
                                    : 'bg-tunely-surface text-white hover:bg-tunely-border/50'
                                }`}
                        >
                            {plan.cta}
                        </motion.button>
                    </motion.div>
                ))}
            </div>

            {/* Feature highlights */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { icon: Sparkles, label: 'AI Playlists', desc: 'Mood-based generation' },
                    { icon: BarChart3, label: 'Tunely Analytics', desc: 'Deep analytics' },
                    { icon: Radio, label: 'Live Rooms', desc: 'Listen together' },
                    { icon: Headphones, label: 'Focus Mode', desc: 'Zero distractions' },
                ].map((f, i) => (
                    <motion.div
                        key={f.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + i * 0.1 }}
                        className="glass rounded-2xl p-5 text-center"
                    >
                        <f.icon className="w-6 h-6 text-tunely-primary mx-auto mb-2" />
                        <p className="text-sm font-semibold text-tunely-text">{f.label}</p>
                        <p className="text-xs text-tunely-text-dim mt-1">{f.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
