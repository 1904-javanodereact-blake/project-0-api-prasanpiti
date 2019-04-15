
export function authMiddleware(roles: string[]){
    return (req, res, next) => {
        const isAuthorized = req.session.user && roles.includes(req.session.user.role.role);
        if(isAuthorized){
            next();            
        } else {
            res.sendStatus(403);
        }
    }
}

export function authMiddlewareId(roles: string[]){
    return (req, res, next) => {
        const isAuthorized = req.session.user && roles.includes(req.session.user.role.role) || (req.session.user.user_id === +req.params.id);
        if(isAuthorized){
            next();
        } else {
            res.sendStatus(403);
        }
    }
}