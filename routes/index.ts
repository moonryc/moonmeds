import express = require('express');
const router = express.Router();

import medication from "./medication";
import medicationDosages from "./medicationDosages";
import users from "./users";

/* GET home page. */
router.use('/users', users);
router.use('/medication', medication);
router.use('/medicationDosages', medicationDosages);

export default router;
