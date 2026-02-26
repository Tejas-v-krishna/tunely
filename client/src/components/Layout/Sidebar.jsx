import { NavLink, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toggleSidebar } from '../../redux/slices/uiSlice'
import {
    Home, Search, Library, PlusSquare, Heart, Radio, BarChart3,
    Settings, Music, ChevronLeft, ChevronRight, Sparkles, Headphones
} from 'lucide-react'

const navItems = [
    { label: 'Home', icon: Home, path: '/home' },
    { label: 'Search', icon: Search, path: '/search' },
    { label: 'Library', icon: Library, path: '/library' },
]

const playlistItems = [
    { label: 'Create Playlist', icon: PlusSquare, path: '#create' },
    { label: 'Liked Songs', icon: Heart, path: '/playlist/liked' },
]

const featureItems = [
    { label: 'Your Rooms', icon: Radio, path: '/rooms' },
    { label: 'Mood AI', icon: Sparkles, path: '/mood' },
    { label: 'Analytics', icon: BarChart3, path: '/analytics' },
    { label: 'Focus Mode', icon: Headphones, path: '/focus' },
]

const bottomItems = [
    { label: 'Settings', icon: Settings, path: '/settings' },
]

export default function Sidebar() {
    const dispatch = useDispatch()
    const { sidebarOpen } = useSelector(state => state.ui)

    return (
        <aside
            className={`fixed left-0 top-0 h-full z-40 transition-all duration-300 flex flex-col ${sidebarOpen ? 'w-[260px]' : 'w-[72px]'
                }`}
            style={{ background: 'rgba(6, 6, 10, 0.97)' }}
        >
            {/* Logo */}
            <div className="flex items-center gap-3 px-5 py-5 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-tunely-primary to-tunely-accent flex items-center justify-center flex-shrink-0">
                    <Music className="w-5 h-5 text-white" />
                </div>
                {sidebarOpen && (
                    <span className="text-xl font-bold text-white font-display tracking-tight">Tunely</span>
                )}
            </div>

            {/* Nav Section */}
            <div className="px-3 mb-2">
                {navItems.map(item => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `sidebar-link ${isActive ? 'active' : ''} ${!sidebarOpen ? 'justify-center px-0' : ''}`
                        }
                        title={item.label}
                    >
                        <item.icon className="w-5 h-5 flex-shrink-0" />
                        {sidebarOpen && <span>{item.label}</span>}
                    </NavLink>
                ))}
            </div>

            {/* Divider */}
            <div className="mx-5 h-px bg-tunely-border/40 my-3" />

            {/* Playlists */}
            <div className="px-3 mb-2">
                {sidebarOpen && (
                    <p className="px-4 mb-2 text-[11px] font-semibold uppercase tracking-widest text-tunely-text-muted">
                        Your Music
                    </p>
                )}
                {playlistItems.map(item => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `sidebar-link ${isActive ? 'active' : ''} ${!sidebarOpen ? 'justify-center px-0' : ''}`
                        }
                        title={item.label}
                    >
                        <item.icon className={`w-5 h-5 flex-shrink-0 ${item.label === 'Liked Songs' ? 'text-tunely-pink' : 'text-tunely-accent'}`} />
                        {sidebarOpen && <span>{item.label}</span>}
                    </NavLink>
                ))}
            </div>

            {/* Divider */}
            <div className="mx-5 h-px bg-tunely-border/40 my-3" />

            {/* Features */}
            <div className="px-3 flex-1 overflow-y-auto">
                {sidebarOpen && (
                    <p className="px-4 mb-2 text-[11px] font-semibold uppercase tracking-widest text-tunely-text-muted">
                        Features
                    </p>
                )}
                {featureItems.map(item => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `sidebar-link ${isActive ? 'active' : ''} ${!sidebarOpen ? 'justify-center px-0' : ''}`
                        }
                        title={item.label}
                    >
                        <item.icon className="w-5 h-5 flex-shrink-0" />
                        {sidebarOpen && <span>{item.label}</span>}
                    </NavLink>
                ))}
            </div>

            {/* Bottom */}
            <div className="px-3 pb-24">
                {bottomItems.map(item => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `sidebar-link ${isActive ? 'active' : ''} ${!sidebarOpen ? 'justify-center px-0' : ''}`
                        }
                        title={item.label}
                    >
                        <item.icon className="w-5 h-5 flex-shrink-0" />
                        {sidebarOpen && <span>{item.label}</span>}
                    </NavLink>
                ))}

                {/* Collapse toggle */}
                <button
                    onClick={() => dispatch(toggleSidebar())}
                    className={`sidebar-link mt-1 ${!sidebarOpen ? 'justify-center px-0' : ''}`}
                >
                    {sidebarOpen ? (
                        <>
                            <ChevronLeft className="w-5 h-5 flex-shrink-0" />
                            <span>Collapse</span>
                        </>
                    ) : (
                        <ChevronRight className="w-5 h-5 flex-shrink-0" />
                    )}
                </button>
            </div>
        </aside>
    )
}
