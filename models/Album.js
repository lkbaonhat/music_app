import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../database/database.js';

import SQLModel from '../common/SQLModel.js'
import User from './User.js';
import Song from './Song.js';

const tableName = 'albums'

//books: table name that Book mapping to
const Album = sequelize.define(tableName, {
    ...SQLModel,
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            id: 'id'
        },
    },
    songId: {
        type: DataTypes.INTEGER,
        references: {
            model: Song,
            id: 'id'
        }
    }
})

User.hasMany(Album)
Album.belongsTo(User)

sequelize.sync().then(() => {
    console.log(`${tableName} table created successfully`)
})

export default Album