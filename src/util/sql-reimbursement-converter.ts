import { SqlReimbursement } from '../dto/sql-reimbursement.dto';
import { Reimbursement } from '../model/reimbursement';

export function convertSqlReimbursement(reimbursement: SqlReimbursement){
    return new Reimbursement(reimbursement.reimbursement_id, reimbursement.author_id, reimbursement.amount, reimbursement.date_submitted, 
        reimbursement.date_resolved, reimbursement.description, reimbursement.resolver_id, reimbursement.status_id, reimbursement.type_id);
}