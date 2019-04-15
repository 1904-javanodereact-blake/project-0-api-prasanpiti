import express from 'express';
import bodyParser from 'body-parser';
import { sessionMiddleware } from './middleware/session.middleware';
import { loginRouter } from './routers/loginRouter';
import { userRouter } from './routers/userRouter';
import { reimbursementRouter } from './routers/reimbursementRouter';

const app = express();

//logging middleware
app.use((req, res, next) => {
    console.log(`request url = ${req.url} with method = ${req.method}`);
    console.log(`header = ${req.rawHeaders}`);
    //res.send('This is in loggin middleware');
    next();
});

//set body-parser
app.use(bodyParser.json());

//set session
app.use(sessionMiddleware);

// /login endpoint
app.use('/login', loginRouter);

// /users endpoint
app.use('/users', userRouter);

// /reimburesement endpoint
app.use('/reimbursements', reimbursementRouter);

//if no end point matched, page not found middleware status 404
app.use((req, res) => {
    console.log('sending page not found 404 to client');
    res.sendStatus(404);
});

app.listen(8080, () => {
    console.log('Listening on port 8080');
});