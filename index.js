import express from 'express';
import cors from 'cors';
import sequelize from './sequelize.js';
import http from 'http';
import path from 'path';
import {fileURLToPath} from 'url';
import bodyParser from "body-parser";

const app = express();

// app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Sử dụng express.static
app.use(express.static(path.join(__dirname, '../public')));


app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', "PATCH", "DELETE"],
    credentials: true
}));

const server = http.createServer(app);

import userController from './routes/users.route.js';
import chatController from './routes/chats.route.js';
import messageController from './routes/messages.route.js';

import {Server} from 'socket.io';
import MessagesModel from "./models/messages/messages.model.js";

const io = new Server(server,
    {
        cors: {
            origin: 'http://localhost:5173', // Cho phép yêu cầu từ origin cụ thể
            methods: ['GET', 'POST', "PATCH", "DELETE"],
            transports: ['websocket', 'polling'],
            credentials: true // Nếu bạn cần hỗ trợ cookie
        },
        pingTimeout: 60000, // Thời gian chờ ping
        pingInterval: 25000, // Thời gian gửi ping
        maxHttpBufferSize: 1e8 // Kích thước buffer tối đa
    });

sequelize.sync()
    .then(() => {
        console.log('Database synchronized');
    })

const apiRouter = express.Router();

apiRouter.use('/users', userController);
apiRouter.use('/chats', chatController);
apiRouter.use('/messages', messageController);

app.use('/api', apiRouter);

app.get('/', (req, res) => {
    res.send('hello word')
})

io.on('connection', (socket) => {
    socket.on('message', (msg) => {
        MessagesModel.create(msg)
            .then(result => {
                io.emit('message', result); // Phát lại tin nhắn cho tất cả người dùng
            })
    });

    socket.on('disconnect', () => {
        // console.log('Người dùng đã ngắt kết nối');
    });
})

server.listen(3000, () => {
    console.log('listening on port 3000')
})
