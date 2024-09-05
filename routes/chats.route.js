import express from 'express';
import ChatsModel from "../models/chats/chats.model.js";
import {Op} from "sequelize";
import Users from "../models/users/users.model.js";

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        let id_user = parseInt(req.query.id_user);
        let filter = {};
        if (id_user) {
            filter = {
                where: {
                    [Op.or]: [
                        {id_user1: id_user},
                        {id_user2: id_user}
                    ]
                },
            }
        }
        let chatsList = await ChatsModel.findAll({...filter, raw: true});
        if (id_user) {
            for (let index in chatsList) {
                let current = chatsList[index].id_user1 === id_user ? chatsList[index].id_user2 : chatsList[index].id_user1;
                const user = await Users.findByPk(current, {
                    raw: true
                })
                if (user) {
                    chatsList[index].name = user.name
                }
            }
        }

        res.status(200).json({
            data: chatsList
        })
    } catch (err) {
        res.status(500).json({error: err.message})
    }
})

export default router;
