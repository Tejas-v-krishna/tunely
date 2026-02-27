import express from 'express'
import YTMusic from 'ytmusic-api'
import ytdl from '@distube/ytdl-core'

const router = express.Router()

let ytmusic = new YTMusic()
let initialized = false

// Simple in-memory cache for audio URLs (they expire after ~6 hours from YouTube)
const audioCache = new Map()
const CACHE_TTL = 5 * 60 * 60 * 1000 // 5 hours

const initYtMusic = async () => {
    if (!initialized) {
        await ytmusic.initialize()
        initialized = true
        console.log('YTMusic API Initialized')
    }
}

// Search for a song and return its videoId
router.get('/search', async (req, res) => {
    try {
        const { q } = req.query
        if (!q) return res.status(400).json({ error: 'Missing query parameter' })

        await initYtMusic()

        const searchResults = await ytmusic.search(q)

        const track = searchResults.find(item => item.type === 'SONG')
            || searchResults.find(item => item.type === 'VIDEO')

        if (!track) {
            return res.status(404).json({ error: 'No YouTube Music track found for this query' })
        }

        res.json({
            videoId: track.videoId,
            name: track.name,
            artist: track.artist?.name || 'Unknown',
            duration: track.duration || 0
        })
    } catch (err) {
        console.error('YTMusic Search Error:', err)
        res.status(500).json({ error: 'Failed to search YTMusic' })
    }
})

// Get direct audio URL for a given videoId
router.get('/audio-url/:videoId', async (req, res) => {
    const { videoId } = req.params

    // Check cache first
    const cached = audioCache.get(videoId)
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        console.log(`Audio URL cache hit for ${videoId}`)
        return res.json(cached.data)
    }

    try {
        console.log(`Extracting audio URL for ${videoId}...`)
        const url = `https://www.youtube.com/watch?v=${videoId}`

        const info = await ytdl.getInfo(url)
        const audioFormats = ytdl.filterFormats(info.formats, 'audioonly')

        if (!audioFormats || audioFormats.length === 0) {
            return res.status(404).json({ error: 'No audio stream available for this track' })
        }

        // Pick the highest bitrate audio
        const best = audioFormats.sort((a, b) => (b.audioBitrate || 0) - (a.audioBitrate || 0))[0]

        const result = {
            audioUrl: best.url,
            mimeType: best.mimeType || 'audio/webm',
            duration: parseInt(info.videoDetails.lengthSeconds, 10) || 0,
            title: info.videoDetails.title,
            thumbnail: info.videoDetails.thumbnails?.[info.videoDetails.thumbnails.length - 1]?.url
        }

        // Cache the result
        audioCache.set(videoId, { data: result, timestamp: Date.now() })
        console.log(`Audio URL extracted and cached for ${videoId}`)

        res.json(result)
    } catch (err) {
        console.error('Audio URL extraction error:', err.message)
        res.status(500).json({ error: 'Failed to extract audio. Please try again.' })
    }
})

export default router
