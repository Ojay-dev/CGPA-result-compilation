import express from 'express';
import config from './config';
import bodyParser from 'body-parser';
import api from './api';

require('mongoose').connect(config.db.url);

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api', api);


app.get('/', (req, res) => {
    res.sendStatus(200);
});

app.use((err, req, res, next) => {
    res.json({ERROR: err,});
});

app.listen(config.port, function listenHandler() {
    console.info(`Running on ${config.port}...`);
});