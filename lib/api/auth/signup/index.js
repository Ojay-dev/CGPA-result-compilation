import express from 'express';
import controller from './signupController';

const router = express.Router();

router.param('id', controller.param);

router.route('/')
    .post(controller.post)

router.route('/:id')
    .get(controller.getOne)

module.exports = router;