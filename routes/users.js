import express from "express"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import User from "../models/User.js"
import { DataResponse,InternalErrorResponse,NotFoundResponse,MessageResponse } from '../common/reponses.js'

const router = express.Router()

router.get('/', async (req,res) => {
    const user = await User.findAll()
    res.json(DataResponse(user))
})

router.get('/:username', async (req,res) => {
    const username = req.params.username

    const user = await User.findOne({
        where: {
            username: username,
        }
    })
    res.json(DataResponse(user))
})

router.post('/register', async (req,res) => {
    const userData = req.body

    try {
        const hashPass = await bcrypt.hash(userData.password,10)
        const user = await User.create({
            username: userData.username,
            password: hashPass
        })
        console.log(user)
        res.json(DataResponse(user))
    } catch(err) {
        console.log(err)
        res.json(InternalErrorResponse())
    }
})

router.post('/login', async (req, res) => {
    const userData = req.body

    const user = await User.findOne({
        where: {
            username: userData.username
        }
    })
    
    if(!user) {
        res.json(NotFoundResponse())
        return
    }
    const isMatchPassword = await bcrypt.compare(userData.password, user.password)
    if(isMatchPassword) {
        const payload = {
            id: user.id,
            username: user.username,
            role: user.role
        }
        const token = jwt.sign(payload, process.env.SECRET, {
            expiresIn: '3h'
        })
        res.cookie('token', token)
        res.json(DataResponse({
            token: token
        }))
    } else {
        res.json(MessageResponse('Invalid usename or password'))
    }

})

router.delete('/:username', async (req,res) => {
    const username = req.params.username

    const result = await User.destroy({
        where: {
            username: username,
        }
    })
    if(result === 0) {
        res.json(NotFoundResponse())
    } else {
        res.json(MessageResponse('user deleted'))
    }
})

router.put('/:username', async (req,res) => {
    const username = req.params.username
    const userData = req.body

    const result = await User.update(userData, {
        where: {
            username: username,
        }
    })
    if(result[0] === 0) {
        res.json(NotFoundResponse())
    } else {
        res.json(MessageResponse('user updated'))
    }
})

export default router

