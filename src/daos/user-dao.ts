import { PoolClient } from 'pg';
import { connectionPool } from '.';
import { convertSqlRole } from '../util/sql-role-converter';
import { convertSqlUser } from '../util/sql-user-converter';

export async function findByUsernameAndPassword(username: string, password: string){
    let client: PoolClient;
    try{
        client = await connectionPool.connect();
        const queryString = `SELECT * FROM ers_schema.user AS u INNER JOIN ers_schema.role AS r 
             ON u.role_id = r.role_id WHERE u.username = $1 AND u.pwd = $2`;
        const result = await client.query(queryString, [username, password]);
        const user = result.rows[0];
        if(user){
            const convertedUser = convertSqlUser(user);
            convertedUser.role = convertSqlRole(user);
            return convertedUser;
        }
    } catch(err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    return undefined;
}

export async function findAllUsers(){
    let client: PoolClient;
    try{
        client = await connectionPool.connect();
        const queryString = `SELECT * FROM ers_schema.user AS u INNER JOIN ers_schema.role AS r 
            ON u.role_id = r.role_id`;
        const result = await client.query(queryString);
        const users = result.rows;
        let convertedUsers = [];
        if(users){
            for(let user of users){
                const convertedUser = convertSqlUser(user);
                convertedUser.role = convertSqlRole(user);
                convertedUsers.push(convertedUser);
            }
            return convertedUsers;
        }
    } catch(err){
        console.log(err);
    } finally {
        client && client.release();
    }
    return undefined;
}

export async function findUserById(id: number){
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const queryString =  `SELECT * FROM ers_schema.user AS u INNER JOIN ers_schema.role AS r 
            ON u.role_id = r.role_id WHERE u.user_id = $1`;
        const result = await client.query(queryString, [id]);
        const user = result.rows[0];
        if(user){
            const convertedUser = convertSqlUser(user);
            convertedUser.role = convertSqlRole(user);
            return convertedUser;
        }
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    return undefined;
}

export async function patchUser(userId: number, username: string, password: string, firstName: string, lastName: string, email: string, roleId: number, role: string){
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const queryString = `UPDATE ers_schema.user SET username = $1, pwd = $2, 
        first_name = $3, last_name = $4, email = $5, role_id = $6 WHERE user_id = $7`;
        const result  = await client.query(queryString, [username, password, firstName, lastName, email, roleId, userId]);
        if(result){
            const queryString1 = `SELECT * FROM ers_schema.user WHERE user_id = $1`;
            const result1 = await client.query(queryString1, [userId]);
            const user = result1.rows[0];
            if(user){
                const convertedUser = convertSqlUser(user);
                return convertedUser;
            }
        }
    } catch(err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    return undefined;
}