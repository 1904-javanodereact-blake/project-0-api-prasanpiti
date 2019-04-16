import express from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import { authMiddlewareUserId } from '../middleware/auth.middleware';
import { findReimbursementByStatus } from '../daos/reimbursement_dao';
import { findReimbursementByUserId } from '../daos/reimbursement_dao';
import { insertReimbursement } from '../daos/reimbursement_dao';
import { approveReimbursement } from '../daos/reimbursement_dao';

export const reimbursementRouter = express.Router();

reimbursementRouter.get('/status/:statusId', [
    authMiddleware(['admin', 'finance_manager']), async (req, res) => {
        const reimbursements = await findReimbursementByStatus(req.params.statusId);
        res.json(reimbursements);
    }
]);

reimbursementRouter.get('/author/userId/:userId', [
    authMiddlewareUserId(['admin', 'finance_manager']), async (req, res) => {
        const reimbursements = await findReimbursementByUserId(req.params.userId);
        res.json(reimbursements);
    }
]);

reimbursementRouter.post('', 
    async (req, res) => {
        const {author, amount, dateSubmitted, description, status} = req.body;
        const resReimbursement = await insertReimbursement(author, amount, dateSubmitted, description, status);
        res.status(201);
        res.json(resReimbursement);
    }
);

reimbursementRouter.patch('', [
    authMiddleware(['admin', 'finance_manager']), async (req, res) => {
        const {reimbursementId, dateResolved, resolver, status} = req.body;
        const resReimbursement = await approveReimbursement(reimbursementId, dateResolved, resolver, status);
        res.json(resReimbursement);
    }
]);