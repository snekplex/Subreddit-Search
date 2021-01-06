// Dependency imports
const express = require('express');

// Local imports
const router = require('./routing/router');

const app = express()

// Middleware
app.use(router)

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(3000, () => {
    console.log('App running on http://localhost:3000')
})