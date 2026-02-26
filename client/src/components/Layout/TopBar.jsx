import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setSearchQuery } from '../../redux/slices/uiSlice'
import { logout } from '../../redux/slices/authSlice'
import { useState } from 'react'
import {
    ChevronLeft, ChevronRight, Search, Bell, User, LogOut,
    Crown, Settings, ChevronDown
} from 'lucide-react'

export default function TopBar() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { searchQuery } = useSelector(state => state.ui)
    const { user } = useSelector(state => state.auth)
    const [showDropdown, setShowDropdown] = useState(false)

    return (
        <header className="flex items-center justify-between h-16 px-6 sticky top-0 z-30 glass-strong rounded-b-xl">
            {/* Left: Navigation */}
            <div className="flex items-center gap-2">
                <button
                    onClick={() => navigate(-1)}
                    className="w-8 h-8 rounded-full bg-tunely-dark/60 flex items-center justify-center text-tunely-text-dim hover:text-white transition-colors"
                >
                    <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                    onClick={() => navigate(1)}
                    className="w-8 h-8 rounded-full bg-tunely-dark/60 flex items-center justify-center text-tunely-text-dim hover:text-white transition-colors"
                >
                    <ChevronRight className="w-4 h-4" />
                </button>

                {/* Search */}
                <div className="relative ml-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-tunely-text-muted" />
                    <input
                        type="text"
                        placeholder="Search songs, artists, albums..."
                        value={searchQuery}
                        onChange={e => dispatch(setSearchQuery(e.target.value))}
                        onFocus={() => navigate('/search')}
                        className="w-80 pl-10 pr-4 py-2.5 rounded-full bg-tunely-surface border border-tunely-border/50 text-sm text-tunely-text placeholder:text-tunely-text-muted focus:outline-none focus:border-tunely-primary/50 focus:ring-1 focus:ring-tunely-primary/30 transition-all"
                    />
                </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3">
                {/* Premium badge */}
                <button
                    onClick={() => navigate('/premium')}
                    className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full border border-tunely-accent/30 text-tunely-accent text-xs font-semibold hover:bg-tunely-accent/10 transition-colors"
                >
                    <Crown className="w-3.5 h-3.5" />
                    Upgrade
                </button>

                {/* Notifications */}
                <button className="relative w-9 h-9 rounded-full bg-tunely-surface flex items-center justify-center text-tunely-text-dim hover:text-white transition-colors">
                    <Bell className="w-4 h-4" />
                    <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-tunely-pink text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                        3
                    </span>
                </button>

                {/* Profile Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setShowDropdown(!showDropdown)}
                        className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full bg-tunely-surface hover:bg-tunely-border/30 transition-colors"
                    >
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-tunely-primary to-tunely-accent flex items-center justify-center">
                            <User className="w-3.5 h-3.5 text-white" />
                        </div>
                        <span className="text-sm font-medium text-tunely-text hidden md:block">
                            {user?.displayName || 'User'}
                        </span>
                        <ChevronDown className="w-3.5 h-3.5 text-tunely-text-dim" />
                    </button>

                    {showDropdown && (
                        <div className="absolute right-0 top-12 w-52 glass-strong rounded-xl py-2 shadow-2xl animate-fade-in">
                            <button
                                onClick={() => { navigate('/settings'); setShowDropdown(false) }}
                                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-tunely-text-dim hover:text-white hover:bg-tunely-primary/10 transition-colors"
                            >
                                <Settings className="w-4 h-4" />
                                Settings
                            </button>
                            <button
                                onClick={() => { navigate('/premium'); setShowDropdown(false) }}
                                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-tunely-text-dim hover:text-white hover:bg-tunely-primary/10 transition-colors"
                            >
                                <Crown className="w-4 h-4" />
                                Premium
                            </button>
                            <div className="mx-3 h-px bg-tunely-border/40 my-1" />
                            <button
                                onClick={() => { dispatch(logout()); navigate('/'); setShowDropdown(false) }}
                                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                            >
                                <LogOut className="w-4 h-4" />
                                Log out
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}
