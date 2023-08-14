import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../database/database.js';

import SQLModel from '../common/SQLModel.js'
import Album from './Album.js';

const tableName = 'album_of_user'

const AlbumSong = sequelize.define(tableName, {
    ...SQLModel,
    albumId: {
        type: DataTypes.INTEGER,
        references: {
            model: Album,
            id: 'id'
        },
    },
    amount_song: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    }
})

sequelize.sync().then(() => {
    console.log(`${tableName} table created successfully`)
})

export default AlbumSong