import {Sequelize} from 'sequelize';

const sequelize = new Sequelize('chat_app', 'root', 'bestdaxuo113', {
    port: 5432,
    host: '127.0.0.1',
    dialect: 'postgres',
    logging: false
});

export default sequelize;
