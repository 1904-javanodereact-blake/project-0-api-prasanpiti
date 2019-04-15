import express from 'express';
import { findByUsernameAndPassword } from '../daos/user-dao';

export const loginRouter = express.Router();

loginRouter.post('', async (req, res) => {
    const {username, password} = req.body;
    console.log(`postman sends username = ${username} password = ${password}`);
    const user = await findByUsernameAndPassword(username, password);
    if(user){
        req.session.user = user;
        res.json(user);
    } else {
        res.status(400);
        res.send('Invalid Credentials');
    }
});