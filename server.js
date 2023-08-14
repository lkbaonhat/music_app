// ===== Imports =====
import 'dotenv/config'
import express from 'express'
import './database/database.js'
import bodyParser from 'body-parser'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import indexRouter from './routes/index.js'
import usersRouter from './routes/users.js'
import songsRouter from './routes/songs.js'
import albumsRouter from './routes/albums.js'

// ===== Config =====
const server = express()
const PORT = process.env.PORT || 3000

// ===== Middlewares =====
server.use(cors())
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true}))
server.use('/public', express.static('public'))
server.use(cookieParser())

// ===== Routes =====
server.use('/', indexRouter)
server.use('/users', usersRouter)
server.use('/songs', songsRouter)
server.use('/albums', albumsRouter)

server.listen(PORT, () => {
    console.log(`Server is listening at PORT=${PORT}`)
})
