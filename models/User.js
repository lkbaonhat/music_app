import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../database/database.js";

import SQLModel from "../common/SQLModel.js";

const tableName = 'users'

const User = sequelize.define(tableName, {
    ...SQLModel,
    username: {
        type: DataTypes.STRING(512),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(512),
        allowNull: false
    },
    role: {
        type: DataTypes.STRING(512),
        defaultValue: 'user'
    }
})

User.sync().then(() => {
    console.log('users table created')
})

export default User