import { SqlUser } from '../dto/sql-user.dto';
import { User } from '../model/user';

export function convertSqlUser(user: SqlUser){
    return new User(user.user_id, user.username, undefined, user.first_name, user.last_name, user.email);
}