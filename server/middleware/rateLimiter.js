const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
    message: { error: 'Zbyt wiele żądań. Spróbuj ponownie później.' },
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = limiter;
