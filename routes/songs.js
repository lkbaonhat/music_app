import express from 'express'
import { DataResponse,InternalErrorResponse,NotFoundResponse,MessageResponse } from '../common/reponses.js'

import Song from '../models/Song.js'

const router = express.Router()

router.get('/', async (req, res) => {
    const song = await Song.findAll()
    res.json(DataResponse(song))
})

router.get('/:name', async (req, res) => {
    const name = req.params.name

    const song = await Song.findOne({
        where: {
            name: name,
        }
    })
    res.json(DataResponse(song))
})

router.post('/', async (req,res) => {
    const songData = req.body

    try {
        const song = await Song.create(songData)
        console.log(song)
        res.json(DataResponse(song))
    } catch(err) {
        console.log(err)
        res.json(InternalErrorResponse())
    }
})

router.delete('/:name', async (req,res) => {
    const name = req.params.name

    const result = await Song.destroy({
        where: {
            name: name,
        }
    })
    if(result === 0) {
        res.json(NotFoundResponse())
    } else {
        res.json(MessageResponse('book deleted'))
    }
})

router.put('/:name', async (req,res) => {
    const name = req.params.name
    const songData = req.body

    const result = await Song.update(songData, {
        where: {
            name: name,
        }
    })
    if(result[0] === 0) {
        res.json(NotFoundResponse())
    } else {
        res.json(MessageResponse('song updated'))
    }
})

export default router


