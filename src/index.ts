import express from 'express';
const app = express();
app.use((req, res) => {
    console.log(`request url = ${req.url} with method = ${req.method}`);
    console.log(`header = ${req.rawHeaders}`);
    res.send('I got cha');
});

app.listen(8080);