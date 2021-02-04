// Dependency imports
const express = require('express');
const cors = require('cors');

// Local imports
const router = require('./routing/router');

const app = express()

// Middleware
app.use(cors({ origin: '*', optionsSuccessStatus: 200 }))
app.use(router)

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(3001, () => {
    console.log('App running on http://localhost:3001')
})