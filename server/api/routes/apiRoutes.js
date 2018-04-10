'use strict';

const router = require('express').Router();

router.use('/users', require('./userRoutes'));
router.use('/photos', require('./photoRoutes'));
router.use('/posts', require('./postRoutes'));
router.use('/auth', require('./authRoutes'));
module.exports = {router};