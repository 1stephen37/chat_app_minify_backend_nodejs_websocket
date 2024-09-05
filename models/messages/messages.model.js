import {Model, DataTypes, INTEGER, STRING, DATE} from 'sequelize';
import sequelize from '../../sequelize.js';

class Messages extends Model {
}

Messages.init(
    {
        id_message: {
            type: INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        id_chat: {
            type: INTEGER,
            allowNull: false,
        },
        id_sender: {
            type: INTEGER,
            allowNull: false,
        },
        content: {
            type: STRING,
            allowNull: false,
        },
        created_at: {
            type: DATE,
            allowNull: true
        }
    },
    {
        sequelize,
        modelName: 'Messages',
        tableName: 'messages',
        timestamps: false,
    }
);

export default Messages;
