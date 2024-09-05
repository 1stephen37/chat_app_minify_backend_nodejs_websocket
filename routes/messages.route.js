import express from 'express';
import MessagesModel from "../models/messages/messages.model.js";
import Users from "../models/users/users.model.js";

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const id_chat = req.query.id_chat;
        let filter = {};
        if (id_chat) {
            filter.where = {
                id_chat: id_chat
            }
            filter.order = [['id_message', 'ASC']]
        }
        const messagesList = await MessagesModel.findAll({...filter, raw: true});
        for (let index in messagesList) {
            const user = await Users.findByPk(messagesList[index].id_sender, {
                raw: true
            })
            if (user) {
                messagesList[index].name = user.name
            }
        }
        res.status(200).json({
            data: messagesList
        })
    } catch (err) {
        res.status(500).json({error: err.message})
    }
})

router.post('/create', async (req, res) => {
    try {
        const message = req.body;
        MessagesModel.create(message)
            .then((result) => {
                res.status(200).json({
                    data: result
                })
            })
            .catch((err) => {
                res.status(500).json({
                    error: err.message
                })
            })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }
})

export default router;
