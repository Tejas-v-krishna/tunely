import { useDispatch } from 'react-redux'
import { setTrack, addToRecentlyPlayed } from '../redux/slices/playerSlice'
import { motion } from 'framer-motion'
import { Play, Heart, MoreHorizontal, UserPlus, Users, Verified } from 'lucide-react'

const artistData = {
    name: 'Luna Nova',
    verified: true,
    monthlyListeners: '2,437,891',
    banner: 'https://picsum.photos/seed/artistbanner/1400/400',
    avatar: 'https://picsum.photos/seed/artist1/300/300',
    about: 'Luna Nova is an ethereal electronic artist blending ambient textures with dreamy vocals and otherworldly soundscapes. Based in Berlin, she has been crafting nocturnal soundscapes since 2019.',
    popularSongs: [
        { id: '1', title: 'Midnight Dreams', plays: '14,230,521', duration: '3:42', cover: 'https://picsum.photos/seed/track1/60/60' },
        { id: '2', title: 'Starlight Cascade', plays: '9,871,234', duration: '4:18', cover: 'https://picsum.photos/seed/lnsong2/60/60' },
        { id: '3', title: 'Aurora Borealis', plays: '7,654,321', duration: '5:01', cover: 'https://picsum.photos/seed/lnsong3/60/60' },
        { id: '4', title: 'Twilight Echo', plays: '5,432,109', duration: '3:55', cover: 'https://picsum.photos/seed/lnsong4/60/60' },
        { id: '5', title: 'Lunar Tide', plays: '4,321,890', duration: '4:33', cover: 'https://picsum.photos/seed/lnsong5/60/60' },
    ],
    albums: [
        { id: 'al1', title: 'Nocturne', year: 2025, cover: 'https://picsum.photos/seed/album1/300/300' },
        { id: 'al2', title: 'Celestial', year: 2024, cover: 'https://picsum.photos/seed/album2/300/300' },
        { id: 'al3', title: 'Dreamweaver', year: 2023, cover: 'https://picsum.photos/seed/album3/300/300' },
        { id: 'al4', title: 'Moonlit', year: 2022, cover: 'https://picsum.photos/seed/album4/300/300' },
    ],
    similarArtists: [
        { id: 'sa1', name: 'Cosmic Drift', image: 'https://picsum.photos/seed/artist3/200/200' },
        { id: 'sa2', name: 'Echo Chamber', image: 'https://picsum.photos/seed/simartist2/200/200' },
        { id: 'sa3', name: 'Nebula Sound', image: 'https://picsum.photos/seed/simartist3/200/200' },
        { id: 'sa4', name: 'Starfall', image: 'https://picsum.photos/seed/simartist4/200/200' },
        { id: 'sa5', name: 'Dreamcatcher', image: 'https://picsum.photos/seed/simartist5/200/200' },
    ],
}

