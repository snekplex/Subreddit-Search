const router = require('express').Router();
const scrapeResults = require('../scraping/puppet');

router.get('/health-check', (req, res) => {
    res.json({
        working: true
    })
})

/* Search Endpoints */

router.get('/search', async (req, res) => {
    var response = {
        subreddits: [],
        searchTerms: [],
        results: {}
    }

    // If only 1 query item is given url should look like
    // http://localhost:3000/api/endpoints/search?subreddits=example&searchTerms=example
    // If more than 1 item is given to the params the url should look like this
    // http://localhost:3000/api/endpoints/search?subreddits=example&subreddits=example1&searchTerms=example&searchTerms=example1
    
    var subreddits = req.query.subreddits
    var searchTerms = req.query.searchTerms

    if (typeof subreddits === 'string') {
        subreddits = [subreddits]
    }

    if (typeof searchTerms === 'string') {
        searchTerms = [searchTerms]
    }

    response.subreddits = subreddits
    response.searchTerms = searchTerms

    const results = await scrapeResults(true, searchTerms, subreddits)
    .then((res) => {
        return res;
    })
    .catch((err) => {
        console.log(err);
    })

    response.results = results;

    res.json(response)
})



module.exports = router;