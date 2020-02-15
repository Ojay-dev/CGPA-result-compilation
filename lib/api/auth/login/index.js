import express from 'express';
import {verifyUser} from '../auth';
import controller from './loginCotroller';

const router = express.Router();

router.post('/', verifyUser(), controller.signin);

module.exports = router;

