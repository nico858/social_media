const express = require('express');

const response = require('../../../network/response');
const controller = require('./index');
const secure = require('./secure');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const list = await controller.list();
        response.success(req, res, list, 200);
    } catch(err) {
        response.error(req, res, err.message, 500);
    }    
});

router.get('/:id', async (req, res) => {
    try {
        const user = await controller.get(req.params.id);
        response.success(req, res, user, 200);
    } catch(err) {
        response.error(req, res, err.message, 500);
    } 
});

router.post('/', async (req, res) => {
    try {
        const user = await controller.upsert(req.body);
        response.success(req, res, user, 200);
    } catch(err) {
        response.error(req, res, err.message, 500);
    } 
});

router.put('/', secure('update'), async (req, res) => {
    try {
        const user = await controller.upsert(req.body);
        response.success(req, res, user, 200);
    } catch(err) {
        response.error(req, res, err.message, 500);
    } 
});



router.delete('/:id', async (req, res) => {
    try {
        const user = await controller.remove(req.params.id);
        response.success(req, res, `user ${req.params.id} deleted`, 200);
    } catch(err) {
        response.error(req, res, err.message, 500);
    } 
});

router.post('/follow/:id', secure('follow'), async (req, res, next) => {
    controller.follow(req.user.id, req.params.id)
        .then(data => {
            response.success(req, res, data, 201);
        })
        .catch(next);
})

router.get('/:id/following', async (req, res, next) => {  
    try {
        const following = await controller.following(req.params.id);
        response.success(req, res, following, 200);
    }
    catch(err) {
        response.error(req, res, err.message, 500);
    }
})

module.exports = router;