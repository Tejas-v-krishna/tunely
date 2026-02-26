import mongoose from 'mongoose'

const playlistSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    cover: { type: String },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    collaborators: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    tracks: [{
        spotifyId: String,
        title: String,
        artist: String,
        album: String,
        duration: Number,
        cover: String,
        addedAt: { type: Date, default: Date.now },
    }],
    isPublic: { type: Boolean, default: true },
    isAIGenerated: { type: Boolean, default: false },
    mood: { type: String },
    followers: { type: Number, default: 0 },
}, { timestamps: true })

export default mongoose.model('Playlist', playlistSchema)
