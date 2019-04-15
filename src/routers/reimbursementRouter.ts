import express from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import { authMiddlewareId } from '../middleware/auth.middleware';
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
    authMiddlewareId(['admin', 'finance_manager']), async (req, res) => {
        const reimbursements = await findReimbursementByUserId(req.params.userId);
        res.json(reimbursements);
    }
]);

reimbursementRouter.post('', 
    async (req, res) => {
        const {author_id, amount, date_submitted, description, status_id} = req.body;
        const resReimbursement = await insertReimbursement(author_id, amount, date_submitted, description, status_id);
        res.status(201);
        res.json(resReimbursement);
    }
);

reimbursementRouter.patch('', [
    authMiddleware(['admin', 'finance_manager']), async (req, res) => {
        const {reimbursement_id, date_resolved, resolver_id, status_id} = req.body;
        const resReimbursement = await approveReimbursement(reimbursement_id, date_resolved, resolver_id, status_id);
        res.json(resReimbursement);
    }
]);