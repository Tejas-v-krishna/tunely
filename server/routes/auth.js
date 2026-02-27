import express from 'express'
import jwt from 'jsonwebtoken'
import axios from 'axios'
import User from '../models/User.js'

const router = express.Router()

// Redirect to Spotify auth
router.get('/spotify', (req, res) => {
    const scopes = 'user-read-email user-read-private streaming user-library-read user-library-modify user-read-playback-state user-modify-playback-state user-read-recently-played user-top-read playlist-read-private playlist-modify-public playlist-modify-private'
    const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${process.env.SPOTIFY_CLIENT_ID}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(process.env.SPOTIFY_REDIRECT_URI)}`
    res.redirect(authUrl)
})

// Spotify callback
router.get('/callback', async (req, res) => {
    try {
        const { code } = req.query
        const tokenRes = await axios.post('https://accounts.spotify.com/api/token', new URLSearchParams({
            grant_type: 'authorization_code',
            code,
            redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
            client_id: process.env.SPOTIFY_CLIENT_ID,
            client_secret: process.env.SPOTIFY_CLIENT_SECRET,
        }), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
        const { access_token, refresh_token } = tokenRes.data
        const profileRes = await axios.get('https://api.spotify.com/v1/me', { headers: { Authorization: `Bearer ${access_token}` } })
        const profile = profileRes.data
        let user = await User.findOne({ spotifyId: profile.id })
        if (!user) {
            user = await User.create({ spotifyId: profile.id, displayName: profile.display_name, email: profile.email, avatar: profile.images?.[0]?.url, accessToken: access_token, refreshToken: refresh_token })
        } else {
            user.accessToken = access_token
            user.refreshToken = refresh_token
            await user.save()
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'tunely-secret', { expiresIn: '7d' })
        res.redirect(`${process.env.CLIENT_URL || 'http://localhost:5173'}/home?token=${token}`)
    } catch (err) {
        console.error('Auth error:', err.message)
        const isDbError = err.name?.includes('Mongo') || err.message?.includes('Mongo')
        const errorType = isDbError ? 'db_error' : 'auth_failed'
        const errMsg = isDbError ? 'Database connection failed. Please check your MongoDB Atlas Network Access.' : err.message
        res.redirect(`${process.env.CLIENT_URL || 'http://localhost:5173'}/auth?error=${errorType}&message=${encodeURIComponent(errMsg)}`)
    }
})

// Get current user
router.get('/me', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]
        if (!token) return res.status(401).json({ error: 'No token' })
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'tunely-secret')
        const user = await User.findById(decoded.userId).select('-refreshToken')
        res.json({ ...user.toObject(), accessToken: user.accessToken })
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' })
    }
})

export default router
