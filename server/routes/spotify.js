import express from 'express'
import axios from 'axios'

const router = express.Router()

// Proxy search to Spotify API
router.get('/search', async (req, res) => {
    try {
        const { q, type = 'track', limit = 20 } = req.query
        const token = req.headers.authorization?.split(' ')[1]
        const response = await axios.get(`https://api.spotify.com/v1/search`, {
            params: { q, type, limit },
            headers: { Authorization: `Bearer ${token}` }
        })
        res.json(response.data)
    } catch (err) { res.status(err.response?.status || 500).json({ error: err.message }) }
})

// Get track details
router.get('/tracks/:id', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]
        const response = await axios.get(`https://api.spotify.com/v1/tracks/${req.params.id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        res.json(response.data)
    } catch (err) { res.status(err.response?.status || 500).json({ error: err.message }) }
})

// Get recommendations
router.get('/recommendations', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]
        const response = await axios.get('https://api.spotify.com/v1/recommendations', {
            params: req.query,
            headers: { Authorization: `Bearer ${token}` }
        })
        res.json(response.data)
    } catch (err) { res.status(err.response?.status || 500).json({ error: err.message }) }
})

export default router