export default function ArtistPage() {
    const dispatch = useDispatch()

    const handlePlay = (song) => {
        const track = { ...song, artist: artistData.name }
        dispatch(setTrack(track))
        dispatch(addToRecentlyPlayed(track))
    }

    return (
        <div className="animate-fade-in -mx-6 -mt-6">
            {/* Banner */}
            <div className="relative h-80 overflow-hidden">
                <img src={artistData.banner} alt={artistData.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-tunely-dark/50 to-tunely-dark" />
                <div className="absolute bottom-8 left-8 flex items-end gap-6">
                    <div>
                        {artistData.verified && (
                            <div className="flex items-center gap-1 mb-2">
                                <Verified className="w-5 h-5 text-blue-400" />
                                <span className="text-blue-400 text-sm font-medium">Verified Artist</span>
                            </div>
                        )}
                        <h1 className="text-6xl md:text-7xl font-black text-white font-display">{artistData.name}</h1>
                        <p className="text-tunely-text-dim mt-2">{artistData.monthlyListeners} monthly listeners</p>
                    </div>
                </div>
            </div>

            <div className="px-8 pb-8">
                {/* Actions */}
                <div className="flex items-center gap-4 py-6">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-14 h-14 rounded-full bg-tunely-primary flex items-center justify-center shadow-lg shadow-tunely-primary/30"
                    >
                        <Play className="w-6 h-6 text-white ml-0.5" />
                    </motion.button>
                    <button className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-tunely-text-dim text-tunely-text text-sm font-semibold hover:border-white hover:scale-105 transition-all">
                        <UserPlus className="w-4 h-4" />
                        Follow
                    </button>
                    <button className="text-tunely-text-muted hover:text-white transition-colors">
                        <MoreHorizontal className="w-6 h-6" />
                    </button>
                </div>

                {/* Popular Songs */}
                <section className="mb-10">
                    <h2 className="text-xl font-bold text-white font-display mb-4">Popular</h2>
                    {artistData.popularSongs.map((song, i) => (
                        <motion.div
                            key={song.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: i * 0.05 }}
                            onClick={() => handlePlay(song)}
                            className="flex items-center gap-4 p-3 rounded-lg hover:bg-tunely-surface/50 transition-colors cursor-pointer group"
                        >
                            <span className="w-6 text-center text-sm text-tunely-text-muted group-hover:hidden">{i + 1}</span>
                            <span className="w-6 text-center hidden group-hover:block"><Play className="w-4 h-4 text-white mx-auto" /></span>
                            <img src={song.cover} alt={song.title} className="w-10 h-10 rounded object-cover" loading="lazy" />
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-tunely-text truncate">{song.title}</p>
                            </div>
                            <span className="text-sm text-tunely-text-dim">{song.plays}</span>
                            <span className="text-sm text-tunely-text-dim w-12 text-right">{song.duration}</span>
                            <button className="text-tunely-text-muted hover:text-tunely-pink opacity-0 group-hover:opacity-100" onClick={e => e.stopPropagation()}>
                                <Heart className="w-4 h-4" />
                            </button>
                        </motion.div>
                    ))}
                </section>

                {/* Albums */}
                <section className="mb-10">
                    <h2 className="text-xl font-bold text-white font-display mb-4">Albums</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                        {artistData.albums.map((album, i) => (
                            <motion.div
                                key={album.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.08 }}
                                className="music-card group cursor-pointer"
                            >
                                <div className="relative mb-3">
                                    <img src={album.cover} alt={album.title} className="w-full aspect-square object-cover rounded-lg" loading="lazy" />
                                    <div className="play-overlay"><Play className="w-5 h-5 text-white ml-0.5" /></div>
                                </div>
                                <h4 className="text-sm font-semibold text-tunely-text truncate">{album.title}</h4>
                                <p className="text-xs text-tunely-text-dim mt-1">{album.year} · Album</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* About */}
                <section className="mb-10">
                    <h2 className="text-xl font-bold text-white font-display mb-4">About</h2>
                    <div className="glass rounded-2xl p-6 max-w-2xl">
                        <div className="flex items-center gap-2 mb-3">
                            <Users className="w-4 h-4 text-tunely-text-dim" />
                            <span className="text-sm text-tunely-text-dim">{artistData.monthlyListeners} monthly listeners</span>
                        </div>
                        <p className="text-tunely-text-dim text-sm leading-relaxed">{artistData.about}</p>
                    </div>
                </section>

                {/* Similar Artists */}
                <section>
                    <h2 className="text-xl font-bold text-white font-display mb-4">Fans also like</h2>
                    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {artistData.similarArtists.map((artist, i) => (
                            <motion.div
                                key={artist.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="text-center cursor-pointer group"
                            >
                                <img src={artist.image} alt={artist.name} className="w-full aspect-square object-cover rounded-full mb-3 border-2 border-transparent group-hover:border-tunely-primary transition-colors" loading="lazy" />
                                <h4 className="text-sm font-semibold text-tunely-text truncate">{artist.name}</h4>
                                <p className="text-xs text-tunely-text-dim">Artist</p>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}
