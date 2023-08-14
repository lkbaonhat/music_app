import express from 'express'
import { DataResponse, InternalErrorResponse, MessageResponse, NotFoundResponse } from '../common/reponses.js'
import { requireRole } from '../middlewares/auth.js'
import Album from '../models/Album.js'
import AlbumOfUser from '../models/AlbumOfUser.js'

const router = express.Router()

router.post('/', requireRole('user'), async (req, res) => {
    const albumData = req.body
    const userId = res.locals.userData.id

    const album = await Album.create({
        userId: userId,
    })

    albumData.items.forEach(item => {
        AlbumOfUser.create({
            albumId: album.id,
            amount_song: item.amount_song,
        })
    })

    res.json(DataResponse({
        albumId: album.id,
    }))
})

export default router