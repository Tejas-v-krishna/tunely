import express from 'express'
import Playlist from '../models/Playlist.js'

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const playlists = await Playlist.find({ isPublic: true }).populate('owner', 'displayName avatar').sort('-createdAt').limit(20)
        res.json(playlists)
    } catch (err) { res.status(500).json({ error: err.message }) }
})

router.get('/:id', async (req, res) => {
    try {
        const playlist = await Playlist.findById(req.params.id).populate('owner', 'displayName avatar')
        if (!playlist) return res.status(404).json({ error: 'Not found' })
        res.json(playlist)
    } catch (err) { res.status(500).json({ error: err.message }) }
})

router.post('/', async (req, res) => {
    try {
        const playlist = await Playlist.create(req.body)
        res.status(201).json(playlist)
    } catch (err) { res.status(400).json({ error: err.message }) }
})

export default router
