const router = require('express').Router();

router.get('/health-check', (req, res) => {
    res.json({
        working: true
    })
})

module.exports = router;