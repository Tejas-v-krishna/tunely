import { useState } from 'react'
import { motion } from 'framer-motion'
import { Settings as SettingsIcon, User, Volume2, Smartphone, Palette, Shield, Bell, Check, Moon, Sun, Zap } from 'lucide-react'

const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'audio', label: 'Audio Quality', icon: Volume2 },
    { id: 'devices', label: 'Connected Devices', icon: Smartphone },
    { id: 'theme', label: 'Theme', icon: Palette },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
]

const themes = [
    { id: 'dark', name: 'Dark', preview: 'bg-tunely-dark', icon: Moon },
    { id: 'neon', name: 'Neon', preview: 'bg-gradient-to-br from-violet-950 to-fuchsia-950', icon: Zap },
    { id: 'minimal', name: 'Minimal', preview: 'bg-gradient-to-br from-gray-900 to-gray-800', icon: Sun },
]

const audioQualities = [
    { id: 'low', label: 'Low', detail: '96 kbps' },
    { id: 'normal', label: 'Normal', detail: '160 kbps' },
    { id: 'high', label: 'High', detail: '320 kbps' },
    { id: 'lossless', label: 'Lossless', detail: 'FLAC' },
]

function Toggle({ enabled, onChange }) {
    return (
        <button onClick={() => onChange(!enabled)} className={`w-11 h-6 rounded-full transition-colors relative ${enabled ? 'bg-tunely-primary' : 'bg-tunely-border'}`}>
            <div className="w-5 h-5 rounded-full bg-white absolute top-0.5 transition-all" style={{ left: enabled ? '22px' : '2px' }} />
        </button>
    )
}

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('profile')
    const [audioQuality, setAudioQuality] = useState('high')
    const [selectedTheme, setSelectedTheme] = useState('dark')
    const [notifs, setNotifs] = useState({ newMusic: true, roomInvites: true, weeklyDigest: true, friendActivity: false })

    return (
        <div className="animate-fade-in">
            <div className="flex items-center gap-3 mb-8">
                <SettingsIcon className="w-6 h-6 text-tunely-primary" />
                <h1 className="text-3xl font-bold text-white font-display">Settings</h1>
            </div>
            <div className="flex gap-8">
                <div className="w-56 flex-shrink-0 space-y-1">
                    {tabs.map(tab => (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === tab.id ? 'bg-tunely-primary/15 text-tunely-primary-light' : 'text-tunely-text-dim hover:text-white hover:bg-tunely-surface/50'}`}>
                            <tab.icon className="w-4 h-4" /> {tab.label}
                        </button>
                    ))}
                </div>
                <div className="flex-1 max-w-2xl">
                    {activeTab === 'profile' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                            <h2 className="text-xl font-bold text-white font-display">Profile</h2>
                            <div className="flex items-center gap-6 mb-6">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-tunely-primary to-tunely-accent flex items-center justify-center"><User className="w-10 h-10 text-white" /></div>
                                <button className="px-4 py-2 rounded-lg bg-tunely-surface text-tunely-text-dim text-sm hover:text-white">Change Photo</button>
                            </div>
                            <div><label className="text-sm text-tunely-text-dim mb-2 block">Display Name</label><input type="text" defaultValue="Tejas" className="w-full px-4 py-3 rounded-xl bg-tunely-surface border border-tunely-border/50 text-tunely-text focus:outline-none focus:border-tunely-primary/50" /></div>
                            <div><label className="text-sm text-tunely-text-dim mb-2 block">Email</label><input type="email" defaultValue="tejas@example.com" className="w-full px-4 py-3 rounded-xl bg-tunely-surface border border-tunely-border/50 text-tunely-text focus:outline-none focus:border-tunely-primary/50" /></div>
                            <button className="px-6 py-2.5 rounded-xl bg-tunely-primary text-white font-semibold hover:bg-tunely-primary-light">Save Changes</button>
                        </motion.div>
                    )}
                    {activeTab === 'audio' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                            <h2 className="text-xl font-bold text-white font-display">Audio Quality</h2>
                            <div className="space-y-3">
                                {audioQualities.map(q => (
                                    <button key={q.id} onClick={() => setAudioQuality(q.id)} className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${audioQuality === q.id ? 'glass border-tunely-primary/30' : 'bg-tunely-surface/50 hover:bg-tunely-surface'}`}>
                                        <p className="text-sm font-medium text-tunely-text">{q.label} <span className="text-tunely-text-muted">({q.detail})</span></p>
                                        {audioQuality === q.id && <div className="w-6 h-6 rounded-full bg-tunely-primary flex items-center justify-center"><Check className="w-4 h-4 text-white" /></div>}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                    {activeTab === 'theme' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                            <h2 className="text-xl font-bold text-white font-display">Theme</h2>
                            <div className="grid grid-cols-3 gap-4">
                                {themes.map(t => (
                                    <button key={t.id} onClick={() => setSelectedTheme(t.id)} className={`glass rounded-2xl p-5 text-center transition-all ${selectedTheme === t.id ? 'ring-2 ring-tunely-primary' : 'hover:bg-tunely-surface'}`}>
                                        <div className={`w-full h-20 rounded-xl ${t.preview} mb-3`} />
                                        <p className="text-sm font-medium text-tunely-text">{t.name}</p>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                    {activeTab === 'notifications' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                            <h2 className="text-xl font-bold text-white font-display">Notifications</h2>
                            <div className="space-y-4">
                                {Object.entries(notifs).map(([k, v]) => (
                                    <div key={k} className="flex items-center justify-between p-4 rounded-xl bg-tunely-surface/50">
                                        <span className="text-sm text-tunely-text capitalize">{k.replace(/([A-Z])/g, ' $1')}</span>
                                        <Toggle enabled={v} onChange={val => setNotifs(p => ({ ...p, [k]: val }))} />
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                    {(activeTab === 'devices' || activeTab === 'privacy') && (
                        <div className="text-center py-20">
                            <Smartphone className="w-12 h-12 text-tunely-text-muted mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-tunely-text mb-2">{activeTab === 'devices' ? 'Connected Devices' : 'Privacy Settings'}</h3>
                            <p className="text-tunely-text-dim text-sm">Connect your Spotify account to manage {activeTab}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
