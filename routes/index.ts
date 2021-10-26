import express = require('express');
const router = express.Router();

import users from "./users"
import medication from "./medication"
import medicationDosages from "./medicationDosages"

/* GET home page. */
router.use('/users', users);
router.use('/medication', medication);
router.use('/medicationDosages', medicationDosages);






export default router;
