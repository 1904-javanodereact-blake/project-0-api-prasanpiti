import express from 'express';
import { authMiddleware, authMiddlewareId } from '../middleware/auth.middleware';
import { findAllUsers } from '../daos/user-dao';
import { findUserById } from '../daos/user-dao';
import { patchUser } from '../daos/user-dao';
export const userRouter = express.Router();

userRouter.get('', [
    authMiddleware(['admin', 'finance_manager']), async (req, res) => {
        console.log('Retreiving all users');
        const users = await findAllUsers();
        res.send(users);
    }
]);

userRouter.get('/:id', [
    authMiddlewareId(['admin', 'finance_manager']), async (req, res) => {
        console.log('Retreive a user');
        const user = await findUserById(req.params.id);
        res.send(user);
    }
]);

userRouter.patch('', [
    authMiddleware(['admin']), async (req, res) => {
        console.log('Patch a user');
        const {userId,username,password,firstName,lastName,email,role} = req.body;
        const roleId = role.roleId;
        const role1 = role.role;
        const user = await patchUser(userId, username, password, firstName, lastName, email, roleId, role1);
        res.send(user);
    }
])