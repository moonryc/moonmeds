import express = require('express');
const router = express.Router();


/* GET home page. */
router.use('/users', require('./users'));
router.use('/medication', require('./medication'));
router.use('/medicationDosages', require('./medicationDosages'));






export default router;
