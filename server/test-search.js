import mongoose from 'mongoose'
import axios from 'axios'
import dotenv from 'dotenv'
import User from './models/User.js'

dotenv.config({ path: '../.env' })

async function testSearch() {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/tunely')
        console.log('Connected to DB')

        const user = await User.findOne({})
        if (!user || !user.accessToken) {
            console.log('No user or accessToken found')
            process.exit(1)
        }

        console.log('Got user accessToken')

        try {
            const response = await axios.get(`https://api.spotify.com/v1/search`, {
                params: { q: 'moonlight', type: 'track,artist,album', limit: 12 },
                headers: { Authorization: `Bearer ${user.accessToken}` }
            })
            console.log('Success:', response.data)
        } catch (err) {
            console.error('Spotify API Error Data:', err.response?.data)
        }
    } catch (err) {
        console.error('Script error:', err)
    } finally {
        await mongoose.disconnect()
        process.exit(0)
    }
}

testSearch()
