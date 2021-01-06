const router = require('express').Router();

router.get('/health-check', (req, res) => {
    res.json({
        working: true
    })
})

/* Search Endpoints */

router.get('/search', (req, res) => {
    var response = {
        results: []
    }

    res.json(response)
})



module.exports = router;