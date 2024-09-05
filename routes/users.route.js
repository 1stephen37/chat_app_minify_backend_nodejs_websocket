import express from 'express';
import Users from "../models/users/users.model.js";

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const usersList = await Users.findAll();
        res.status(200).json({
            data: usersList
        })
    } catch (err) {
        res.status(500).json({error: err.message})
    }
})

router.post('/sign-in', async (req, res) => {
    try {
        const user = req.body;
        console.log(user);
        const userOnSystem = await Users.findOne({
            where: {
                email: user.email
            }
        });
        if (!userOnSystem) {
            res.status(404).json({error: "Email không tồn tại trên hệ thống"})
        }
        let isPasswordCorrect;
        if (userOnSystem) {
            isPasswordCorrect = user.password === userOnSystem.password;
            if (!isPasswordCorrect) res.status(401).json({error: "Mật khẩu không đúng"})
            else {
                res.status(200).json({
                    data: {
                        id_user: userOnSystem.id_user,
                        name: userOnSystem.name,
                        email: userOnSystem.email
                    }
                })
            }
        }
    } catch (err) {
        res.status(500).json({error: err.message})
    }
})

export default router;
