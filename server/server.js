import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { createServer } from 'http'
import { Server } from 'socket.io'

import authRoutes from './routes/auth.js'
import playlistRoutes from './routes/playlists.js'
import roomRoutes from './routes/rooms.js'
import spotifyRoutes from './routes/spotify.js'

dotenv.config({ path: '../.env' })

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
    cors: { origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true }
})

// ═══ MIDDLEWARE ═══
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true }))
app.use(express.json())

// ═══ ROUTES ═══
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'Tunely API', timestamp: new Date().toISOString() })
})

app.use('/api/auth', authRoutes)
app.use('/api/playlists', playlistRoutes)
app.use('/api/rooms', roomRoutes)
app.use('/api/spotify', spotifyRoutes)

// ═══ SOCKET.IO (Live Rooms) ═══
io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`)

    socket.on('join-room', (roomId) => {
        socket.join(roomId)
        io.to(roomId).emit('user-joined', { userId: socket.id })
    })

    socket.on('leave-room', (roomId) => {
        socket.leave(roomId)
        io.to(roomId).emit('user-left', { userId: socket.id })
    })

    socket.on('chat-message', ({ roomId, message, user }) => {
        io.to(roomId).emit('chat-message', { message, user, time: new Date() })
    })

    socket.on('playback-sync', ({ roomId, state }) => {
        socket.to(roomId).emit('playback-sync', state)
    })

    socket.on('emoji-reaction', ({ roomId, emoji, user }) => {
        io.to(roomId).emit('emoji-reaction', { emoji, user })
    })

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`)
    })
})

// ═══ MONGODB CONNECTION ═══
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/tunely'
mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ MongoDB connected'))
    .catch(err => console.error('❌ MongoDB error:', err))

// ═══ START SERVER ═══
const PORT = process.env.PORT || 5000
httpServer.listen(PORT, () => {
    console.log(`🚀 Tunely API running on port ${PORT}`)
})
