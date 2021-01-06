const router = require('express').Router();


router.get('/api/health-check', (req, res) => {
    res.json({
        working: true
    });
})

module.exports = router;