const express = require('express');

const response = require('../../../network/response');
const controller = require('./index');
const secure = require('./secure');

const router = express.Router();

// Routes
router.get('/', list);
router.get('/:id', getById);
router.get('/user/:user', getByUser)
router.post('/', upsert);
router.put('/', secure('update'), upsert);

// Internal functions
async function list(req, res, next) {
    try {
        const list = await controller.list();
        response.success(req, res, list, 200);
    }
    catch (err) {
        next();
        response.error(req, res, 'Unexpected Error', 500, err);
    }
}

async function getById(req, res, next) {
    try {
        const post = await controller.get(req.params.id);
        response.success(req, res, post, 200);
    }
    catch (err) {
        next();
        response.error(req, res, 'Unexpected Error', 500, err);
    }
}

async function upsert(req, res, next) {
    try {
        const post = await controller.upsert(req.body);
        response.success(req, res, post, 200);
    }
    catch (err) {
        next();
        response.error(req, res, 'Unexpected Error', 500, err);
    }
}

async function getByUser(req, res, next) {
    try {
        const posts = await controller.getByUser(req.params.user);
        response.success(req, res, posts, 200);
    }
    catch (err) {
        next();
        response.error(req, res, 'Unexpected Error', 500, err);
    }
}

module.exports = router;