import { useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginSuccess, logout } from './redux/slices/authSlice'
import axios from 'axios'
import LandingPage from './pages/LandingPage'
import AuthPage from './pages/AuthPage'
import MainLayout from './components/Layout/MainLayout'
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'
import LibraryPage from './pages/LibraryPage'
import PlaylistPage from './pages/PlaylistPage'
import ArtistPage from './pages/ArtistPage'
import NowPlayingPage from './pages/NowPlayingPage'
import AnalyticsPage from './pages/AnalyticsPage'
import MoodAIPage from './pages/MoodAIPage'
import LiveRoomsPage from './pages/LiveRoomsPage'
import SettingsPage from './pages/SettingsPage'
import PremiumPage from './pages/PremiumPage'
import { SpotifyPlayerProvider } from './contexts/SpotifyPlayerContext'

function App() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search)
        const urlToken = queryParams.get('token')
        const storedToken = localStorage.getItem('tunely_token')
        const tokenToUse = urlToken || storedToken

        if (tokenToUse) {
            axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/me`, {
                headers: { Authorization: `Bearer ${tokenToUse}` }
            }).then(res => {
                console.log("LOGIN SUCCESS PAYLOAD:", res.data);
                dispatch(loginSuccess({ user: res.data, token: tokenToUse }))
                if (urlToken) {
                    navigate('/home', { replace: true })
                }
            }).catch(() => {
                dispatch(logout())
            })
        }
    }, [location.search, dispatch, navigate])

    return (
        <SpotifyPlayerProvider>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/auth" element={<AuthPage />} />

                {/* App Routes (wrapped in MainLayout) */}
                <Route element={<MainLayout />}>
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/library" element={<LibraryPage />} />
                    <Route path="/playlist/:id" element={<PlaylistPage />} />
                    <Route path="/artist/:id" element={<ArtistPage />} />
                    <Route path="/now-playing" element={<NowPlayingPage />} />
                    <Route path="/analytics" element={<AnalyticsPage />} />
                    <Route path="/mood" element={<MoodAIPage />} />
                    <Route path="/rooms" element={<LiveRoomsPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="/premium" element={<PremiumPage />} />
                </Route>
            </Routes>
        </SpotifyPlayerProvider>
    )
}

export default App
