const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 4000

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.get('/cards', (req, res) => {
    const cards = require(`./db/${req.query.email}`);
    res.send(cards)
})

app.post('/cards', (req, res) => {
    // const cards = require(`./db/${req.query.email}`);
    // res.send(cards)

    console.log(req.body)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))