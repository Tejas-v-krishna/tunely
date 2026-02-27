import express from 'express'
import YTMusic from 'ytmusic-api'

const router = express.Router()

let ytmusic = new YTMusic()
let initialized = false

const initYtMusic = async () => {
    if (!initialized) {
        await ytmusic.initialize()
        initialized = true
        console.log('YTMusic API Initialized')
    }
}

router.get('/search', async (req, res) => {
    try {
        const { q } = req.query
        if (!q) return res.status(400).json({ error: 'Missing query parameter' })

        await initYtMusic()

        const searchResults = await ytmusic.search(q)

        // Find the first video or song result
        const track = searchResults.find(item => item.type === 'SONG' || item.type === 'VIDEO')

        if (!track) {
            return res.status(404).json({ error: 'No YouTube Music track found for this query' })
        }

        res.json({ videoId: track.videoId, url: `https://youtube.com/watch?v=${track.videoId}` })
    } catch (err) {
        console.error('YTMusic Search Error:', err)
        res.status(500).json({ error: 'Failed to search YTMusic' })
    }
})

export default router
