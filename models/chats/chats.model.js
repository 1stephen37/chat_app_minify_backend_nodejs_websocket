import {Model, DataTypes, INTEGER, STRING, DATE} from 'sequelize';
import sequelize from '../../sequelize.js';

class Chats extends Model {
    name;
}

Chats.init(
    {
        id_chat: {
            type: INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        id_user1: {
            type: INTEGER,
            allowNull: false,
        },
        id_user2: {
            type: INTEGER,
            allowNull: false,
        },
        created_at: {
            type: DATE,
            allowNull: true
        }
    },
    {
        sequelize,
        modelName: 'Chats',
        tableName: 'chats',
        timestamps: false,
    }
);

export default Chats;
