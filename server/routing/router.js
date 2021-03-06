const router = require('express').Router();

router.get('/api/health-check', (req, res) => {
    res.json({
        working: true
    });
})

router.use('/api/endpoints', require('./endpoints'))

module.exports = router;