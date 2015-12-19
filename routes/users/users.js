'use strict';

var express = require('express'),
    router = express.Router();

// GET ‘/’ - shows all resources TODO
router.get('/', require('./restful/getAll.js'));

// GET ‘/new’ - shows new create new resource page TODO
router.get('/new', require('./restful/getNew.js'));

// POST ‘/new’ - creates individual TODO
router.post('/new', require('./restful/postNew.js'));

// GET ‘/:id’ - shows individual resource TODO
router.get('/:id', require('./restful/getID.js'));

// PUT ‘/:id’ - updates individual resource TODO
router.put('/:id', require('./restful/putID.js'));

// DELETE ‘/:id’ - removes resource TODO
router.delete('/:id', require('./restful/deleteID.js'));

// GET ‘/:id/edit’ - shows edit page of individual resource TODO
router.get('/:id/edit', require('./restful/editID.js'));


module.exports = router;
