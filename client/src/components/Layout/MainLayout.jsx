import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Sidebar from './Sidebar'
import TopBar from './TopBar'
import PlayerBar from '../Player/PlayerBar'

export default function MainLayout() {
    const { sidebarOpen } = useSelector(state => state.ui)

    return (
        <div className="min-h-screen bg-tunely-dark">
            <Sidebar />

            {/* Main Content */}
            <div
                className="transition-all duration-300"
                style={{ marginLeft: sidebarOpen ? '260px' : '72px' }}
            >
                <TopBar />

                <main className="p-6 pb-28 min-h-[calc(100vh-64px)]">
                    <Outlet />
                </main>
            </div>

            {/* Player Bar */}
            <PlayerBar />
        </div>
    )
}
