import {Model, DataTypes, INTEGER, STRING} from 'sequelize';
import sequelize from '../../sequelize.js';

class Users extends Model {
}

Users.init(
    {
        id_user: {
            type: INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: STRING,
            allowNull: false,
        },
        email: {
            type: STRING,
            allowNull: false,
        },
        password: {
            type: STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Users',
        tableName: 'users',
        timestamps: false,
    }
);

export default Users;
