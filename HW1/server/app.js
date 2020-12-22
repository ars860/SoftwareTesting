const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json());
app.use(cors());

const port = 3000

let counter = 0;

const users = [
    {email: "Arkasha@ma.il", password: "12345"},
    {email: "Aba@Caba", password: "menya_ne_vzlomat!"},
    {email: "admi@n", password: "admin"}
]



app.get('/', (req, res, next) => {
    res.send('Hello World!')
})

app.get('/counter', (req, res, next) => {
    res.send(`${counter}`)
    counter++
})

app.post('/login', (req, res, next) => {
    const email = req.body.email
    // very safe shit right here
    const password = req.body.password

    if (users.find(e => e.email === email && e.password === password) !== undefined) {
        res.send({authenticated: true})
    } else {
        res.send({authenticated: false})
    }
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})