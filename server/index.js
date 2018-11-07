const express = require('express')
const app = express()
const port = 4000

app.get('/cards', (req, res) => {
    const cards = require(`./db/${req.query.email}`);
    res.send(cards)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))