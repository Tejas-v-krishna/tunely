import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    spotifyId: { type: String, unique: true, sparse: true },
    displayName: { type: String, required: true },
    email: { type: String },
    avatar: { type: String },
    accessToken: { type: String },
    refreshToken: { type: String },
    plan: { type: String, enum: ['free', 'pro', 'creator'], default: 'free' },
    preferences: {
        theme: { type: String, default: 'dark' },
        audioQuality: { type: String, default: 'high' },
        notifications: { type: Boolean, default: true },
    },
    listeningStreak: { type: Number, default: 0 },
    badges: [String],
}, { timestamps: true })

export default mongoose.model('User', userSchema)
