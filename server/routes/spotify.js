import express from 'express'
import axios from 'axios'

const router = express.Router()

// Proxy search to Spotify API
router.get('/search', async (req, res) => {
    try {
        const { q, type = 'track' } = req.query
        const limit = Math.min(parseInt(req.query.limit, 10) || 10, 10)
        const token = req.headers.authorization?.split(' ')[1]
        const response = await axios.get(`https://api.spotify.com/v1/search`, {
            params: { q, type, limit },
            headers: { Authorization: `Bearer ${token}` }
        })
        res.json(response.data)
    } catch (err) {
        console.error('Spotify Search Error:', err.response?.data || err.message)
        res.status(err.response?.status || 500).json({ error: err.response?.data?.error?.message || err.message })
    }
})

// Get track details
router.get('/tracks/:id', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]
        const response = await axios.get(`https://api.spotify.com/v1/tracks/${req.params.id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        res.json(response.data)
    } catch (err) {
        console.error('Spotify Track Error:', err.response?.data || err.message)
        res.status(err.response?.status || 500).json({ error: err.response?.data?.error?.message || err.message })
    }
})

// Get recommendations
router.get('/recommendations', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]
        const params = { ...req.query }
        if (params.limit) params.limit = parseInt(params.limit, 10)

        const response = await axios.get('https://api.spotify.com/v1/recommendations', {
            params,
            headers: { Authorization: `Bearer ${token}` }
        })
        res.json(response.data)
    } catch (err) {
        console.error('Spotify Recommend Error:', err.response?.data || err.message)
        res.status(err.response?.status || 500).json({ error: err.response?.data?.error?.message || err.message })
    }
})

export default router
