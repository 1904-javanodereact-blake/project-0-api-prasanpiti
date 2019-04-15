import { PoolClient } from 'pg';
import { connectionPool } from '.';
import { convertSqlReimbursement } from '../util/sql-reimbursement-converter';

export async function findReimbursementByStatus(statusId: number){
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const queryString =  `SELECT * FROM ers_schema.reimbursement WHERE status_id = $1`;
        const result = await client.query(queryString, [statusId]);
        const reimbursements = result.rows;
        let convertedReimbursements = [];
        if(reimbursements){
            for(let reimbursement of reimbursements){
                const convertedReimbursement = convertSqlReimbursement(reimbursement);
                convertedReimbursements.push(convertedReimbursement);
            }
            return convertedReimbursements;
        }
    } catch(err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    return undefined;
}

export async function findReimbursementByUserId(authorId: number){
    console.log(`authorId = ${authorId}`);
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const queryString =  `SELECT * FROM ers_schema.reimbursement WHERE author_id = $1`;
        const result = await client.query(queryString, [authorId]);
        const reimbursements = result.rows;
        let convertedReimbursements = [];
        if(reimbursements){
            for(let reimbursement of reimbursements){
                const convertedReimbursement = convertSqlReimbursement(reimbursement);
                convertedReimbursements.push(convertedReimbursement);
            }
            return convertedReimbursements;
        }
    } catch(err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    return undefined;
}

export async function insertReimbursement(author_id, amount, date_submitted, description, status_id) {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const queryString =  `INSERT INTO ers_schema.reimbursement (author_id, amount, date_submitted, description, status_id)
         VALUES ($1, $2, $3, $4, $5) RETURNING *`;
        const r = await client.query( queryString, [author_id, amount, date_submitted, description, status_id]);
        if(r){
            const result = r.rows[0];
            const convertedResult = convertSqlReimbursement(result);
            return convertedResult;
        }
    } catch(err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    return undefined;
}

export async function approveReimbursement(reimbursement_id, date_resolved, resolver_id, status_id){
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const queryString =  `UPDATE ers_schema.reimbursement SET 
            date_resolved = $1, resolver_id = $2, status_id = $3 WHERE reimbursement_id = $4`;
        const r = await client.query( queryString, [date_resolved, resolver_id, status_id, reimbursement_id]);
        if(r){
            const queryString1 = `SELECT * FROM ers_schema.reimbursement WHERE reimbursement_id = $1`;
            const result = await client.query(queryString1, [reimbursement_id]);
            const convertedResult = convertSqlReimbursement(result.rows[0]);
            return convertedResult;
        }
    } catch(err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    return undefined;
}