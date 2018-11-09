const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs-extra')
const app = express()
const port = 4000

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

let cardsDb = require("./db/cards");

app.get('/cards', (req, res) => {
    const cards = cardsDb[req.query.email]
    console.log("cards :: ", cards)
    res.send(cards)
})

app.post('/cards', (req, res) => {
    console.log(req.body)
    const email = req.body.email;
    const cards = req.body.cards;

    cardsDb[email] = cards;

    fs.writeJson("./db/cards.json", cardsDb)
        .then(() => {
            console.log(`Cards saved for ${email}`)
            res.send(cards)
        })
        .catch(err => {
            console.error(err)
        })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))