import express from 'express'
import Room from '../models/Room.js'

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const rooms = await Room.find({ isActive: true }).populate('host', 'displayName avatar').sort('-createdAt')
        res.json(rooms)
    } catch (err) { res.status(500).json({ error: err.message }) }
})

router.post('/', async (req, res) => {
    try {
        const room = await Room.create(req.body)
        res.status(201).json(room)
    } catch (err) { res.status(400).json({ error: err.message }) }
})

export default router
