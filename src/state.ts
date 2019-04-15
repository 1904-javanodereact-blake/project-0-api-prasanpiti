/**
 * for instants of objects
 */
import { User } from './model/user';
import { Role } from './model/role';
export let roles: Role[] = [new Role(1, 'admin'), new Role(2, 'fm')];
export let users: User[] = [
    new User(1,'admin','pass','adminFN','adminLN','admin@email.com',roles[1]),
    new User(2, 'fm','pass','fmFN','fmLN','fm@email.com',roles[2])
];
