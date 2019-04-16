
export function authMiddleware(roles: string[]){
    return (req, res, next) => {
        const isAuthorized = req.session.user && roles.includes(req.session.user.role.role);
        if(isAuthorized){
            next();            
        } else {
            res.status(401);
            res.send({message: 'The incoming token has expired'});
        }
    }
}

export function authMiddlewareId(roles: string[]){
    return (req, res, next) => {
        const isAuthorized = req.session.user && roles.includes(req.session.user.role.role) || (req.session.user.userId === +req.params.id);
        if(isAuthorized){
            next();
        } else {
            res.status(401);
            res.send({message: 'The incoming token has expired'});
        }
    }
}

export function authMiddlewareUserId(roles: string[]){
    return (req, res, next) => {
        const isAuthorized = req.session.user && roles.includes(req.session.user.role.role) || (req.session.user.userId === +req.params.userId);
        if(isAuthorized){
            next();
        } else {
            res.status(401);
            res.send({message: 'The incoming token has expired'});
        }
    }
}