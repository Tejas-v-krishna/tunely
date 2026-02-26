import mongoose from 'mongoose'

const roomSchema = new mongoose.Schema({
    name: { type: String, required: true },
    host: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    vibe: { type: String },
    currentTrack: {
        spotifyId: String,
        title: String,
        artist: String,
        cover: String,
        progress: Number,
        isPlaying: Boolean,
    },
    listeners: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    isActive: { type: Boolean, default: true },
}, { timestamps: true })

export default mongoose.model('Room', roomSchema)
