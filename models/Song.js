import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../database/database.js';

import SQLModel from '../common/SQLModel.js'

const tableName = 'songs'

const Song = sequelize.define(tableName, {
    ...SQLModel,
    name: {
        type: DataTypes.STRING(512),
        allowNull: false //ko cho phep no la null
    },
    author: {
        type: DataTypes.STRING(512),
        allowNull: false
    },
    singer: {
        type: DataTypes.STRING(512),
        allowNull: false
    }
})

Song.sync().then(() => {
    console.log('musics table created')
})

export default Song