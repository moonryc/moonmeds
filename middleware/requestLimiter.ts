import rateLimit = require('express-rate-limit');

rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
});